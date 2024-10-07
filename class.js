// Функция для возврата на главную страницу
function goBack() {
    window.location.href = 'index.html';
}

// Получение параметра класса из URL
const urlParams = new URLSearchParams(window.location.search);
const className = urlParams.get('class');
document.getElementById('class-title').textContent = `${className}`;

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

    // Додавання іконки телефону
    const phoneIcon = document.createElement('a');
    phoneIcon.href = `tel:${student.phone}`;
    phoneIcon.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="green" width="24px" height="24px">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1.003 1.003 0 011.1-.23 9.43 9.43 0 003.24.61c.55 0 1 .45 1 1v3.5c0 .55-.45 1-1 1C9.39 21 3 14.61 3 6.5c0-.55.45-1 1-1H7.5c.55 0 1 .45 1 1 0 1.13.2 2.23.61 3.24.14.32.07.7-.23 1.1l-2.2 2.2z"/>
        </svg>
    `;
    card.appendChild(phoneIcon);

    card.addEventListener('click', () => {
        showModal(student);
    });

    return card;
}

// Загрузка данных из JSON и отображение на странице
fetch('students.json')
    .then(response => response.json())
    .then(data => {
        const students = data.filter(student => student.class === className);
        const container = document.getElementById('students-container');
        students.forEach(student => {
            const card = createStudentCard(student);
            container.appendChild(card);
        });
    })
    .catch(error => console.error('Ошибка загрузки данных:', error));

// Функция для показа модального окна с информацией об ученике
function showModal(student) {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
        <h2>${student.name}</h2>
        <p>Дата народження: ${student.age}</p>
        <p>Розділ: ${student.class}</p>
        <p>Адреса: ${student.address}</p>
        <p>Телефон: <a href="tel:${student.phone}">${student.phone}</a></p> <!-- Додаємо посилання на дзвінок -->
        <p>Email: ${student.email}</p>
        <p>Примітки: ${student.notes}</p>
        <ul>
            ${student.files.map(file => `<li><a href="${file}" target="_blank">${file.split('/').pop()}</a></li>`).join('')}
        </ul>
    `;
    modal.style.display = 'block';

    // Закрытие модального окна
    const closeBtn = document.querySelector('.close');
    closeBtn.onclick = () => {
        modal.style.display = 'none';
    };

    // Закрытие модального окна при клике вне его
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };
}
