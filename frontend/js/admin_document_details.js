function toggleMenu(){
  const side = document.getElementById('sideMenu');
  const overlay = document.getElementById('overlay');
  const isOpen = side.classList.toggle('show');
  overlay.classList.toggle('show', isOpen);
}

function showToast(msg){
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(()=> t.classList.remove('show'), 2500);
}

function approveDocument(){
  document.getElementById('docStatus').textContent = "موثقة";
  document.getElementById('docStatus').className = "status approved";
  showToast("✔ تم قبول الوثيقة وتوثيقها بنجاح");
}

function rejectDocument(){
  document.getElementById('docStatus').textContent = "مرفوضة";
  document.getElementById('docStatus').className = "status rejected";
  showToast("❌ تم رفض الوثيقة");
}

function downloadDocument(){
  showToast("⬇️ جاري تحميل الوثيقة...");
  // مثال: تحميل فعلي (لاحقًا يرتبط بالمخزن)
  const viewer = document.getElementById('docViewer');
  const fileURL = viewer.getAttribute('src');
  const link = document.createElement('a');
  link.href = fileURL;
  link.download = fileURL.split('/').pop();
  link.click();
}

function goBack(){
  window.history.back();
}