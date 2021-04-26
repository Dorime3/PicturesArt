const scrolling = (upSelector) => {
    const upElem = document.querySelector(upSelector);
    
    window.addEventListener('scroll', () => {  // говорим появляться нашей фикс-стрелочке при достижении скролла 1600 пх
        if (document.documentElement.scrollTop > 1600) {
            upElem.classList.add('animated', 'fadeIn');
            upElem.classList.remove('fadeOut');
        } else {
            upElem.classList.add('fadeOut');
            upElem.classList.remove('fadeIn');
        }
    })


    //scrolling with requestAnimationFrame

    let links = document.querySelectorAll('[href^="#"]'),  // получаем элементы с атрибутами ашреф "каретка" ))
        speed = 0.15; 
    
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();

                let widthTop = document.documentElement.scrollTop, // значение высоты прокрученной части страницы
                    hash = this.hash, // хэш - получаем из адресной строки
                    toBlock = document.querySelector(hash).getBoundingClientRect().top, // гетбоундингклаэнрект - значение, полученное полсе компиляции кода в клиенте (высота до нашего элемента) от нашего расположения
                    start = null;

                requestAnimationFrame(step); // как сетинтервал примерно
                
                function step(time) { 
                    if (start === null) { // задается отправная точка, сработает тольок в самый первый раз.
                        start = time;
                    }
                    let progress = time - start, 
                        r = (toBlock < 0 ? Math.max(widthTop - progress/speed, widthTop + toBlock) : Math.min(widthTop + progress/speed, widthTop + toBlock)); // дич (ง︡'-'︠)ง
                        document.documentElement.scrollTo(0, r); // перемещаемся по оси Y к нашей технической переменной

                    if (r != widthTop + toBlock) {
                        requestAnimationFrame(step); // функция сама себя будет рекурсивно запускать пока значение r не будет равно прокрученной части страницы + высоты нашего элемента
                    } else {
                        window.location.hash = hash;  // устанавливает конечный хэш
                    }
                }
            })
        })




    // pure js scrolling
    // const element = document.documentElement,
    //       body = document.body;
    // const calcScroll = () => {
    //     upElem.addEventListener('click', function(event) {
    //         let scrollTop = Math.round(body.scrollTop || element.scrollTop);

    //         if(this.hash !== '') {
    //             event.preventDefault();
    //             let hashElement = document.querySelector(this.hash),
    //                 hashElementTop = 0;
    //             while (hashElement.offsetParent) {
    //                 hashElementTop += hashElement.offsetTop; 
    //                 hashElement = hashElement.offsetParent;
    //             }
    //             hashElementTop = Math.round(hashElementTop);
    //             smoothScroll(scrollTop, hashElementTop, this.hash);
    //         }
    //     })
    // };
    
    // const smoothScroll = (from, to, hash) => {
    //     let timeInterval = 1,
    //         prevScrollTop,
    //         speed;
        
    //         if(to > from) {
    //             speed = 30;
    //         } else {
    //             speed = -30;
    //         }

    //         let move = setInterval(function() {
    //             let scrollTop = Math.round(body.scrollTop || element.scrollTop);

    //             if (prevScrollTop === scrollTop || 
    //                 (to > from && scrollTop >= to) ||
    //                 (to < from && scrollTop <= to)) {
    //                     clearInterval(move);
    //                     history.replaceState(history.state, document.title, location.href.replace(/#.*$/g, '') + hash);
    //             } else {
    //                 body.scrollTop += speed;
    //                 element.scrollTop += speed;
    //                 prevScrollTop = scrollTop;
    //             }
    //         }, timeInterval);
    // }
    // calcScroll();
}

export default scrolling;