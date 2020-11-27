# stream-console.js

## Install

  ```npm
  npm install --save stream-console
  ```

#### Usage

### In Browser
Locally…

```html
<script src="stream-console.js"></script>
```
… or Directly from CDN. In which case you don't even need to install.

```html
<script src="https://cdn.jsdelivr.net/npm/stream-console"></script>
```

#### Setting up
```js
const options = {
    time: 60000, // Specify time in milliseconds 1000 = 1 second. The default is 30 seconds (30000);
    status: true, // Return logs in time seconds. By default, false;
    console: true, // Print all logs to the console. By default, false;
};

const recording = jslogger();
//or
const recording = jslogger(options);
```

#### Methods

* activate() - Called to enable sending logs.
```js
recording.activate();
```

* setInfo(key, value) - Writes the key and value to the first json level. For example: setInfo ("package", "com.app.test");
```js
const obj = {
    id: 1234,
    name: 'Android'
};
recording.setInfo('id', 1234);
// or
recording.setInfo(obj); //you can pass multiple keys for writing
```

* log(arguments) - Writes the text of the log to json in the second level with reference to time.
```js
const data = {
    one: '1',
    two: '2',
};
recording.log('start'); //16.10.2020 14:22:33:429:'start'
recording.log('info', data); //16.10.2020 14:22:33:558:'info { one: '1', two: '2' }'
recording.log('a', 'r', 'g', 'u', 'm', 'e', 'n', 't', 's'); //16.10.2020 14:22:35:004:'a r g u m e n t s'
```

* end() - Causes sending logs without waiting for time.
```js
    recording.end();
```

* emit - Raises an event.
```js
recording.emit('test', {name: 'logger'});
```

* on - Listens to an event.
```js
recording.on('test', (data) => console.log(data));
```


#### Getting logs

* The 'logs' event of the on handler to get the logs (if the activate method is not called, the event will not happen).
```js
recording.on('logs', (data) => {
    console.log(data);
});
```

##### Attention! For the logs to be sent, you need to call the activate () method or send it in the status: true option.

### Author:
* Kirill Samylin