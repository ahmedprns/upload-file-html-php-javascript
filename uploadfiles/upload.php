<?php
$uploadDir = __DIR__ . '/../files/';
$file = $_FILES['file'];

// التأكد من صحة البيانات
if ($file && $file['error'] == 0) {
    $originalName = pathinfo($file['name'], PATHINFO_FILENAME);
    $extension = pathinfo($file['name'], PATHINFO_EXTENSION);

    // إضافة التاريخ والوقت إلى اسم الملف
    $timestamp = date("YmdHis"); // صيغة التاريخ والوقت: YYYYMMDDHHMMSS
    $newName = $originalName . '_' . $timestamp . '.' . $extension;
    $filePath = $uploadDir . $newName;

    // محاولة رفع الملف
    if (move_uploaded_file($file['tmp_name'], $filePath)) {
        echo $newName; // إرجاع الاسم الجديد فقط
    } else {
        echo "خطأ: لم يتم رفع الملف";
    }
} else {
    echo "خطأ: لم يتم رفع الملف أو أن هناك مشكلة في الملف";
}
?>
