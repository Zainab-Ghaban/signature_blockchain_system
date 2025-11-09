function toggleMenu(){
  document.getElementById('sideMenu').classList.toggle('show');
  document.getElementById('overlay').classList.toggle('show');
}

function showToast(text, isError=false){
  const el = document.getElementById('toast');
  el.textContent = text;
  el.classList.toggle('error', isError);
  el.classList.add('show');
  setTimeout(()=> el.classList.remove('show'), 2500);
}

async function fileToArrayBuffer(file){
  return new Promise((resolve, reject)=>{
    const r = new FileReader();
    r.onload = ()=> resolve(r.result);
    r.onerror = reject;
    r.readAsArrayBuffer(file);
  });
}

async function sha256Hex(buffer){
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2,"0")).join("");
}

async function generateHash(type){
  const fileInput = document.getElementById(type === 'original' ? 'fileOriginal' : 'fileFake');
  const output = document.getElementById(type === 'original' ? 'hashOriginal' : 'hashFake');
  if(!fileInput.files.length){
    showToast('❌ الرجاء اختيار ملف أولاً', true);
    return;
  }
  const file = fileInput.files[0];
  const buf = await fileToArrayBuffer(file);
  const hex = await sha256Hex(buf);
  output.textContent = hex;
  showToast(`✔ تم توليد بصمة ${type === 'original' ? 'الأصلية' : 'المشبوهة'}`);
}

function compareHashes(){
  const h1 = document.getElementById("hashOriginal").textContent.trim();
  const h2 = document.getElementById("hashFake").textContent.trim();
  const box = document.getElementById("resultBox");

  if(h1.startsWith("—") || h2.startsWith("—")){
    showToast("⚠️ الرجاء توليد البصمتين أولاً", true);
    return;
  }

  if(h1 === h2){
    box.textContent = "✅ الوثيقتان متطابقتان — لا يوجد تزوير";
    box.className = "result-box ok";
  } else {
    box.textContent = "❌ تم اكتشاف اختلاف — الوثيقة مزورة أو معدلة";
    box.className = "result-box err";
  }
}