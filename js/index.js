const recording = jslogger();

recording.activate();
recording.set('id', 1);
recording.log('test');
recording.on('logs', (data) => {
    console.log(data);
});