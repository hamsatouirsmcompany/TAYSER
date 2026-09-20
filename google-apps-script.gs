/**
 * عمرة التيسير — استقبال بيانات نموذج التسجيل وتسجيلها في Google Sheet
 *
 * طريقة التركيب موضحة بالتفصيل في ملف README.md
 */

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // لو الشيت فاضي، أضف صف العناوين أول مرة
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["تاريخ التسجيل", "الاسم", "رقم الهاتف", "الباقة", "ملاحظات"]);
  }

  var params = e.parameter;

  sheet.appendRow([
    new Date(),
    params.name || "",
    params.phone || "",
    params.plan || "",
    params.notes || "",
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ result: "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  return ContentService
    .createTextOutput("عمرة التيسير — نقطة استقبال بيانات النموذج تعمل.")
    .setMimeType(ContentService.MimeType.TEXT);
}
