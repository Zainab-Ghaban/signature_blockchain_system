// تحويل الملف لـ ArrayBuffer
async function fileToArrayBuffer(file){
  return new Promise((resolve, reject)=>{
    const r = new FileReader();
    r.onload = () => resolve(r.result);
    r.onerror = reject;
    r.readAsArrayBuffer(file);
  });
}

// SHA-256 إلى نص Hex
async function sha256Hex(arrayBuffer){
  const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2,'0')).join('');
}

// توست إشعار عربي (نجاح/خطأ)
function showToast(text, isError=false){
  const el = document.getElementById('toast');
  el.textContent = text;
  el.classList.toggle('error', !!isError);
  el.classList.add('show');
  setTimeout(()=> el.classList.remove('show'), 2800);
}

document.addEventListener('DOMContentLoaded', ()=>{
  const fileInput  = document.getElementById('fileInput');
  const btnHash    = document.getElementById('btnHash');
  const hashOutput = document.getElementById('hashOutput');
  const btnSend    = document.getElementById('btnSend');
  const statusEl   = document.getElementById('status');

  // توليد البصمة
  btnHash.addEventListener('click', async ()=>{
    if(!fileInput.files.length){
      showToast('❌ الرجاء اختيار ملف أولاً', true);
      return;
    }
    const file = fileInput.files[0];
    if(file.size > 50*1024*1024){
      showToast('❌ حجم الملف أكبر من 50 ميجابايت', true);
      return;
    }

    btnHash.disabled = true;
    btnHash.textContent = '⏳ جارٍ توليد البصمة...';
    statusEl.textContent = '';

    try{
      const buf = await fileToArrayBuffer(file);
      const hex = await sha256Hex(buf);
      hashOutput.textContent = hex;
      btnSend.disabled = false;
      showToast('✔ تم توليد البصمة بنجاح');
    }catch(err){
      console.error(err);
      hashOutput.textContent = '— حدث خطأ أثناء توليد البصمة —';
      btnSend.disabled = true;
      showToast('❌ خطأ أثناء توليد البصمة', true);
    }finally{
      btnHash.disabled = false;
      btnHash.textContent = 'توليد البصمة (SHA-256)';
    }
  });

  // إرسال للتوثيق
  btnSend.addEventListener('click', async ()=>{
    const hex = (hashOutput.textContent || '').trim();
    if(!hex || hex.startsWith('—')){
      showToast('❌ لا توجد بصمة لإرسالها', true);
      return;
    }
    if(!fileInput.files.length){
      showToast('❌ لا يوجد ملف مرتبط بالبصمة', true);
      return;
    }

    // تعطيل أثناء الإرسال
    btnSend.disabled = true;
    btnSend.textContent = '📤 جارٍ الإرسال...';
    statusEl.textContent = 'جاري إرسال الوثيقة للتوثيق...';

    try{
      // استبدلي هذا الرابط لاحقًا بواجهة الخلفية لديك
      const resp = await fetch('http://localhost:4000/api/register-hash', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({
          documentHash: hex,
          filename: fileInput.files[0].name
        })
      });

      // محاولة قراءة JSON بأمان
      let data = {};
      try{ data = await resp.json(); } catch(_) {}

      if(resp.ok){
        showToast('✔ تم تسجيل الوثيقة بنجاح');
        statusEl.textContent = data.message || 'تم الإرسال والحفظ.';
      }else{
        showToast('❌ فشل الإرسال — تحقق من الخادم', true);
        statusEl.textContent = data.message || 'تعذر تنفيذ العملية.';
      }
    }catch(err){
      console.error(err);
      showToast('❌ الخادم غير متصل أو خطأ في الشبكة', true);
      statusEl.textContent = 'لا يمكن الاتصال بالخادم حالياً.';
    }finally{
      btnSend.disabled = false;
      btnSend.textContent = '📤 إرسال للتوثيق';
    }
  });
});