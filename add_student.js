document.getElementById("studentForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let student = {
        id: Date.now(), // Генерація унікального ID
        name: document.getElementById("name").value,
        age: document.getElementById("age").value,
        class: document.getElementById("class").value,
        address: document.getElementById("address").value,
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value,
        notes: document.getElementById("notes").value,
        files: [],
        photo: ""
    };

    // Додавання файлів
    const fileInput = document.getElementById('files');
    if (fileInput.files.length > 0) {
        for (let i = 0; i < fileInput.files.length; i++) {
            student.files.push(`docs/${fileInput.files[i].name}`); // Додаємо "docs/" до шляху файлу
        }
    }

    // Додавання фото
    const photoInput = document.getElementById('photo');
    if (photoInput.files.length > 0) {
        student.photo = `images/${photoInput.files[0].name}`; // Додаємо "images/" до шляху фото
    }

    // Отримуємо поточний JSON з localStorage або створюємо новий масив
    let students = JSON.parse(localStorage.getItem("students")) || [];
    students.push(student);

    // Зберігаємо оновлений список студентів
    localStorage.setItem("students", JSON.stringify(students));

    // Виведення JSON на екран
    document.getElementById("jsonOutput").textContent = JSON.stringify(students, null, 2);
});

// Кнопка для очищення JSON
document.getElementById("clearJson").addEventListener("click", function() {
    localStorage.removeItem("students");
    document.getElementById("jsonOutput").textContent = "JSON очищено";
});

// Кнопка для повернення на головну сторінку
document.getElementById("backToMain").addEventListener("click", function() {
    window.location.href = "index.html"; // Або вкажи потрібний шлях
});
