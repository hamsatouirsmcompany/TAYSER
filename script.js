// ============================================================
// ضع هنا رابط الـ Web App الخاص بـ Google Apps Script بعد نشره
// شرح كامل لطريقة الحصول على الرابط موجود في ملف README.md
// ============================================================
const SHEET_WEBAPP_URL = "PASTE_YOUR_GOOGLE_APPS_SCRIPT_URL_HERE";

document.getElementById("year").textContent = new Date().getFullYear();

// قائمة الموبايل
const navToggle = document.getElementById("navToggle");
const nav = document.querySelector(".nav");
navToggle.addEventListener("click", () => {
  nav.classList.toggle("is-open");
});
nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => nav.classList.remove("is-open"));
});

// نموذج التسجيل
const form = document.getElementById("tasgeelForm");
const submitBtn = document.getElementById("submitBtn");
const statusEl = document.getElementById("formStatus");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  statusEl.textContent = "";
  statusEl.className = "form__status";

  if (SHEET_WEBAPP_URL.includes("PASTE_YOUR")) {
    statusEl.textContent = "لم يتم ربط النموذج بجوجل شيت بعد — راجع ملف README.md لإتمام الإعداد.";
    statusEl.classList.add("is-error");
    return;
  }

  const data = new FormData(form);
  data.append("submittedAt", new Date().toISOString());

  submitBtn.disabled = true;
  submitBtn.textContent = "جارٍ الإرسال...";

  try {
    // Apps Script Web Apps لا تُرجع رؤوس CORS عادةً، لذا نرسل الطلب
    // في وضع no-cors ونفترض النجاح إذا لم يحدث خطأ في الشبكة.
    await fetch(SHEET_WEBAPP_URL, {
      method: "POST",
      mode: "no-cors",
      body: data,
    });

    statusEl.textContent = "تم إرسال بياناتك بنجاح، سيتواصل معك فريقنا قريبًا بإذن الله.";
    statusEl.classList.add("is-success");
    form.reset();
  } catch (err) {
    statusEl.textContent = "حدث خطأ أثناء الإرسال، برجاء المحاولة مرة أخرى أو التواصل عبر واتساب.";
    statusEl.classList.add("is-error");
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "إرسال البيانات";
  }
});
