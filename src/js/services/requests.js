const postData = async (url, data) => { // метод для отправки данных с форм (1арг - адрес, 2арг - данные, кторые мы собрали с помощью метода new FormData)
    let res = await fetch(url, { // отправляем. присваиваем ответ в переменную (!!! await для ассинхронного выполнения кода. Поскольку жс не будет ждать ответа с сервера и следовательно не присовит нашей переменной значение. (будет андефайнд))
        method: "POST", // гет или пост. у нас форма - сл-но пост
        body: data 
    });
    return await res.text(); // преобразовываем в строковое значение
};

const getResourse = async (url) => { // метод для отправки данных с форм (1арг - адрес, 2арг - данные, кторые мы собрали с помощью метода new FormData)
    let res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Couldnot fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
};

export {postData, getResourse}