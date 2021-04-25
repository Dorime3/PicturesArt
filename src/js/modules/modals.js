const modals = () => {
    let btnPressed;

    function bindModal(triggerSelector, modalSelector, closeSelector, destroy = false){
        const triggers = document.querySelectorAll(triggerSelector);
        const modal = document.querySelector(modalSelector);
        const close = document.querySelector(closeSelector);
        const windows = document.querySelectorAll('[data-modal]');
        const scroll = calcScroll();

        triggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault();
                }
                btnPressed = true;
                if (destroy) {
                    e.target.remove();
                }
                windows.forEach(item => {
                    item.style.display = 'none';
                    item.classList.add('animated', 'fadeIn')
                });
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
                document.body.style.marginRight = `${scroll}px`;
            });    
        });
        close.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = '';
            document.body.style.marginRight = `0px`;
            windows.forEach(item => {
                item.style.display = 'none';
            });

        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = ''; 
                document.body.style.marginRight = `0px`;
                windows.forEach(item => {
                    item.style.display = 'none';
                });

            }
        });
    }
    function showModalByTime(selector, time){
        setTimeout(() => {
            let display;

            document.querySelectorAll('[data-modal]').forEach(item => {
                if(getComputedStyle(item).display !== 'none'){
                    display = 'something';
                }
            });

            if (!display) {
                document.querySelector(selector).style.display = 'block';
                document.body.style.overflow = 'hidden';    
            }
        }, time);
    }

    function calcScroll() {
        let div = document.createElement('div');
        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();

        return scrollWidth;
    }

    function openByScroll(selector) {
        window.addEventListener('scroll', () => {
            if (!btnPressed && (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight)) {
                document.querySelector(selector).click();
            }
        })
    }

    // showModalByTime('.popup-consultation', 5000);
    bindModal('.button-design', '.popup-design', '.popup-design .popup-close')
    bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close')
    bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true)
    openByScroll('.fixed-gift')
};



export default modals;

