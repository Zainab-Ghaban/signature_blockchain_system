// تحويل الملف إلى ArrayBuffer
async function fileToArrayBuffer(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}

// توليد SHA-256
async function sha256Hex(arrayBuffer) {
  const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// دالة لعرض الرسائل (نجاح أو خطأ)
function showMessage(text, type = "success") {
  const box = document.getElementById("messageBox");
  box.style.display = "block";
  box.textContent = text;
  box.style.color = (type === "success") ? "#00ff9d" : "#ff6b6b";
}

document.addEventListener('DOMContentLoaded', () => {
  const fileInput = document.getElementById('fileInput');
  const btnHash = document.getElementById('btnHash');
  const hashOutput = document.getElementById('hashOutput');
  const result = document.getElementById('result');
  const btnSend = document.getElementById('btnSend');

  // توليد البصمة
  btnHash.addEventListener('click', async () => {
    if (!fileInput.files.length) { showMessage("❌ اختر ملف أولاً", "error"); return; }
    const file = fileInput.files[0];
    if (file.size > 50*1024*1024) { showMessage("❌ الملف أكبر من 50MB", "error"); return; }

    showMessage("⏳ جاري توليد البصمة...");
    btnHash.disabled = true;

    try {
      const buffer = await fileToArrayBuffer(file);
      const hashHex = await sha256Hex(buffer);
      hashOutput.textContent = hashHex;
      result.style.display = 'block';
      showMessage("✔ تم توليد البصمة بنجاح", "success");
    } catch {
      showMessage("❌ خطأ أثناء توليد البصمة", "error");
    } finally {
      btnHash.disabled = false;
    }
  });

  // إرسال الهاش إلى السيرفر / البلوك تشين
  btnSend.addEventListener('click', async () => {
    const hash = hashOutput.textContent.trim();
    if (!hash) { showMessage("❌ لا يوجد بصمة لإرسالها", "error"); return; }

    showMessage("📤 جاري الإرسال للتوثيق...");

    try {
      const resp = await fetch('http://localhost:4000/api/register-hash', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ 
          documentHash: hash,
          filename: fileInput.files[0].name
        })
      });

      const data = await resp.json();
      showMessage("✔ تم تسجيل الوثيقة بنجاح ✅", "success");
    } catch {
      showMessage("❌ فشل الإرسال — الخادم غير متصل", "error");
    }
  });
});