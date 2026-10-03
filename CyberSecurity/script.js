// Ждем полной загрузки DOM-дерева перед выполнением скрипта
document.addEventListener('DOMContentLoaded', () => {
    // Находим все секции, у которых явно задан атрибут id
    const sections = document.querySelectorAll('section[id]');
    // Находим все ссылки навигационного меню
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Флаг-предохранитель (дроттлинг) для предотвращения частых вызовов функции при скролле
    let isTicking = false;

    // Основная функция расчета активной секции
    const handleScroll = () => {
        let currentSectionId = '';
        // Текущая позиция скролла + смещение 120px (учитывает высоту шапки)
        const scrollPosition = window.scrollY + 120;

        // Перебираем все секции для определения той, что находится в зоне видимости
        sections.forEach(section => {
            const sectionTop = section.offsetTop; // Расстояние от верха страницы до секции
            const sectionHeight = section.clientHeight; // Высота самой секции

            // Проверяем, попадает ли точка скролла внутрь текущей секции
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.id;
            }
        });

        // Обновляем состояние ссылок в меню
        navLinks.forEach(link => {
            // Сравниваем href ссылки с id текущей активной секции
            const isCurrent = link.getAttribute('href') === `#${currentSectionId}`;
            // Добавляем класс 'active', если ссылка совпала, и удаляем, если нет
            link.classList.toggle('active', isCurrent);
        });

        // Сбрасываем флаг, разрешая следующий вызов анимационного кадра
        isTicking = false;
    };

    // Слушатель события прокрутки страницы
    window.addEventListener('scroll', () => {
        // Если предыдущий кадр еще не выполнился — пропускаем вызов
        if (!isTicking) {
            // Запрашиваем планирование вызова функции перед следующей перерисовкой экрана (обычно 60/120 FPS)
            window.requestAnimationFrame(handleScroll);
            // Блокируем повторные вызовы до завершения кадра
            isTicking = true;
        }
    }, { passive: true }); // passive: true указывает браузеру, что обработчик не отменяет скролл (улучшает плавность)
});