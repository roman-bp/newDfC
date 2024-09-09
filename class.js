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
        <p>Вік: ${student.age}</p>
        <p>Розділ: ${student.class}</p>
        <p>Адреса: ${student.address}</p>
        <p>Телефон: ${student.phone}</p>
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
