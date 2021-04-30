const sliders = (slides, dir, prev, next) => {
    let slideIndex = 1,
        paused;

    const items = document.querySelectorAll(slides);

    function showSlides(n) {
        if (n > items.length) {
            slideIndex = 1;
        }

        if (n < 1) {
            slideIndex = items.length;
        }

        items.forEach(item => {
            item.classList.add('animated');
            item.style.display = "none";
            // item.parentNode.style.height = 'auto';
        })

        items[slideIndex - 1].style.display = 'block';
    }

    showSlides(slideIndex);

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    try {
        const prevBtn = document.querySelector(prev),
              nextBtn = document.querySelector(next);
        prevBtn.addEventListener('click', () => {
            plusSlides(-1);
            items[slideIndex - 1].classList.remove('bounceInLeft');
            items[slideIndex - 1].classList.add('bounceInRight');
        });
        nextBtn.addEventListener('click', () => {
            plusSlides(1);
            items[slideIndex - 1].classList.remove('bounceInRight');
            items[slideIndex - 1].classList.add('bounceInLeft');

        });


        } catch(e){}


        function activateAnimation() {
            if(dir ==='vertical') {
                paused = setInterval(function() {
                    plusSlides(1);
                    items[slideIndex - 1].classList.add('bounceInDown');
                }, 3000)
            } else {
                paused = setInterval(function() {
                    plusSlides(1);
                    items[slideIndex - 1].classList.remove('bounceInRight');
                    items[slideIndex - 1].classList.add('bounceInLeft');  

                }, 3000)
            }
        }
        activateAnimation();

        items[0].parentNode.addEventListener('mouseenter', () => {
            clearInterval(paused);
        })
        items[0].parentNode.addEventListener('mouseleave', () => {
            activateAnimation();
        })
}


export default sliders;