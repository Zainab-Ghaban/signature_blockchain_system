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

// تغيير كلمة المرور (محاكاة مؤقتة)
function changePassword(){
  showToast('🔒 سيتم تفعيل ميزة تغيير كلمة المرور لاحقاً');
}

// تحميل بيانات المدير (لاحقاً تُجلب من قاعدة البيانات)
document.addEventListener('DOMContentLoaded', ()=>{
  const name = localStorage.getItem('adminName') || 'محمد أحمد';
  document.getElementById('adminName').textContent = name;
});