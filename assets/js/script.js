"use script"

const isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (
            isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.iOS() ||
            isMobile.Opera() ||
            isMobile.Windows());
    }
};


// Меню бурнер
const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.header__menu');
if (iconMenu) {
	iconMenu.addEventListener("click", function (e) {
		document.body.classList.toggle('_lock');
		iconMenu.classList.toggle('_active');
		menuBody.classList.toggle('_active');
	});
}

// -----------------------------------------------------------

 // Функция для прокрутки страницы вверх
//  function scrollToTop() {
//     window.scrollTo({
//         top: 0,
//         behavior: 'smooth'
//     });
// }

// Получаем кнопку для прокрутки вверх
// var scrollToTopBtn = document.getElementById("scrollToTopBtn");

// scrollToTopBtn.addEventListener("click", scrollToTop);

// window.onscroll = function() {
//     if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
//         scrollToTopBtn.style.display = "block";
//     } else {
//         scrollToTopBtn.style.display = "none";
//     }
// };



// -----------------------------------------------------------
// Получаем элемент липкого меню
const stickyMenu = document.getElementById('stickyMenu');

// Получаем позицию меню относительно верхней границы страницы
const stickyMenuOffset = stickyMenu.offsetTop;

// Функция для добавления класса при прокрутке
function handleScroll() {
    if (window.pageYOffset >= stickyMenuOffset) {
        stickyMenu.classList.add('sticky');
    } else {
        stickyMenu.classList.remove('sticky');
    }
}
// Слушаем событие прокрутки и вызываем функцию handleScroll
window.addEventListener('scroll', handleScroll);


// Прокрутка при клике
const menuLinks = document.querySelectorAll('.link__scroll[data-goto]');
if(menuLinks.length > 0) {
	menuLinks.forEach(menuLink => {
		menuLink.addEventListener("click", onMenuLinkClick);
	});

	function onMenuLinkClick(e) {
		const menuLink = e.target;
		if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
			const gotoBlock = document.querySelector(menuLink.dataset.goto);
			const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;
		
			if (iconMenu.classList.contains('_active')) {
				document.body.classList.remove('_lock');
				iconMenu.classList.remove('_active');
				menuBody.classList.remove('_active');
			}

			window.scrollTo({
				top: gotoBlockValue,
				behavior: "smooth"
			});
			e.preventDefault();
		}
	}
}


// Валидация ввода телефона
document.querySelectorAll('input[type="tel"]').forEach(input => {
    input.addEventListener('input', (event) => {
        // Удаляем все символы, кроме цифр
        let value = event.target.value.replace(/\D/g, '');

        // Проверяем, начинается ли номер с +380 и содержит ли 12 цифр
        if (!value.startsWith("380")) {
            value = "380" + value.slice(3);  // Принудительно добавляем "380" впереди, если его нет
        }
        
        // Ограничиваем количество цифр после +380 до 9
        if (value.length > 12) {
            value = value.slice(0, 12);
        }

        // Обновляем значение инпута
        event.target.value = "+" + value;
    });

    input.addEventListener('blur', (event) => {
        const value = event.target.value;
        
        // Проверка на соответствие полному формату +380 и 9 цифр после него
        const ukrainePhonePattern = /^\+380\d{9}$/;
        
        if (!ukrainePhonePattern.test(value)) {
            alert("Пожалуйста, введите корректный номер телефона в формате +380XXXXXXXXX");
            event.target.value = ''; // Очищаем значение, если оно не соответствует формату
        }
    });
});


// Отправка формы
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent default form submission
    
    const form = e.target;
    const formData = new FormData(form);

    // Convert formData to JSON format
    const formJson = {};
    formData.forEach((value, key) => {
        formJson[key] = value;
    });

    // Sending the data
    fetch('submit_form.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formJson),
    })
    .then(response => response.json())
    .then(data => {
        // Success message
        document.getElementById('formResponse').innerHTML = `<p>Форма успішно надіслана!</p>`;
        form.reset(); // Reset the form after submission
    })
    .catch(error => {
        // Error message
        document.getElementById('formResponse').innerHTML = `<p>Виникла помилка. Спробуйте ще раз.</p>`;
        console.error('Error:', error);
    });
});


//прикрепление файла в форме

// const formImage = document.getElementById('formImage');
// const formPreview = document.getElementById('formPreview');

// formImage.addEventListener('change', () => {
// 	uploadFile(formImage.files[0]);
// });

// function uploadFile(file) {
// 	if (!['image/jpeg', 'image/png', 'image/gif', 'image/pdf'].includes(file.type)) {
// 		alert('Разрешены только изображения!');
// 		formImage.value ='';
// 		return;
// 	}
// 	if (file.size > 2 * 1024 * 1024) {
// 		alert('Файл должен быть менее 2 МБ.');
// 		return;
// 	}
// 	var reader = new FileReader();
// 	reader.onload = function (e) {
// 		formPreview.innerHTML = `<img src="${e.target.result}" alt="Фото">`;
// 	};
// 	reader.onerror = function (e) {
// 		alert('Ошибка');
// 	};
// 	reader.readAsDataURL(file);
// }


//style main-bg
// function ibg(){
// 	$.each($('.ibg'), function(index, val) {
// 		if($(this).find('img').length>0){
// 			$(this).css('background-image','url("'+$(this).find('img').attr('src')+'")');
// 		}
// 	});
// };
// ibg();



