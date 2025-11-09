// 🔹 فتح/إغلاق القائمة الجانبية مع التظليل
function toggleMenu() {
  const side = document.getElementById('sideMenu');
  const overlay = document.getElementById('overlay');
  const isOpen = side.classList.toggle('show');
  overlay.classList.toggle('show', isOpen);
}

// 🔹 إشعار بسيط (توست)
function showToast(msg, isError = false) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.toggle('error', !!isError);
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2600);
}

// 🔹 تحديث الإحصائيات في الكروت العلوية
function refreshStats() {
  const rows = [...document.querySelectorAll('#docsTable tbody tr')];
  let approved = 0, pending = 0, rejected = 0;

  rows.forEach(tr => {
    const st = tr.dataset.status;
    if (st === 'approved') approved++;
    else if (st === 'pending') pending++;
    else if (st === 'rejected') rejected++;
  });

  document.getElementById('statApproved').textContent = approved;
  document.getElementById('statPending').textContent = pending;
  document.getElementById('statRejected').textContent = rejected;
}

// 🔹 قبول وثيقة (تغيير الحالة إلى موثقة)
function approveDocument(id) {
  const row = document.querySelector(`#docsTable tr[data-id="${id}"]`);
  if (!row) return;

  row.dataset.status = 'approved';
  const cell = row.querySelector('.status');
  cell.className = 'status approved';
  cell.textContent = 'موثقة';
  showToast('✔ تم قبول الوثيقة وتوثيقها بنجاح');
  refreshStats();

  // ⚙️ مستقبلاً سيتم ربطها بـ API فعلي
  // fetch('/api/admin/approve', { method: 'POST', body: JSON.stringify({ id }) })
}

// 🔹 رفض وثيقة (تغيير الحالة إلى مرفوضة)
function rejectDocument(id) {
  const row = document.querySelector(`#docsTable tr[data-id="${id}"]`);
  if (!row) return;

  row.dataset.status = 'rejected';
  const cell = row.querySelector('.status');
  cell.className = 'status rejected';
  cell.textContent = 'مرفوضة';
  showToast('❌ تم رفض الوثيقة');
  refreshStats();

  // ⚙️ مستقبلاً سيتم ربطها بـ API فعلي
  // fetch('/api/admin/reject', { method: 'POST', body: JSON.stringify({ id }) })
}

// 🔹 فتح صفحة عرض التفاصيل
function viewDocumentDetails(id) {
  // مستقبلاً سيُمرر ID الوثيقة كـ Query
  window.location.href = `admin_document_details.html?id=${id}`;
}

// 🔹 تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
  refreshStats();
  const adminName = localStorage.getItem('adminName') || 'المدير';
  document.getElementById('adminWelcome').textContent = `مرحبًا، ${adminName}`;
});