// Управление активными кнопками и контентом
document.addEventListener('DOMContentLoaded', function () {
    const allButtons = document.querySelectorAll('.sidebar-btn');
    const creaturesContent = document.getElementById('creatures-content');
    const planetsContent = document.getElementById('planets-content');
    const faunaContent = document.getElementById('fauna-content');
    const resourcesContent = document.getElementById('resources-content'); // Добавлено
    const creatureCards = document.querySelectorAll('.creature-card');

    // Элементы фильтрации существ
    const searchInput = document.getElementById('creature-search');
    const searchBtn = document.getElementById('search-btn');
    const planetFilter = document.getElementById('planet-filter');
    const sortBtn = document.getElementById('sort-btn');
    const resetBtn = document.getElementById('reset-btn');
    const creaturesGrid = document.querySelector('.creatures-grid');

    // === ПАГИНАЦИЯ СУЩЕСТВ ===
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const currentRange = document.getElementById('current-range');
    const totalCreatures = document.getElementById('total-creatures');

    // Элементы фауны
    const faunaSearchInput = document.getElementById('fauna-search');
    const faunaSearchBtn = document.getElementById('fauna-search-btn');
    const faunaTypeFilter = document.getElementById('fauna-type-filter');
    const faunaPlanetFilter = document.getElementById('fauna-planet-filter');
    const faunaSortBtn = document.getElementById('fauna-sort-btn');
    const faunaResetBtn = document.getElementById('fauna-reset-btn');
    const faunaGrid = document.querySelector('.fauna-grid');
    const faunaCards = document.querySelectorAll('.fauna-card');
    const faunaPrevBtn = document.getElementById('fauna-prev-btn');
    const faunaNextBtn = document.getElementById('fauna-next-btn');
    const faunaCurrentRange = document.getElementById('fauna-current-range');
    const faunaTotalCount = document.getElementById('fauna-total-count');

    // === ПЕРЕМЕННЫЕ ДЛЯ РЕСУРСОВ ===
    const resourceCards = document.querySelectorAll('.resource-card');
    const resourceGrid = document.querySelector('.resources-grid');
    const resourceSearchInput = document.getElementById('resource-search');
    const resourceSearchBtn = document.getElementById('resource-search-btn');
    const resourceTypeFilter = document.getElementById('resource-type-filter');
    const resourcePlanetFilter = document.getElementById('resource-planet-filter');
    const resourceSortBtn = document.getElementById('resource-sort-btn');
    const resourceResetBtn = document.getElementById('resource-reset-btn');
    const resourcePrevBtn = document.getElementById('resource-prev-btn');
    const resourceNextBtn = document.getElementById('resource-next-btn');
    const resourceCurrentRange = document.getElementById('resource-current-range');
    const resourceTotalCount = document.getElementById('resource-total-count');

    // === ЭЛЕМЕНТЫ СЕКРЕТНОЙ ИНФОРМАЦИИ ===
    const secretInfoBtn = document.getElementById('secret-info-btn');
    const secretModal = document.getElementById('secretModal');
    const secretCloseBtn = document.querySelector('.secret-close');
    const secretCodeInput = document.getElementById('secretCode');
    const submitSecretCodeBtn = document.getElementById('submitSecretCode');
    const secretErrorMessage = document.getElementById('secretErrorMessage');

    // === ЭЛЕМЕНТЫ ДЛЯ "ПОНЯТИЯ" ===
    const conceptsModal = document.getElementById('conceptsModal');
    const conceptsCloseBtn = document.querySelector('.concepts-close');
    const conceptSearchInput = document.getElementById('concept-search');
    const conceptSearchBtn = document.getElementById('concept-search-btn');
    const conceptCards = document.querySelectorAll('.concept-card');

    // === ЭЛЕМЕНТЫ ДЛЯ СИСТЕМЫ ТЕМ ===
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const themePanel = document.getElementById('theme-panel');
    const closePanelBtn = document.getElementById('close-panel');
    const panelOverlay = document.getElementById('panel-overlay');
    const themeOptions = document.querySelectorAll('.theme-option');
    const volumeSlider = document.getElementById('volume-slider');
    const volumeValue = document.getElementById('volume-value');
    const themeMusic = document.getElementById('theme-music');
    const currentTrack = document.getElementById('current-track');
    const currentThemeName = document.getElementById('current-theme-name');
    const resetThemeBtn = document.getElementById('reset-theme-btn');
    const secretThemeBtn = document.querySelector('.theme-option.secret-theme');
    const nullSpaceThemeBtn = document.querySelector('.theme-option[data-theme="null-space"]');

    const storyContent = document.getElementById('story-content');
    const storyBtn = document.getElementById('story-btn');

    const galleryBtn = document.getElementById('gallery-btn');

    const secretNotes = {
        "ГРИГОРИЙ": {
            title: "Записка для Григория.",
            text: "Мы рады, что вы присоединились в нашу команду! будьте как дома, в компании АМЕГА один за всех и все за одного! Вы были приняты на работу в *засекречено*, ваш шаттл будет находиться на Окроме, вместе с вами так же будет работать и Джессика, в качестве напарника."
        },
        "МАКС": {
            title: "Записка о переводе.",
            text: "Здравствуй Максим! Начиная с *засекречено* по *засекречено*, вы будете переведены в команду А-175. Ваши напарники: Григорий - специалист по фауне, Джессика - специалист по флоре и временный специалист по ресурсам. Удачи сработаться!"
        },
        "ДЖЕС": {
            title: "Записка о перевылошоамшкамр.",
            text: "Здравствуй Джессика! ... *записка повреждена* (03-2)"
        },
        "БЕЗЫМЯННЫЙ": {
            title: "Записка от Элионоры.",
            text: "Я.. Я ничего не понимаю. Его букально нигде нет! Я искала его во всех наших базах данных, но ни одного упоминания!!! Быть такого не может, я просто не верю, просто не верю... Возможно, это просто гастарбайтер, который каким-то образом проник в цитадель??? Нет.. Тогда у него явно были бы проблемы с пропуском... Я не понимаю, кто он чёрт возьми такой?!?!!?"
        },
        "КОЛЛЕКЦИОНЕР": {
            title: "Личное сообщение для избранных.",
            text: "И так.. Вы знаете о его существовании, быть может, вы скоро с ним встретитесь. Как скоро? Это уже ЕГО дело."
        },
        "ШАТТЛ": {
            title: "Отчёт о перевозке.",
            text: "Задача: перевезти в цитадель столы 3 шт., диваны 8 шт., переносные склады 7 шт. . Вопрос, почему пришли только столы? Официальная причина - нехватка места, но места было достаточно! Либо это какая-то халтура грузчиков, либо здесь явно перевозили не только мебель..."
        },
        "КОШМАР": {
            title: "Запись из линых сообщений.",
            text: "Слушай, понишь ты рассказывал про свой кошмар? По всей видимости Армагеддон буквально вылез из него пхпхпхпх. (23-1)"
        },
        "ПТИЧКА": {
            title: "Опыт номер 40.",
            text: "После долгих размышлений, был принят приказ скрестить существо #011 и #012, для создания субьекта, что сможет помочь в исследовании Хаяси. Змеевидная пиявка была оснащена специальной маской, для подачи фиодальницыка. Приказ был успешно выполнен. Следующий этап: оснастить каждого сотрудника по одной мраморной пиявке. "
        },
        "МАСКА": {
            title: "Секретный приказ.",
            text: "Значит так Килби, нам надоели твои постоянные запои, мы вынуждены уволить тебя за неподобающее поведение на рабочем месте! Единственное, что требуется от тебя сейчас - это внести описания существа #000, и засекретить к нему доступ! После твоего увольнения, мы примем нового сотрудника для работы с описаниями существ. Зарплата будет выплачена, основную функцию в виде создания сайта ты выполнил, а значит и выполнил свои обязанности. (1992-3)"
        },
        "ЭМБЛЕМА ОКРОМЫ": {
            title: "Из записей дневника Макса.",
            text: "Эта штука... Для чего она вообще нужна? Быть может, это обычный элемент декорации?.. Но откуда? На этой планете нет разумных видов. Так много вопросов и так мало ответов... Буду скрытно изучать эту штуковину, не думаю что о находке нужно говорить начальству."
        }


    };

    // Настройки пагинации
    const CREATURES_PER_PAGE = 14;
    const FAUNA_PER_PAGE = 14;
    const RESOURCES_PER_PAGE = 14; 
    let currentPage = 1;
    let currentFaunaPage = 1;
    let currentResourcePage = 1; 
    let allCreatures = [];
    let filteredCreatures = [];
    let allFauna = [];
    let filteredFauna = [];
    let allResources = []; 
    let filteredResources = []; 



    // === СЕКРЕТНЫЕ КОДЫ И ТЕМЫ ===
    const secretThemes = {
        "ПУСТОТА": "null-space",        // Код для Нулевого пространства
        "23031992": "secret",        // Альтернативный код
        
    };

    // Секретные коды и соответствующие страницы (старые, для редиректов)
    const secretCodes = {
        "ШАЙГАЙ": "articles/creature_0.html",
        // Добавляем коды для тем
        "ПУСТОТА": "null-space",
        "23031992": "secret"
    };

    // === ЭЛЕМЕНТЫ ДЛЯ "О НАС" ===
    const aboutModal = document.getElementById('aboutModal');
    const aboutCloseBtn = document.querySelector('.about-close');

    // === МУЗЫКА ДЛЯ ТЕМ ===
    const themeMusicMap = {
        'amega': 'audio/theme_amega.mp3',
        'okroma': 'audio/theme_okroma.mp3',
        'plauero': 'audio/theme_plauero.mp3',
        'tarante': 'audio/theme_tarante.mp3',
        'shan-lu': 'audio/theme_shan_lu.mp3',
        'akra': 'audio/theme_akra.mp3',
        'hayashi': 'audio/theme_hayashi.mp3',
        'shutyam': 'audio/theme_shutyam.mp3',
        'temeni': 'audio/theme_temeni.mp3',
        'izgoika': 'audio/theme_izgoika.mp3',
        'null-space': 'audio/theme_null_space.mp3',
        'secret': 'audio/theme_secret.mp3'
    };

    // === НАЗВАНИЯ ТЕМ ===
    const themeNames = {
        'amega': 'АМЕГА',
        'okroma': 'Окромы',
        'plauero': 'Плауэро',
        'tarante': 'Таранте',
        'shan-lu': 'Шань-Лу',
        'akra': 'Акрары',
        'hayashi': 'Хаяси',
        'shutyam': 'Шутьяма',
        'temeni': 'Темени',
        'izgoika': 'Изгойка',
        'null-space': 'Нулевое пространство',
        'secret': '??? (Секретная)'
    };

    function showSecretNote(title, text) {
        const note = document.createElement('div');

        note.className = 'secret-note';
        note.innerHTML = `
        <div class="secret-note-content">
            <h2>${title}</h2>
            <p>${text}</p>
            <button onclick="this.parentElement.parentElement.remove()">Закрыть</button>
        </div>
    `;

        document.body.appendChild(note);
    }

    // === ФУНКЦИИ СИСТЕМЫ ТЕМ (ОБНОВЛЕННЫЕ) ===

    function openThemePanel() {
        themePanel.classList.add('active');
        panelOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeThemePanel() {
        themePanel.classList.remove('active');
        panelOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    function applyTheme(themeName) {
        // Обновляем класс body
        document.body.className = '';
        document.body.classList.add(`theme-${themeName}`);

        // Обновляем активную кнопку темы
        themeOptions.forEach(option => {
            option.classList.remove('active');
            if (option.dataset.theme === themeName) {
                option.classList.add('active');
            }
        });

        // Сохраняем в localStorage
        localStorage.setItem('site-theme', themeName);

        // Обновляем отображение названия темы
        if (currentThemeName) {
            currentThemeName.textContent = themeNames[themeName];
        }

        // Меняем музыку
        changeMusicForTheme(themeName);
    }

    function changeMusicForTheme(themeName) {
        const musicSrc = themeMusicMap[themeName];
        if (musicSrc && themeMusic) {
            // Обновляем отображение трека
            if (currentTrack) {
                currentTrack.textContent = `Трек: ${themeNames[themeName]}`;
            }

            // Меняем источник если нужно
            if (themeMusic.src !== musicSrc) {
                themeMusic.pause();
                themeMusic.src = musicSrc;
                themeMusic.volume = volumeSlider.value / 100;

                // Пытаемся воспроизвести
                themeMusic.play().catch(e => {
                    console.log("Автовоспроизведение заблокировано.");
                });
            }
        }
    }

    function loadSavedSettings() {
        // Загружаем тему (если это не секретная тема, которая не разблокирована)
        const savedTheme = localStorage.getItem('site-theme') || 'amega';

        // Проверяем, разблокирована ли тема
        const unlockedThemes = JSON.parse(localStorage.getItem('unlocked-themes') || '[]');

        if (savedTheme === 'null-space' && !unlockedThemes.includes('null-space')) {
            // Если null-space не разблокирована, возвращаем к базовой теме
            applyTheme('amega');
            localStorage.setItem('site-theme', 'amega');
        } else if (savedTheme === 'secret' && !unlockedThemes.includes('secret')) {
            // Если secret не разблокирована, возвращаем к базовой теме
            applyTheme('amega');
            localStorage.setItem('site-theme', 'amega');
        } else {
            applyTheme(savedTheme);
        }

        // Загружаем громкость
        const savedVolume = localStorage.getItem('site-volume');
        if (savedVolume !== null) {
            volumeSlider.value = savedVolume;
            volumeValue.textContent = `${savedVolume}%`;
            if (themeMusic) {
                themeMusic.volume = savedVolume / 100;
            }
        }
    }

    function unlockSecretTheme(themeName) {
        // Находим кнопку темы
        const themeButton = document.querySelector(`.theme-option[data-theme="${themeName}"]`);
        if (themeButton) {
            // Показываем кнопку
            themeButton.style.display = 'block';

            // Сохраняем в localStorage, что тема разблокирована
            const unlockedThemes = JSON.parse(localStorage.getItem('unlocked-themes') || '[]');
            if (!unlockedThemes.includes(themeName)) {
                unlockedThemes.push(themeName);
                localStorage.setItem('unlocked-themes', JSON.stringify(unlockedThemes));
            }

            // Показываем сообщение
            showSecretMessage(`Секретная тема "${themeNames[themeName]}" разблокирована!`);

            // Автоматически применяем разблокированную тему
            applyTheme(themeName);
        }
    }

    function loadUnlockedThemes() {
        const unlockedThemes = JSON.parse(localStorage.getItem('unlocked-themes') || '[]');

        // Скрываем все секретные темы по умолчанию
        if (nullSpaceThemeBtn) nullSpaceThemeBtn.style.display = 'none';
        if (secretThemeBtn) secretThemeBtn.style.display = 'none';

        // Показываем только разблокированные
        unlockedThemes.forEach(themeName => {
            const themeButton = document.querySelector(`.theme-option[data-theme="${themeName}"]`);
            if (themeButton) {
                themeButton.style.display = 'block';
            }
        });
    }

    function showSecretMessage(message) {
        // Создаем временное сообщение
        const messageDiv = document.createElement('div');
        messageDiv.textContent = message;
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--color-primary);
            color: var(--color-secondary);
            padding: 15px 20px;
            border-radius: 10px;
            z-index: 10000;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            animation: fadeInOut 3s ease-in-out;
        `;

        // Добавляем стили для анимации
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeInOut {
                0% { opacity: 0; transform: translateY(-20px); }
                10% { opacity: 1; transform: translateY(0); }
                90% { opacity: 1; transform: translateY(0); }
                100% { opacity: 0; transform: translateY(-20px); }
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(messageDiv);

        // Удаляем через 3 секунды
        setTimeout(() => {
            document.body.removeChild(messageDiv);
            document.head.removeChild(style);
        }, 3000);
    }

    function initThemeSystem() {
        // Открытие/закрытие панели
        themeToggleBtn.addEventListener('click', openThemePanel);
        closePanelBtn.addEventListener('click', closeThemePanel);
        panelOverlay.addEventListener('click', closeThemePanel);

        // Выбор темы (только для видимых тем)
        themeOptions.forEach(option => {
            option.addEventListener('click', function () {
                // Проверяем, видна ли кнопка темы
                if (this.style.display !== 'none') {
                    const themeName = this.dataset.theme;
                    applyTheme(themeName);
                }
            });
        });

        // Управление громкостью
        volumeSlider.addEventListener('input', function () {
            const volume = this.value;
            volumeValue.textContent = `${volume}%`;

            if (themeMusic) {
                themeMusic.volume = volume / 100;
            }

            localStorage.setItem('site-volume', volume);
        });

        // Сброс темы
        resetThemeBtn.addEventListener('click', function () {
            applyTheme('amega');
        });

        // Загрузка настроек
        loadSavedSettings();
        loadUnlockedThemes();

        // Запускаем музыку при первом взаимодействии
        document.addEventListener('click', function initMusic() {
            if (themeMusic && themeMusic.paused) {
                themeMusic.play().catch(e => console.log("Не удалось запустить музыку"));
            }
            document.removeEventListener('click', initMusic);
        });
    }

    // === ФУНКЦИИ СЕКРЕТНОЙ ИНФОРМАЦИИ (ОБНОВЛЕННЫЕ) ===

    function openSecretModal() {
        secretModal.style.display = 'block';
        secretCodeInput.focus();
    }

    function closeSecretModal() {
        secretModal.style.display = 'none';
        resetSecretModal();
    }

    function resetSecretModal() {
        secretCodeInput.value = '';
        secretErrorMessage.style.display = 'none';
        secretCodeInput.classList.remove('shake');
    }

    function checkSecretCode() {
        const enteredCode = secretCodeInput.value.trim().toUpperCase();

        // === СЕКРЕТНЫЕ ЗАПИСКИ ===
        if (secretNotes[enteredCode]) {
            const note = secretNotes[enteredCode];
            showSecretNote(note.title, note.text);

            setTimeout(() => {
                closeSecretModal();
            }, 500);

            return;
        }

        // Сбрасываем сообщение об ошибке
        secretErrorMessage.style.display = 'none';

        // Проверяем, введен ли код
        if (!enteredCode) {
            showSecretError("Введите кодовую фразу для доступа");
            return;
        }

        // Проверяем на секретные темы
        if (secretThemes[enteredCode]) {
            const themeName = secretThemes[enteredCode];

            // Разблокируем и применяем тему
            unlockSecretTheme(themeName);
            applyTheme(themeName);

            // Закрываем модальное окно
            setTimeout(() => {
                closeSecretModal();
                // Открываем панель тем, чтобы пользователь увидел новую тему
                openThemePanel();
            }, 1000);
        }
        // Проверяем старые коды для редиректов
        else if (secretCodes[enteredCode]) {
            const target = secretCodes[enteredCode];

            // Если это название темы, разблокируем её
            if (target === 'null-space' || target === 'secret') {
                unlockSecretTheme(target);
                applyTheme(target);

                setTimeout(() => {
                    closeSecretModal();
                    openThemePanel();
                }, 1000);
            }
            // Иначе редирект на страницу
            else {
                window.location.href = target;
            }
        }
        else {
            showSecretError("Неверная кодовая фраза! Доступ запрещен.");
            secretCodeInput.classList.add('shake');
            setTimeout(() => {
                secretCodeInput.classList.remove('shake');
            }, 500);
            secretCodeInput.value = '';
            secretCodeInput.focus();
        }
    }

    function showSecretError(message) {
        secretErrorMessage.textContent = message;
        secretErrorMessage.style.display = 'block';
    }

    function initSecretFunctions() {
        secretInfoBtn.addEventListener('click', openSecretModal);
        secretCloseBtn.addEventListener('click', closeSecretModal);

        window.addEventListener('click', function (event) {
            if (event.target === secretModal) {
                closeSecretModal();
            }
        });

        secretCodeInput.addEventListener('keypress', function (event) {
            if (event.key === 'Enter') {
                checkSecretCode();
            }
        });

        submitSecretCodeBtn.addEventListener('click', checkSecretCode);
    }


    // === ФУНКЦИИ ДЛЯ "О НАС" ===

    // Открытие модального окна "О нас"
    function openAboutModal() {
        aboutModal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Блокируем прокрутку фона
    }

    // Закрытие модального окна "О нас"
    function closeAboutModal() {
        aboutModal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Восстанавливаем прокрутку
    }

    // Инициализация функций "О нас"
    function initAboutFunctions() {
        // Закрытие модального окна
        aboutCloseBtn.addEventListener('click', closeAboutModal);

        // Закрытие модального окна при клике вне его
        window.addEventListener('click', function (event) {
            if (event.target === aboutModal) {
                closeAboutModal();
            }
        });

        // Закрытие по Escape
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && aboutModal.style.display === 'block') {
                closeAboutModal();
            }
        });
    }

    // По умолчанию показываем планеты (активная кнопка)
    planetsContent.classList.add('active-content');

    // Функция для скрытия всего контента
    function hideAllContent() {
        creaturesContent.classList.remove('active-content');
        planetsContent.classList.remove('active-content');
        faunaContent.classList.remove('active-content');
        resourcesContent.classList.remove('active-content');
        storyContent.classList.remove('active-content');
    }

    // Функция для сброса активного состояния всех кнопок
    function resetActiveButtons() {
        allButtons.forEach(btn => {
            btn.classList.remove('active');
        });
    }

    // Обработчик клика для кнопки "О нас"
    document.getElementById('about-btn').addEventListener('click', function () {
        console.log('Кликнули на "О нас"');
        resetActiveButtons();
        this.classList.add('active');
        hideAllContent();
        openAboutModal();
    });

    // Обработчик клика для кнопки "Существа"
    document.getElementById('creatures-btn').addEventListener('click', function () {
        resetActiveButtons();
        this.classList.add('active');
        hideAllContent();
        creaturesContent.classList.add('active-content');
    });

    // Обработчик клика для кнопки "Планеты"
    document.getElementById('planets-btn').addEventListener('click', function () {
        resetActiveButtons();
        this.classList.add('active');
        hideAllContent();
        planetsContent.classList.add('active-content');
    });

    // Обработчик клика для кнопки "Фауна"
    document.getElementById('fauna-btn').addEventListener('click', function () {
        resetActiveButtons();
        this.classList.add('active');
        hideAllContent();
        faunaContent.classList.add('active-content');
    });

    // Обработчик клика для кнопки "Ресурсы"
    document.getElementById('resources-btn').addEventListener('click', function () {
        resetActiveButtons();
        this.classList.add('active');
        hideAllContent();
        resourcesContent.classList.add('active-content');
    });

    // Обработчик клика для кнопки "Секретная информация"
    secretInfoBtn.addEventListener('click', function () {
        resetActiveButtons();
        this.classList.add('active');
        hideAllContent();
        // Фон показывается автоматически когда скрыт весь контент
    });

    // Обработчик клика для кнопки "Понятия"
    document.getElementById('concepts-btn').addEventListener('click', function () {
        console.log('Кликнули на "Понятия"');
        resetActiveButtons();
        this.classList.add('active');
        hideAllContent();
        openConceptsModal();
    });

    // Добавь обработчик для кнопки "Сюжет":
    storyBtn.addEventListener('click', function () {
        resetActiveButtons();
        this.classList.add('active');
        hideAllContent();
        storyContent.classList.add('active-content');
    });

    // Обработчики для остальных кнопок (возвращают фон)
    allButtons.forEach(btn => {
        if (btn.id !== 'creatures-btn' &&
            btn.id !== 'planets-btn' &&
            btn.id !== 'fauna-btn' &&
            btn.id !== 'resources-btn' &&
            btn.id !== 'about-btn' &&
            btn.id !== 'concepts-btn' &&
            btn.id !== 'story-btn' &&
            btn.id !== 'secret-info-btn') {
            btn.addEventListener('click', function () {
                resetActiveButtons();
                this.classList.add('active');
                hideAllContent();
                // Фон показывается автоматически когда скрыт весь контент
            });
        }
    });

    // === ФУНКЦИИ ПАГИНАЦИИ СУЩЕСТВ ===

    // Инициализация пагинации существ
    function initPagination() {
        allCreatures = Array.from(document.querySelectorAll('.creature-card'));
        filteredCreatures = [...allCreatures];

        totalCreatures.textContent = allCreatures.length;
        showPage(1);
    }

    // Показать конкретную страницу существ
    function showPage(page) {
        currentPage = page;

        // Скрываем все карточки
        allCreatures.forEach(card => {
            card.style.display = 'none';
        });

        // Рассчитываем диапазон для текущей страницы
        const startIndex = (page - 1) * CREATURES_PER_PAGE;
        const endIndex = startIndex + CREATURES_PER_PAGE;

        // Показываем карточки для текущей страницы
        const pageCreatures = filteredCreatures.slice(startIndex, endIndex);
        pageCreatures.forEach(card => {
            card.style.display = 'block';
        });

        // Обновляем информацию о странице
        updatePageInfo();

        // Обновляем состояние кнопок
        updatePaginationButtons();
    }

    // Обновить информацию о текущей странице существ
    function updatePageInfo() {
        const start = ((currentPage - 1) * CREATURES_PER_PAGE) + 1;
        const end = Math.min(currentPage * CREATURES_PER_PAGE, filteredCreatures.length);
        currentRange.textContent = `${start}-${end}`;
    }

    // Обновить состояние кнопок пагинации существ
    function updatePaginationButtons() {
        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = currentPage >= Math.ceil(filteredCreatures.length / CREATURES_PER_PAGE);
    }

    // Следующая страница существ
    function nextPage() {
        if (currentPage < Math.ceil(filteredCreatures.length / CREATURES_PER_PAGE)) {
            showPage(currentPage + 1);
        }
    }

    // Предыдущая страница существ
    function prevPage() {
        if (currentPage > 1) {
            showPage(currentPage - 1);
        }
    }

    // === ФУНКЦИИ ФИЛЬТРАЦИИ И ПОИСКА СУЩЕСТВ ===

    // Обновить фильтрованные существа
    function updateFilteredCreatures() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const selectedPlanet = planetFilter.value;

        filteredCreatures = allCreatures.filter(card => {
            const creatureName = card.querySelector('.creature-name').textContent.toLowerCase();
            const creatureNumber = card.querySelector('.creature-number').textContent.toLowerCase();
            const cardPlanet = card.getAttribute('data-planet');

            // Проверка поиска
            const searchMatch = searchTerm === '' ||
                creatureName.includes(searchTerm) ||
                creatureNumber.includes(searchTerm);

            // Проверка планеты
            const planetMatch = selectedPlanet === 'all' || cardPlanet === selectedPlanet;

            return searchMatch && planetMatch;
        });

        // Возвращаемся на первую страницу после фильтрации
        showPage(1);
    }

    // Функция сортировки существ по планете
    function sortByPlanet() {
        const planetOrder = ['Окрома', 'Плауэро', 'Таранте', 'Шань-Лу', 'Акрара', 'Хаяси', 'Шутьям', 'Темень', 'Изгойка', 'Нет планеты'];

        allCreatures.sort((a, b) => {
            const planetA = a.getAttribute('data-planet');
            const planetB = b.getAttribute('data-planet');
            return planetOrder.indexOf(planetA) - planetOrder.indexOf(planetB);
        });

        // Обновляем порядок в DOM
        creaturesGrid.innerHTML = '';
        allCreatures.forEach(card => {
            creaturesGrid.appendChild(card);
        });
    }

    // Функция сброса фильтров существ
    function resetFilters() {
        searchInput.value = '';
        planetFilter.value = 'all';

        // Восстанавливаем исходный порядок
        allCreatures.sort((a, b) => {
            const idA = parseInt(a.getAttribute('data-creature-id'));
            const idB = parseInt(b.getAttribute('data-creature-id'));
            return idA - idB;
        });

        creaturesGrid.innerHTML = '';
        allCreatures.forEach(card => {
            creaturesGrid.appendChild(card);
        });
    }

    // === ФУНКЦИИ ДЛЯ ФАУНЫ ===

    // Инициализация пагинации фауны
    function initFaunaPagination() {
        allFauna = Array.from(faunaCards);
        filteredFauna = [...allFauna];

        faunaTotalCount.textContent = allFauna.length;
        showFaunaPage(1);
    }

    // Показать страницу фауны
    function showFaunaPage(page) {
        currentFaunaPage = page;

        // Скрываем все карточки фауны
        allFauna.forEach(card => {
            card.style.display = 'none';
        });

        // Рассчитываем диапазон для текущей страницы
        const startIndex = (page - 1) * FAUNA_PER_PAGE;
        const endIndex = startIndex + FAUNA_PER_PAGE;

        // Показываем карточки для текущей страницы
        const pageFauna = filteredFauna.slice(startIndex, endIndex);
        pageFauna.forEach(card => {
            card.style.display = 'block';
        });

        // Обновляем информацию о странице
        updateFaunaPageInfo();

        // Обновляем состояние кнопок
        updateFaunaPaginationButtons();
    }

    // Обновить информацию о текущей странице фауны
    function updateFaunaPageInfo() {
        const start = ((currentFaunaPage - 1) * FAUNA_PER_PAGE) + 1;
        const end = Math.min(currentFaunaPage * FAUNA_PER_PAGE, filteredFauna.length);
        faunaCurrentRange.textContent = `${start}-${end}`;
    }

    // Обновить состояние кнопок пагинации фауны
    function updateFaunaPaginationButtons() {
        faunaPrevBtn.disabled = currentFaunaPage === 1;
        faunaNextBtn.disabled = currentFaunaPage >= Math.ceil(filteredFauna.length / FAUNA_PER_PAGE);
    }

    // Следующая страница фауны
    function nextFaunaPage() {
        if (currentFaunaPage < Math.ceil(filteredFauna.length / FAUNA_PER_PAGE)) {
            showFaunaPage(currentFaunaPage + 1);
        }
    }

    // Предыдущая страница фауны
    function prevFaunaPage() {
        if (currentFaunaPage > 1) {
            showFaunaPage(currentFaunaPage - 1);
        }
    }

    // Обновить фильтрованную фауну
    function updateFilteredFauna() {
        const searchTerm = faunaSearchInput.value.toLowerCase().trim();
        const selectedType = faunaTypeFilter.value;
        const selectedPlanet = faunaPlanetFilter.value;

        filteredFauna = allFauna.filter(card => {
            const faunaName = card.querySelector('.fauna-name').textContent.toLowerCase();
            const faunaNumber = card.querySelector('.fauna-number').textContent.toLowerCase();
            const cardType = card.getAttribute('data-fauna-type');
            const cardPlanet = card.getAttribute('data-planet');

            // Проверка поиска
            const searchMatch = searchTerm === '' ||
                faunaName.includes(searchTerm) ||
                faunaNumber.includes(searchTerm);

            // Проверка типа
            const typeMatch = selectedType === 'all' || cardType === selectedType;

            // Проверка планеты
            const planetMatch = selectedPlanet === 'all' || cardPlanet === selectedPlanet;

            return searchMatch && typeMatch && planetMatch;
        });

        // Возвращаемся на первую страницу после фильтрации
        showFaunaPage(1);
    }

    // Функция сортировки фауны
    function sortFauna() {
        const typeOrder = ['растение', 'гриб', 'водоросль', 'лиана', 'дерево', 'кустарник', 'трава', 'мох', 'папоротник', 'суккулент', 'выращенный', 'хищный'];
        const planetOrder = ['Окрома', 'Плауэро', 'Таранте', 'Шань-Лу', 'Акрара', 'Хаяси', 'Шутьям', 'Темень', 'Изгойка', 'Нет планеты'];

        allFauna.sort((a, b) => {
            const typeA = a.getAttribute('data-fauna-type');
            const typeB = b.getAttribute('data-fauna-type');
            const planetA = a.getAttribute('data-planet');
            const planetB = b.getAttribute('data-planet');

            // Сначала сортируем по типу, затем по планете
            const typeComparison = typeOrder.indexOf(typeA) - typeOrder.indexOf(typeB);
            if (typeComparison !== 0) return typeComparison;

            return planetOrder.indexOf(planetA) - planetOrder.indexOf(planetB);
        });

        // Обновляем порядок в DOM
        faunaGrid.innerHTML = '';
        allFauna.forEach(card => {
            faunaGrid.appendChild(card);
        });
    }

    // Функция сброса фильтров фауны
    function resetFaunaFilters() {
        faunaSearchInput.value = '';
        faunaTypeFilter.value = 'all';
        faunaPlanetFilter.value = 'all';

        // Восстанавливаем исходный порядок
        allFauna.sort((a, b) => {
            const idA = parseInt(a.getAttribute('data-fauna-id'));
            const idB = parseInt(b.getAttribute('data-fauna-id'));
            return idA - idB;
        });

        faunaGrid.innerHTML = '';
        allFauna.forEach(card => {
            faunaGrid.appendChild(card);
        });
    }

    // === ФУНКЦИИ ДЛЯ РЕСУРСОВ ===

    // Инициализация пагинации ресурсов
    function initResourcePagination() {
        allResources = Array.from(resourceCards);
        filteredResources = [...allResources];

        resourceTotalCount.textContent = allResources.length;
        showResourcePage(1);
    }

    // Показать страницу ресурсов
    function showResourcePage(page) {
        currentResourcePage = page;

        // Скрываем все карточки ресурсов
        allResources.forEach(card => {
            card.style.display = 'none';
        });

        // Рассчитываем диапазон для текущей страницы
        const startIndex = (page - 1) * RESOURCES_PER_PAGE;
        const endIndex = startIndex + RESOURCES_PER_PAGE;

        // Показываем карточки для текущей страницы
        const pageResources = filteredResources.slice(startIndex, endIndex);
        pageResources.forEach(card => {
            card.style.display = 'block';
        });

        // Обновляем информацию о странице
        updateResourcePageInfo();

        // Обновляем состояние кнопок
        updateResourcePaginationButtons();
    }

    // Обновить информацию о текущей странице ресурсов
    function updateResourcePageInfo() {
        const start = ((currentResourcePage - 1) * RESOURCES_PER_PAGE) + 1;
        const end = Math.min(currentResourcePage * RESOURCES_PER_PAGE, filteredResources.length);
        resourceCurrentRange.textContent = `${start}-${end}`;
    }

    // Обновить состояние кнопок пагинации ресурсов
    function updateResourcePaginationButtons() {
        resourcePrevBtn.disabled = currentResourcePage === 1;
        resourceNextBtn.disabled = currentResourcePage >= Math.ceil(filteredResources.length / RESOURCES_PER_PAGE);
    }

    // Следующая страница ресурсов
    function nextResourcePage() {
        if (currentResourcePage < Math.ceil(filteredResources.length / RESOURCES_PER_PAGE)) {
            showResourcePage(currentResourcePage + 1);
        }
    }

    // Предыдущая страница ресурсов
    function prevResourcePage() {
        if (currentResourcePage > 1) {
            showResourcePage(currentResourcePage - 1);
        }
    }

    // Обновить фильтрованные ресурсы
    function updateFilteredResources() {
        const searchTerm = resourceSearchInput.value.toLowerCase().trim();
        const selectedType = resourceTypeFilter.value;
        const selectedPlanet = resourcePlanetFilter.value;

        filteredResources = allResources.filter(card => {
            const resourceName = card.querySelector('.resource-name').textContent.toLowerCase();
            const resourceNumber = card.querySelector('.resource-number').textContent.toLowerCase();
            const cardType = card.getAttribute('data-resource-type');
            const cardPlanet = card.getAttribute('data-planet');

            // Проверка поиска
            const searchMatch = searchTerm === '' ||
                resourceName.includes(searchTerm) ||
                resourceNumber.includes(searchTerm);

            // Проверка типа
            const typeMatch = selectedType === 'all' || cardType === selectedType;

            // Проверка планеты
            const planetMatch = selectedPlanet === 'all' || cardPlanet === selectedPlanet;

            return searchMatch && typeMatch && planetMatch;
        });

        // Возвращаемся на первую страницу после фильтрации
        showResourcePage(1);
    }

    // Функция сортировки ресурсов
    function sortResources() {
        const typeOrder = ['металлы', 'жидкости', 'биологические', 'композитные', 'иные'];
        const planetOrder = ['Окрома', 'Плауэро', 'Таранте', 'Шань-Лу', 'Акрара', 'Хаяси', 'Шутьям', 'Темень', 'Изгойка', 'Нет планеты'];

        allResources.sort((a, b) => {
            const typeA = a.getAttribute('data-resource-type');
            const typeB = b.getAttribute('data-resource-type');
            const planetA = a.getAttribute('data-planet');
            const planetB = b.getAttribute('data-planet');

            // Сначала сортируем по типу, затем по планете
            const typeComparison = typeOrder.indexOf(typeA) - typeOrder.indexOf(typeB);
            if (typeComparison !== 0) return typeComparison;

            return planetOrder.indexOf(planetA) - planetOrder.indexOf(planetB);
        });

        // Обновляем порядок в DOM
        resourceGrid.innerHTML = '';
        allResources.forEach(card => {
            resourceGrid.appendChild(card);
        });
    }

    // Функция сброса фильтров ресурсов
    function resetResourceFilters() {
        resourceSearchInput.value = '';
        resourceTypeFilter.value = 'all';
        resourcePlanetFilter.value = 'all';

        // Восстанавливаем исходный порядок
        allResources.sort((a, b) => {
            const idA = parseInt(a.getAttribute('data-resource-id'));
            const idB = parseInt(b.getAttribute('data-resource-id'));
            return idA - idB;
        });

        resourceGrid.innerHTML = '';
        allResources.forEach(card => {
            resourceGrid.appendChild(card);
        });
    }

    // === ОБРАБОТЧИКИ СОБЫТИЙ ===

    // Пагинация существ
    prevBtn.addEventListener('click', prevPage);
    nextBtn.addEventListener('click', nextPage);

    // Поиск и фильтрация существ
    searchBtn.addEventListener('click', function () {
        updateFilteredCreatures();
    });

    searchInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            updateFilteredCreatures();
        }
    });

    planetFilter.addEventListener('change', function () {
        updateFilteredCreatures();
    });

    sortBtn.addEventListener('click', function () {
        sortByPlanet();
        updateFilteredCreatures();
    });

    resetBtn.addEventListener('click', function () {
        resetFilters();
        setTimeout(() => {
            updateFilteredCreatures();
        }, 100);
    });

    // Пагинация фауны
    faunaPrevBtn.addEventListener('click', prevFaunaPage);
    faunaNextBtn.addEventListener('click', nextFaunaPage);

    // Поиск и фильтрация фауны
    faunaSearchBtn.addEventListener('click', function () {
        updateFilteredFauna();
    });

    faunaSearchInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            updateFilteredFauna();
        }
    });

    faunaTypeFilter.addEventListener('change', function () {
        updateFilteredFauna();
    });

    faunaPlanetFilter.addEventListener('change', function () {
        updateFilteredFauna();
    });

    faunaSortBtn.addEventListener('click', function () {
        sortFauna();
        updateFilteredFauna();
    });

    faunaResetBtn.addEventListener('click', function () {
        resetFaunaFilters();
        setTimeout(() => {
            updateFilteredFauna();
        }, 100);
    });

    // Пагинация ресурсов
    resourcePrevBtn.addEventListener('click', prevResourcePage);
    resourceNextBtn.addEventListener('click', nextResourcePage);

    // Поиск и фильтрация ресурсов
    resourceSearchBtn.addEventListener('click', function () {
        updateFilteredResources();
    });

    resourceSearchInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            updateFilteredResources();
        }
    });

    resourceTypeFilter.addEventListener('change', function () {
        updateFilteredResources();
    });

    resourcePlanetFilter.addEventListener('change', function () {
        updateFilteredResources();
    });

    resourceSortBtn.addEventListener('click', function () {
        sortResources();
        updateFilteredResources();
    });

    resourceResetBtn.addEventListener('click', function () {
        resetResourceFilters();
        setTimeout(() => {
            updateFilteredResources();
        }, 100);
    });

    // Обработчики клика по карточкам
    creatureCards.forEach(card => {
        card.addEventListener('click', function (e) {
            console.log('Переход к существу:', this.getAttribute('data-creature-id'));
        });
    });

    // Обработчики для карточек планет
    const planetCards = document.querySelectorAll('.planet-card');
    planetCards.forEach(card => {
        card.addEventListener('click', function (e) {
            console.log('Переход к планете:', this.getAttribute('data-planet-id'));
        });
    });

    // Обработчики для карточек фауны
    faunaCards.forEach(card => {
        card.addEventListener('click', function (e) {
            console.log('Переход к объекту фауны:', this.getAttribute('data-fauna-id'));
        });
    });

    // Обработчики для карточек ресурсов
    resourceCards.forEach(card => {
        card.addEventListener('click', function (e) {
            console.log('Переход к ресурсу:', this.getAttribute('data-resource-id'));
        });
    });

    // === ФУНКЦИИ ДЛЯ "ПОНЯТИЯ" ===

    // Открытие модального окна "Понятия"
    function openConceptsModal() {
        conceptsModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        conceptSearchInput.value = ''; // Очищаем поиск при открытии
        filterConcepts(''); // Показываем все карточки
    }

    // Закрытие модального окна "Понятия"
    function closeConceptsModal() {
        conceptsModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Функция поиска и фильтрации понятий
    function filterConcepts(searchTerm) {
        const term = searchTerm.toLowerCase().trim();

        conceptCards.forEach(card => {
            const conceptName = card.querySelector('h3').textContent.toLowerCase();
            const conceptType = card.getAttribute('data-concept-type');
            const conceptDescription = card.querySelector('.concept-description p').textContent.toLowerCase();

            if (term === '' ||
                conceptName.includes(term) ||
                conceptType.includes(term) ||
                conceptDescription.includes(term)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Инициализация функций "Понятия"
    function initConceptsFunctions() {
        // Закрытие модального окна
        conceptsCloseBtn.addEventListener('click', closeConceptsModal);

        // Закрытие модального окна при клике вне его
        window.addEventListener('click', function (event) {
            if (event.target === conceptsModal) {
                closeConceptsModal();
            }
        });

        // Закрытие по Escape
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && conceptsModal.style.display === 'block') {
                closeConceptsModal();
            }
        });

        // Поиск по понятиям
        conceptSearchBtn.addEventListener('click', function () {
            filterConcepts(conceptSearchInput.value);
        });

        conceptSearchInput.addEventListener('keypress', function (event) {
            if (event.key === 'Enter') {
                filterConcepts(conceptSearchInput.value);
            }
        });

        // Поиск при изменении текста (опционально)
        conceptSearchInput.addEventListener('input', function () {
            filterConcepts(conceptSearchInput.value);
        });
    }

    // === ЭКСТРЕННЫЙ ФИКС ДЛЯ КНОПКИ "ПОНЯТИЯ" ===
    setTimeout(function () {
        const conceptsBtn = document.getElementById('concepts-btn');
        const aboutBtn = document.getElementById('about-btn');

        console.log('Экстренный фикс: conceptsBtn =', conceptsBtn);
        console.log('Экстренный фикс: aboutBtn =', aboutBtn);

        if (conceptsBtn) {
            conceptsBtn.onclick = function (e) {
                console.log('🚀 ПРЯМОЙ КЛИК ПО "ПОНЯТИЯМ"');
                e.stopImmediatePropagation();

                // Сбрасываем все активные кнопки
                document.querySelectorAll('.sidebar-btn.active').forEach(btn => {
                    btn.classList.remove('active');
                });

                // Активируем текущую кнопку
                this.classList.add('active');

                // Скрываем весь контент
                document.querySelectorAll('.content-area > *').forEach(content => {
                    if (content.id !== 'resources-content') {
                        content.classList.remove('active-content');
                    }
                });

                // Открываем окно понятий
                if (conceptsModal) {
                    conceptsModal.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                }

                return false;
            };
        }

        if (aboutBtn) {
            aboutBtn.onclick = function (e) {
                console.log(' ПРЯМОЙ КЛИК ПО "О НАС"');
                e.stopImmediatePropagation();

                // Сбрасываем все активные кнопки
                document.querySelectorAll('.sidebar-btn.active').forEach(btn => {
                    btn.classList.remove('active');
                });

                // Активируем текущую кнопку
                this.classList.add('active');

                // Скрываем весь контент
                document.querySelectorAll('.content-area > *').forEach(content => {
                    if (content.id !== 'resources-content') {
                        content.classList.remove('active-content');
                    }
                });

                // Открываем окно "О нас"
                if (aboutModal) {
                    aboutModal.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                }

                return false;
            };
        }
    }, 100); // Небольшая задержка, чтобы DOM точно загрузился

    // Обработчики для карточек арок:
    const storyArcCards = document.querySelectorAll('.story-arc-card');
    storyArcCards.forEach(card => {
        card.addEventListener('click', function (e) {
            // Проверяем, не кликнули ли по кнопке внутри карточки
            if (!e.target.classList.contains('arc-link-btn') &&
                !e.target.closest('.arc-link-btn')) {
                const arcId = this.getAttribute('data-arc-id');
                console.log('Переход к арке:', arcId);
                // window.location.href = `arc${arcId}.html`; // Раскомментировать когда будут страницы
            }
        });
    });

    galleryBtn.addEventListener('click', function () {
        // Просто переходим на страницу галереи
        window.location.href = 'gallery.html';
    });


    // ===== ИСТОРИЯ САЙТА =====

    // Элементы модального окна истории
    const historyBtn = document.getElementById('history-btn');
    const historyModal = document.getElementById('historyModal');
    const historyClose = document.querySelector('.history-close');

    // Функция открытия модального окна истории
    function openHistoryModal() {
        historyModal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Блокируем скролл фона
    }

    // Функция закрытия модального окна истории
    function closeHistoryModal() {
        historyModal.style.display = 'none';
        document.body.style.overflow = ''; // Восстанавливаем скролл
    }

    // Обработчики событий для истории
    if (historyBtn && historyModal && historyClose) {
        // Открытие при клике на кнопку "История сайта"
        historyBtn.addEventListener('click', openHistoryModal);

        // Закрытие при клике на крестик
        historyClose.addEventListener('click', closeHistoryModal);

        // Закрытие при клике вне окна
        historyModal.addEventListener('click', function (event) {
            if (event.target === historyModal) {
                closeHistoryModal();
            }
        });

        // Закрытие при нажатии Escape
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && historyModal.style.display === 'block') {
                closeHistoryModal();
            }
        });
    }

    // Функция для обновления даты выпуска
    function updateReleaseDate() {
        const releaseDate = '25.01.2026'; // Установите свою дату релиза
        const dateElements = document.querySelectorAll('.version-date');

        dateElements.forEach(element => {
            if (element.textContent.includes('[Дата вашего первого релиза]')) {
                element.textContent = element.textContent.replace('[Дата вашего первого релиза]', releaseDate);
            }
        });
    }

    // Инициализация при загрузке страницы
    document.addEventListener('DOMContentLoaded', function () {
        updateReleaseDate();

        // Добавляем анимацию появления кнопки истории
        if (historyBtn) {
            setTimeout(() => {
                historyBtn.style.opacity = '0';
                historyBtn.style.transform = 'translateY(10px)';
                historyBtn.style.transition = 'all 0.5s ease';

                setTimeout(() => {
                    historyBtn.style.opacity = '1';
                    historyBtn.style.transform = 'translateY(0)';
                }, 100);
            }, 1000);
        }
    });

    // Инициализируем все функции при загрузке
    initPagination();
    initFaunaPagination();
    initResourcePagination();
    initAboutFunctions();
    initConceptsFunctions();
    initSecretFunctions();
    initThemeSystem();

});

