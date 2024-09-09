// Функция для создания карточки ученика
function createStudentCard(student) {
    const card = document.createElement('div');
    card.className = 'student-card';

    const photo = document.createElement('img');
    photo.src = student.photo;
    photo.alt = student.name;
    card.appendChild(photo);

    const name = document.createElement('h2');
    name.textContent = student.name;
    card.appendChild(name);

    const age = document.createElement('p');
    age.textContent = `Возраст: ${student.age}`;
    card.appendChild(age);

    const classInfo = document.createElement('p');
    classInfo.textContent = `Класс: ${student.class}`;
    card.appendChild(classInfo);

    const address = document.createElement('p');
    address.textContent = `Адрес: ${student.address}`;
    card.appendChild(address);

    const phone = document.createElement('p');
    phone.textContent = `Телефон: ${student.phone}`;
    card.appendChild(phone);

    const email = document.createElement('p');
    email.textContent = `Email: ${student.email}`;
    card.appendChild(email);

    const notes = document.createElement('p');
    notes.textContent = `Примечания: ${student.notes}`;
    card.appendChild(notes);

    const filesList = document.createElement('ul');
    student.files.forEach(file => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = file;
        link.textContent = file.split('/').pop();
        link.target = '_blank';
        listItem.appendChild(link);
        filesList.appendChild(listItem);
    });
    card.appendChild(filesList);

    return card;
}

// Функция для создания секции класса
function createClassSection(className, students) {
    const section = document.createElement('div');
    section.className = 'class-section';

    const title = document.createElement('h1');
    title.textContent = `Класс ${className}`;
    section.appendChild(title);

    const studentsContainer = document.createElement('div');
    studentsContainer.className = 'students-container';
    students.forEach(student => {
        const card = createStudentCard(student);
        studentsContainer.appendChild(card);
    });
    section.appendChild(studentsContainer);

    return section;
}

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
            const section = createClassSection(className, classes[className]);
            container.appendChild(section);
        });
    })
    .catch(error => console.error('Ошибка загрузки данных:', error));
