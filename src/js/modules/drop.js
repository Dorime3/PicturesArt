import {postData} from '../services/requests'

const drop = () => {
    //drag *
    //dragend *
    //dragenter - объект над dropArea
    //dragexit *
    //dragleave - объект за пределами dropArea
    //dragover - объект зависает над dropArea
    //dragstart *
    //drop - объект отправлен в dropArea

    const fileInputs = document.querySelectorAll('[name="upload"]');

    ['dragenter', 'dragleave', 'dragover', 'drop'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, preventDefaults, false);
        })
    })

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function highlight(item) {
        item.closest('.file_upload').style.border = "5px solid yellow"
        item.closest('.file_upload').style.backgroundColor = "rgba(0,0,0, .7)"
    }

    function unhighlight(item) {
        item.closest('.file_upload').style.border = "none"
        if (item.closest('.calc_form')) {
            item.closest('.file_upload').style.backgroundColor = "#fff"
        } else if (item.closest('.hidden-xs')) {
            item.closest('.file_upload').style.backgroundColor = "#f7e7e6"
        }
        else {
            item.closest('.file_upload').style.backgroundColor = "#ededed"
        }
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => highlight(input), false);
        });
    });

    ['dragleave', 'drop'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => unhighlight(input), false);
        });
    });

    fileInputs.forEach(input => {
        input.addEventListener('drop', (e) => {
            input.files = e.dataTransfer.files;
            if (input.closest('.hidden-xs')) {
                const formData = new FormData(document.querySelector('.img_upload'));
                postData('assets/server.php', formData)
                .then(res => {
                    console.log(res);
                }).catch(() => {
                    console.error('Ошибка')
                })
            }
            let dots;
            const arr = input.files[0].name.split('.');
            arr[0].length > 6 ? dots = '...' : dots = '.';
            const name = arr[0].substring(0, 6) + dots + arr[1];
            input.previousElementSibling.textContent = name;
            
        })
    })


}

export default drop;