// verify.js
async function fileToArrayBuffer(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}
async function sha256Hex(arrayBuffer) {
  const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2,'0')).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  const verifyFile = document.getElementById('verifyFile');
  const btnVerify = document.getElementById('btnVerify');
  const out = document.getElementById('verifyResult');

  btnVerify.onclick = async () => {
    if (!verifyFile.files.length) { alert('اختر ملفاً'); return; }
    const buf = await fileToArrayBuffer(verifyFile.files[0]);
    const h = await sha256Hex(buf);
    out.innerHTML = `<p>حساب بصمة... <code>${h}</code></p><p>جاري التحقق من الشبكة...</p>`;
    try {
      // استدعاء إلى backend: يتحقق من وجود الهاش في البلوكشين
      const resp = await fetch(`http://localhost:4000/api/check-hash/${h}`);
      const json = await resp.json();
      if (json.found) {
        out.innerHTML += `<p style="color:green">الوثيقة مُقيدة على الشبكة بتاريخ ${json.timestamp || 'غير معروف'}</p>`;
      } else {
        out.innerHTML += `<p style="color:red">الوثيقة غير موجودة في السجل (محتمل مزورة)</p>`;
      }
    } catch (e) {
      out.innerHTML += `<p style="color:orange">الخادم غير متاح، لا يمكن التحقق الآن.</p>`;
      console.error(e);
    }
  };
});