// Загрузка данных из JSON и отображение на странице
fetch('students.json')
    .then(response => response.json())
    .then(data => {
        const classes = {};
        data.forEach(student => {
            if (!classes[student.class]) {
                classes[student.class] = [];
            }
            classes[student.class].push(student);
        });

        const container = document.getElementById('classes-container');
        Object.keys(classes).forEach(className => {
            const classLink = document.createElement('a');
            classLink.href = `class.html?class=${encodeURIComponent(className)}`;
            classLink.textContent = ` ${className}`;
            classLink.className = 'class-link';
            container.appendChild(classLink);
        });
    })
    .catch(error => console.error('Ошибка загрузки данных:', error));
