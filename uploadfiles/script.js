document.addEventListener("DOMContentLoaded", function() {
    // الحصول على معرفات الحقول المستهدفة من المتغير في صفحة HTML
    const fieldIds = window.uploadFields || [];
    
    fieldIds.forEach(id => {
        const field = document.getElementById(id);
        if (field) {
            field.readOnly = true;
            // إنشاء زر اختيار الملف وإضافته بجانب الحقل
            const uploadButton = document.createElement('button');
            uploadButton.textContent = 'اختيار ورفع ملف';
            uploadButton.type = 'button';

            // إدراج الزر بجانب الحقل المستهدف
            field.insertAdjacentElement('afterend', uploadButton);

            // إنشاء عنصر لإظهار رسالة النجاح أو الفشل
            const messageElement = document.createElement('span');
            messageElement.style.display = 'block';
            messageElement.style.color = '#007bff';
            field.insertAdjacentElement('afterend', messageElement);

            uploadButton.addEventListener('click', function() {
                const hiddenFileInput = document.createElement('input');
                hiddenFileInput.type = 'file';

                hiddenFileInput.onchange = () => {
                    const file = hiddenFileInput.files[0];
                    if (file) {
                        // التحقق من امتداد الملف
                        const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'mp4'];
                        const fileExtension = file.name.split('.').pop().toLowerCase();

                        if (!allowedExtensions.includes(fileExtension)) {
                            messageElement.textContent = "صيغة الملف غير مدعومة. الرجاء اختيار ملف بصيغة: " + allowedExtensions.join(", ");
                            messageElement.style.color = 'red';
                            return;
                        }

                        // رفع الملف تلقائيًا
                        uploadFile(file, field, messageElement);
                    }
                };

                hiddenFileInput.click();
            });
        }
    });
});

function uploadFile(file, field, messageElement) {
    const formData = new FormData();
    formData.append("file", file);

    fetch("uploadfiles/upload.php", {
        method: "POST",
        body: formData,
    })
    .then(response => response.text())
    .then(data => {
        if (!data.startsWith("خطأ")) {
            // تحديث حقل النص باسم الملف الجديد
            field.value = data;
            messageElement.textContent = "تم رفع الملف بنجاح: " + data;
            messageElement.style.color = 'green';
        } else {
            messageElement.textContent = data;
            messageElement.style.color = 'red';
        }
    })
    .catch(error => {
        messageElement.textContent = "خطأ: لم يتم رفع الملف.";
        messageElement.style.color = 'red';
        console.error("Error:", error);
    });
}
