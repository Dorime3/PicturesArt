const accordion = (triggersSelector) => {

    const btns = document.querySelectorAll(triggersSelector);

    btns.forEach(btn => {
        btn.addEventListener('click', function() {
            btns.forEach(btn => {
                btn.classList.remove('active-style')
                btn.nextElementSibling.classList.remove('active-content');
                btn.nextElementSibling.style.maxHeight = '0px';
            })
            this.classList.toggle('active-style');
            this.nextElementSibling.classList.toggle('active-content');

            if (this.classList.contains('active-style')) {
                this.nextElementSibling.style.maxHeight = this.nextElementSibling.scrollHeight + 80 + 'px';  // scrollHeight - дает значение высоты контента.
            } else {
                this.nextElementSibling.style.maxHeight = '0px';
            }
        })
    })


        //   blocks = document.querySelectorAll(itemsSelector);

    // blocks.forEach(block => {
    //     block.classList.add('animated', 'fadeInDown');
    // });

    // btns.forEach(btn => {
    //     btn.addEventListener('click', function() {
    //         if (!this.classList.contains('active')) {
    //             btns.forEach(btn => btn.classList.remove('active', 'active-style'))
    //         }
    //         this.classList.add('active', 'active-style');
    //     })
    // })
}

export default accordion;