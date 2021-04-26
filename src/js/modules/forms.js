import {postData} from '../services/requests'

const forms = () => {
    const form = document.querySelectorAll('form'); // получаем формы, инпуты и инпуты для ввода телефонов
    const inputs = document.querySelectorAll('input');
    const upload = document.querySelectorAll('[name="upload"]');

    // checkNumInputs('input[name="user_phone"]'); // ввод цифр в поле ввода для телефона

    const message = { // сообщения для вывода результата запроса
        loading: 'Загрузка',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так',
        spinner: 'assets/img/spinner.gif',
        ok: 'assets/img/ok.png',
        fail: 'assets/img/fail.png'
    };

    const path = {
        designer: 'assets/server.php',
        question: 'assets/question.php'
    }


    const clearInputs = () => { // функция для очистки инпутов
        inputs.forEach(input => {
            input.value = '';
        });
        upload.forEach(item => {
            item.previousElementSibling.textContent = 'Файл не выбран';
        })
    };

    upload.forEach(item => {
        item.addEventListener('input', () => {
            console.log(item.files[0]);
            let dots;
            const arr = item.files[0].name.split('.');
            arr[0].length > 6 ? dots = '...' : dots = '.';
            const name = arr[0].substring(0, 6) + dots + arr[1];
            item.previousElementSibling.textContent = name;
        })
    })
    
    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault(); // отменяем перезагрузку странцы

            let statusMessage = document.createElement('div'); // создаем блок, стилизуем, помещаем в конец
            statusMessage.classList.add('status');
            item.parentNode.appendChild(statusMessage);

            item.classList.add('animated', 'fadeOutUp');
            setTimeout(() => {
                item.style.display = 'none';
            }, 400);

            let statusImg = document.createElement('img');
            statusImg.setAttribute('src', message.spinner);
            statusImg.classList.add('animated', 'fadeInUp');
            statusMessage.appendChild(statusImg);

            let textMessage = document.createElement('div');
            textMessage.textContent = message.loading;
            statusMessage.appendChild(textMessage);

            const formData = new FormData(item); // Собираем наши данные с инпутов. С помощью этого метода формируем их в такую структуру, понятную для сервера. Присваиваем в переменную.
            let api;
            item.closest('.popup-design') || item.classList.contains('calc_form') ? api = path.designer : api = path.question;
            console.log(api);


            postData(api, formData) // наша функция является своего рода промисом, которая может завершиться с разным результатом
                .then(res => {
                    console.log(res);
                    statusImg.setAttribute('src', message.ok);
                    textMessage.textContent = message.success; // если успешно
                })
                .catch(() => {
                    statusImg.setAttribute('src', message.fail);
                    textMessage.textContent = message.failure; // если ошибка
                })
                .finally(() => { // выполняется в любом слкчае
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                        item.style.display = 'block';
                        item.classList.remove('fadeOutUp');
                        item.classList.add('fadeInUp');
                    }, 5000);
                });
        });
    });

};

export default forms; // экспортируем. Затем в main.js импортируем.