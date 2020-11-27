class Logger {
    constructor({ time, status, console }) {
        this._time = (typeof time === 'number') ? time : 30000;
        this._status = (status===true) ? status : false;
        this._debugging = (console===true) ? console : false;
        this._recording = true;
        this._data = {};
        this._logs = {};
        this._keyTime =  this._timeLogs.bind(this);
        this._start();
        this.events = {};
    }
    _start() {
        this.log('start app');
        setTimeout(() => this._setLogs(), this._time);
    } 
    _setLogs() {
        this.log('send logs');
        this._data['logs'] = this._logs;
        this._console(this._data);
        if (this._status) {
            this._status = false;
            this.emit('logs', Object.assign({}, this._data));
        }
        this._data = {};
        this._logs = {}; 
    }
    _getHours(time) {
        const hours = time.getHours();
        return (hours<10) ? ('0' + hours) : hours;
    }
    _getMinutes(time) {
        const minute = time.getMinutes();
        return (minute<10) ? ('0' + minute) : minute;
    }
    _getSeconds(time) {
        const seconds = time.getSeconds();
        return (seconds<10) ? ('0' + seconds) : seconds;
    }
    _getMilliseconds(time) {
        const milliseconds = time.getUTCMilliseconds();
        return (milliseconds<10) ? ('00' + milliseconds) : (milliseconds<100) ? ('0' + milliseconds) : milliseconds;
    }
    _getDate(time) {
        const day = time.getDate();
        return (day<10) ? ('0' + day) : day;
    }
    _getMonth(time) {
        const month = time.getMonth() + 1;
        return (month<10) ? ('0' + month) : month;
    }
    _timeLogs() {
        const time = new Date();
        const hours = this._getHours(time);
        const minute = this._getMinutes(time);
        const seconds = this._getSeconds(time);
        const milliseconds = this._getMilliseconds(time);
        const day = this._getDate(time);
        const month = this._getMonth(time);
        const year = time.getFullYear();

        return `${day}.${month}.${year} ${hours}:${minute}:${seconds}:${milliseconds}`;
    }
    activate() {
        this._status = true;
    }
    _console(log) {
        if (this._debugging) console.log(log);
    }
    _wtiteKey(key, value) {
        this._console(`set [${key}] = ${value}`);
        if (value) this._data[key] = value;
    }
    set(name, value) {
        if (typeof name === 'object' && !Array.isArray(name)) {
            for (let key in name) {
                this._wtiteKey(key, name[key]);
            }
        } else {
            this._wtiteKey(name, value);
        }
    }
    log(...msg) {
        const message = msg.reduce((str, item) => str+= (typeof item ==='string') ? item+' ' : JSON.stringify(item)+' ', '').slice(0, -1);
        const key = this._keyTime();
        this._console(`${key}:${message}`);
        if (!this._recording) return;
        if (!this._logs[key]) {
            this._logs[key] = message;
        } else {
            this._logs[key] += ' ' + message;
        }
    }
    end() {
        this._setLogs();
    }
    emit(eventName, data) {
        const event = this.events[eventName];
        if  (event) {
            event.forEach(fn => {
                fn.call(null, data);
            });
        }
    }
      
    on(eventName, fn) {
        if(!this.events[eventName]) {
            this.events[eventName] = [];
        }
        
        this.events[eventName].push(fn);
        return () => {
            this.events[eventName] = this.events[eventName].filter(eventFn => fn !== eventFn);
        }
    }
}

export const jslogger = (obj={}) => {
    const { time=30000, status=false, console=false } = obj;
    return new Logger({ time, status, console });
}