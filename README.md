# stream-console

## Версия 2.0

* #### Установка stream-console

  * Скачайте и установите файл [stream-console.js](https://github.com/kirill-samylin/stream-console/blob/master/js/stream-console.js)
  * Или сжатый файл [stream-console.min.js](https://github.com/kirill-samylin/stream-console/blob/master/js/stream-console.min.js)
  * Подключите файл в www/index.html

    ![image](https://i.ibb.co/VYkPLRp/logger.jpg)

* #### Настройка stream-console
    ```js
    // файл index.js
    const options = {
        time: 60000, // Указать время в миллисекундах 1000 = 1 секунда. По умолчанию 30 секунд (30000);
        status: true, // Вернуть логи через time секунд. По умолчанию false;
        console: true, // Выводить все логи в консоль. По умолчанию false;
    };

    const recording = jslogger();
    //или
    const recording = jslogger(options);
    ```
* #### Методы stream-console
    * activate() - Вызывается, чтобы включить отправку логов.
    
        ```js
        // файл index.js
        recording.activate();
        ```

    * setInfo(key, value) - Записывает ключ и значение в первый уровень json. Например: setInfo("package","com.app.test")
    
        ```js
        const obj = {
            id: 1234
        };
        // файл index.js
        recording.setInfo('id', 1234);
        // или
        recording.setInfo(obj); //возможно передать несколько ключей для записи
        ```

    * log(arguments) - Записывает текст лога в json во второй уровень с привязкой ко времени.
    
        ```js
        // файл index.js
        const data = {
            one: '1',
            two: '2',
        };
        recording.log('start'); //16.10.2020 14:22:33:429:'start'
        recording.log('info', data); //16.10.2020 14:22:33:558:'info { one: '1', two: '2' }'
        recording.log('a', 'r', 'g', 'u', 'm', 'e', 'n', 't', 's'); //16.10.2020 14:22:35:004:'a r g u m e n t s'
        ```
    * end() - Вызывает отправку логов не дожидаясь time.
    
        ```js
        // файл index.js
         recording.end();
        ```

    * emit - Вызывает событие.
       ```js
        // файл index.js
        recording.emit('test', {name: 'logger'});
        ```

    * on - Слушает вызванное событие.
       ```js
        // файл index.js
        recording.on('test', (data) => console.log(data));
        ```


* #### Получение логов

    * Событие 'logs' обработчика on для получения логов (если метод activate не вызван, то событие не случится).

    ```js
    recording.on('logs', (data) => {
        console.log(data);
    });
    ```

##### Внимание! Чтобы логи были отправлены нужно вызвать метод activate() или отправить в опции status: true.

### Автор:
* Кирилл Самылин