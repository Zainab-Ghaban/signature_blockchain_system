// ================================
// قاعدة البيانات الافتراضية
// ================================
const mockDocs = {
  "DOC-984231": {
    status: "approved",
    owner: "أحمد عبد الله سالم",
    name: "عقد إيجار – أحمد سالم",
    date: "2025-01-14 03:41 PM",
    hash: "8f2c14e7b99d4418c0d29e9956a2f77d635b7b24b5163a1e807399e12c42fd88"
  },
  "DOC-552710": {
    status: "modified",
    owner: "وفاء محمد العمري",
    name: "إفادة دخل – وفاء العمري",
    date: "2025-02-02 11:55 AM",
    hashOriginal: "e4c1129b8124f3a6fa8cb8825d91ab002feda0f91fd39f3bd1b662eaa7c5a9b2",
    hashNow: "d7c9fbc61b0c4bb2903b7b63956fd112a13a009e243da789b1b28724b909cd55"
  }
};

// فتح القائمة
function toggleMenu(){
  document.getElementById("sideMenu").classList.toggle("show");
  document.getElementById("overlay").classList.toggle("show");
}

// إظهار التبويب المختار
function showTab(id){
  document.querySelectorAll(".tab").forEach(t => t.style.display="none");
  document.getElementById(id).style.display = "block";
}

// ================================
// 1) التحقق برقم الوثيقة
// ================================
function checkById(){
  const id = document.getElementById("docIdInput").value.trim();
  const resultBox = document.getElementById("resultBox");
  const result = document.getElementById("resultContent");

  if(!id){
    resultBox.style.display="block";
    result.innerHTML = `<p style="color:#ff9999;">⚠ الرجاء إدخال رقم الوثيقة</p>`;
    return;
  }

  if(mockDocs[id]){
    const doc = mockDocs[id];

    if(doc.status === "approved"){
      resultBox.style.display="block";
      result.innerHTML = `
        <p><b>الحالة:</b> ✔ موثقة</p>
        <p><b>اسم الوثيقة:</b> ${doc.name}</p>
        <p><b>المالك:</b> ${doc.owner}</p>
        <p><b>تاريخ التوثيق:</b> ${doc.date}</p>
        <p><b>البصمة:</b><br>${doc.hash}</p>
      `;
    }
    else if(doc.status === "modified"){
      resultBox.style.display="block";
      result.innerHTML = `
        <p><b>الحالة:</b> ❌ الوثيقة معدَّلة</p>
        <p><b>اسم الوثيقة:</b> ${doc.name}</p>
        <p><b>المالك:</b> ${doc.owner}</p>
        <p><b>البصمة الأصلية:</b><br>${doc.hashOriginal}</p>
        <p><b>البصمة الحالية:</b><br>${doc.hashNow}</p>
      `;
    }

  } else {
    resultBox.style.display="block";
    result.innerHTML = `<p><b>⚠ الوثيقة غير موجودة في النظام</b></p>`;
  }
}

// ================================
// 2) التحقق برفع ملف (محاكاة فقط)
// ================================
function checkByUpload(){
  const file = document.getElementById("fileInput").files[0];
  const resultBox = document.getElementById("resultBox");
  const result = document.getElementById("resultContent");

  if(!file){
    resultBox.style.display="block";
    result.innerHTML = `<p style="color:#ff9999;">⚠ الرجاء اختيار ملف</p>`;
    return;
  }

  // نتيجة تجريبية
  resultBox.style.display="block";
  result.innerHTML = `
    <p><b>الحالة:</b> ✔ تم تحليل الملف (محاكاة)</p>
    <p>سيتم ربط الفحص الفعلي عند تشغيل الباك-إند.</p>
  `;
}

// ================================
// 3) مسح QR — سيضاف لاحقًا
// ================================