// التحقق من تسجيل الدخول وتوجيه المستخدم حسب نوعه
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('btnLogin');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const userType = document.getElementById('userType');
    const errorMsg = document.getElementById('errorMsg');

    btn.addEventListener('click', () => {
        if (!email.value || !password.value || !userType.value) {
            errorMsg.style.display = 'block';
            return;
        }

        // إخفاء رسالة الخطأ لو كان كل شيء تمام
        errorMsg.style.display = 'none';

        // حفظ بيانات بسيطة (مؤقتًا)
        localStorage.setItem('currentUser', email.value);
        localStorage.setItem('userType', userType.value);

        // توجيه حسب نوع المستخدم
        if (userType.value === 'employee') {
            window.location.href = 'employee.html';
        } else if (userType.value === 'user') {
            window.location.href = 'verify.html';
        } else if (userType.value === 'admin') {
            window.location.href = 'admin.html';
        }
    });
});