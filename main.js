// Цифровые паттерны для отображения звездочками (7-сегментный дисплей)
const digitPatterns = {
    '0': [
        ' *** ',
        '*   *',
        '*   *',
        '*   *',
        '*   *',
        '*   *',
        ' *** '
    ],
    '1': [
        '    *',
        '    *',
        '    *',
        '    *',
        '    *',
        '    *',
        '    *'
    ],
    '2': [
        ' *** ',
        '    *',
        '    *',
        ' *** ',
        '*    ',
        '*    ',
        ' *** '
    ],
    '3': [
        ' *** ',
        '    *',
        '    *',
        ' *** ',
        '    *',
        '    *',
        ' *** '
    ],
    '4': [
        '*   *',
        '*   *',
        '*   *',
        ' *** ',
        '    *',
        '    *',
        '    *'
    ],
    '5': [
        ' *** ',
        '*    ',
        '*    ',
        ' *** ',
        '    *',
        '    *',
        ' *** '
    ],
    '6': [
        ' *** ',
        '*    ',
        '*    ',
        ' *** ',
        '*   *',
        '*   *',
        ' *** '
    ],
    '7': [
        ' *** ',
        '    *',
        '    *',
        '    *',
        '    *',
        '    *',
        '    *'
    ],
    '8': [
        ' *** ',
        '*   *',
        '*   *',
        ' *** ',
        '*   *',
        '*   *',
        ' *** '
    ],
    '9': [
        ' *** ',
        '*   *',
        '*   *',
        ' *** ',
        '    *',
        '    *',
        ' *** '
    ],
    ' ': [
        '     ',
        '     ',
        '     ',
        '     ',
        '     ',
        '     ',
        '     '
    ]
};

// Функция для определения дня недели
function getDayOfWeek(day, month, year) {
    const date = new Date(year, month - 1, day);
    const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    return days[date.getDay()];
}

// Функция для проверки високосного года
function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

// Функция для вычисления возраста
function calculateAge(day, month, year) {
    const today = new Date();
    const birthDate = new Date(year, month - 1, day);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    return age;
}

// Функция для отображения даты звездочками в консоли
function displayDateWithStars(day, month, year) {
    const dateString = `${day.toString().padStart(2, '0')} ${month.toString().padStart(2, '0')} ${year}`;
    console.log('\n🎂 ДАТА РОЖДЕНИЯ В ФОРМАТЕ ЭЛЕКТРОННОГО ТАБЛО 🎂\n');
    
    // Создаем массив для каждой строки паттерна
    const lines = ['', '', '', '', '', '', ''];
    
    // Проходим по каждому символу в дате
    for (let char of dateString) {
        const pattern = digitPatterns[char];
        if (pattern) {
            // Добавляем каждую строку паттерна к соответствующей строке результата
            for (let i = 0; i < 7; i++) {
                lines[i] += pattern[i] + '  '; // Добавляем пробел между цифрами
            }
        }
    }
    
    // Выводим все строки
    lines.forEach(line => console.log(line));
    console.log('\nФормат: ДД ММ ГГГГ\n');
}

// Функция валидации даты
function validateDate(day, month, year) {
    const currentYear = new Date().getFullYear();
    
    if (year < 1900 || year > currentYear) {
        return { valid: false, message: 'Год должен быть от 1900 до текущего года' };
    }
    
    if (month < 1 || month > 12) {
        return { valid: false, message: 'Месяц должен быть от 1 до 12' };
    }
    
    const daysInMonth = new Date(year, month, 0).getDate();
    if (day < 1 || day > daysInMonth) {
        return { valid: false, message: `В ${getMonthName(month)} ${year} года ${daysInMonth} дней` };
    }
    
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();
    if (birthDate > today) {
        return { valid: false, message: 'Дата рождения не может быть в будущем' };
    }
    
    return { valid: true };
}

function getMonthName(month) {
    const months = [
        '', 'январе', 'феврале', 'марте', 'апреле', 'мае', 'июне',
        'июле', 'августе', 'сентябре', 'октябре', 'ноябре', 'декабре'
    ];
    return months[month];
}

// Обработчик отправки формы
document.getElementById('birthdayForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const day = parseInt(document.getElementById('day').value);
    const month = parseInt(document.getElementById('month').value);
    const year = parseInt(document.getElementById('year').value);
    
    // Валидация
    const validation = validateDate(day, month, year);
    if (!validation.valid) {
        alert(validation.message);
        return;
    }
    
    // Вычисления
    const dayOfWeek = getDayOfWeek(day, month, year);
    const leapYear = isLeapYear(year);
    const age = calculateAge(day, month, year);
    
    // Отображение результатов
    document.getElementById('dayOfWeek').textContent = `Вы родились в ${dayOfWeek.toLowerCase()}`;
    document.getElementById('leapYear').textContent = leapYear 
        ? `${year} год был високосным (366 дней)` 
        : `${year} год был обычным (365 дней)`;
    document.getElementById('age').textContent = `Вам ${age} ${getAgeWord(age)}`;
    
    // Показываем результаты с анимацией
    const resultsElement = document.getElementById('results');
    resultsElement.classList.remove('hidden');
    
    // Анимация появления результатов
    setTimeout(() => {
        resultsElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 300);
    
    // Отображение в консоли
    displayDateWithStars(day, month, year);
    
    // Дополнительная информация в консоли
    console.log(`📊 ПОДРОБНАЯ ИНФОРМАЦИЯ:`);
    console.log(`📅 День недели: ${dayOfWeek}`);
    console.log(`🗓️  Високосный год: ${leapYear ? 'Да' : 'Нет'}`);
    console.log(`🎈 Возраст: ${age} ${getAgeWord(age)}`);
    console.log(`⏰ Дата анализа: ${new Date().toLocaleString('ru-RU')}`);
});

function getAgeWord(age) {
    const lastDigit = age % 10;
    const lastTwoDigits = age % 100;
    
    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
        return 'лет';
    }
    
    if (lastDigit === 1) return 'год';
    if (lastDigit >= 2 && lastDigit <= 4) return 'года';
    return 'лет';
}

// Дополнительные анимации при загрузке
document.addEventListener('DOMContentLoaded', function() {
    // Добавляем эффект печатания к заголовку
    const title = document.querySelector('.title');
    const originalText = title.querySelector('span:last-child') ? title.querySelector('span:last-child').textContent : title.textContent;
    
    // Приветственное сообщение в консоли
    console.log(`
🎂 ================================ 🎂
   АНАЛИЗАТОР ДАТЫ РОЖДЕНИЯ
🎂 ================================ 🎂

Добро пожаловать! Заполните форму на странице,
и результат в виде электронного табло появится здесь!

Создано с ❤️ в 2025 году
    `);
});

// Динамическая валидация полей
document.getElementById('day').addEventListener('input', function() {
    const day = parseInt(this.value);
    if (day < 1 || day > 31) {
        this.style.borderColor = 'rgba(239, 68, 68, 0.6)';
    } else {
        this.style.borderColor = 'rgba(255, 255, 255, 0.3)';
    }
});

document.getElementById('year').addEventListener('input', function() {
    const year = parseInt(this.value);
    const currentYear = new Date().getFullYear();
    if (year < 1900 || year > currentYear) {
        this.style.borderColor = 'rgba(239, 68, 68, 0.6)';
    } else {
        this.style.borderColor = 'rgba(255, 255, 255, 0.3)';
    }
});

// Добавляем звуковой эффект при наведении на кнопку (без звука, только визуально)
document.querySelector('.btn-submit').addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-3px) scale(1.02)';
});

document.querySelector('.btn-submit').addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
});