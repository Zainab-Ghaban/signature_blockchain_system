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

// زر "عرض"
function viewEmployee(name){
  showToast(`👤 عرض تفاصيل الموظف: ${name}`);
  // لاحقاً هنا تفتح صفحة تفصيلية للموظف
}

// زر "تعطيل/تفعيل"
function toggleStatus(btn){
  const cell = btn.closest('tr').querySelector('.status');
  if(cell.textContent === 'نشط'){
    cell.textContent = 'معطل';
    cell.className = 'status rejected';
    btn.textContent = 'تفعيل';
    showToast('🚫 تم تعطيل الموظف');
  } else {
    cell.textContent = 'نشط';
    cell.className = 'status approved';
    btn.textContent = 'تعطيل';
    showToast('✅ تم تفعيل الموظف من جديد');
  }
}