// تحميل الإعدادات المحفوظة
document.addEventListener('DOMContentLoaded', () => {
  const saved = JSON.parse(localStorage.getItem('systemSettings') || '{}');

  if (saved.maxFileSize) document.getElementById('maxFileSize').value = saved.maxFileSize;
  if (saved.sessionTime) document.getElementById('sessionTime').value = saved.sessionTime;
  if (saved.rpcUrl) document.getElementById('rpcUrl').value = saved.rpcUrl;
  if (saved.emailNotif) document.getElementById('emailNotif').value = saved.emailNotif;
});

// حفظ الإعدادات في localStorage مؤقتًا
function saveSettings() {
  const settings = {
    maxFileSize: document.getElementById('maxFileSize').value,
    sessionTime: document.getElementById('sessionTime').value,
    rpcUrl: document.getElementById('rpcUrl').value.trim(),
    emailNotif: document.getElementById('emailNotif').value,
  };

  localStorage.setItem('systemSettings', JSON.stringify(settings));
  showToast('✔ تم حفظ الإعدادات بنجاح');
}