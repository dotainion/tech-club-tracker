class DateTime{
    date = null;
    fmt = 'ymd';

    toString(){
        let [month, day, year] = this.date.toLocaleDateString().split('/');
        month = month.length === 1 ? `0${month}` : month;
        day = day.length === 1 ? `0${day}` : day;

        let [hour, minute, seconds] = this.date.toLocaleTimeString().split(':');
        hour = hour.length === 1 ? `0${hour}` : hour;
        minute = minute.length === 1 ? `0${minute}` : minute;
        seconds = seconds.length === 1 ? `0${seconds}` : seconds.substring(0, 2);

        if(this.fmt === 'ymdTh:m:s') return `${year}-${month}-${day} ${hour}:${minute}:${seconds}`;
        if(this.fmt === 'ymd h:m:s') return `${year}-${month}-${day} ${hour}:${minute}:${seconds}`;
        else if(this.fmt === 'h:m:s') return `${hour}:${minute}:${seconds}`;
        else if(this.fmt === 'ymd') return `${year}-${month}-${day}`;
        else if(this.fmt === 'ym') return `${year}-${month}`;
        else if(this.fmt === 'y') return `${year}`;
        else if(this.fmt === 'm') return `${month}`;
        else if(this.fmt === 'd') return `${day}`;
        this.assertFormat(this.fmt);
    }

    now(){
        this.date = new Date();
        return this;
    }

    set(dateInstance){
        if(!(dateInstance instanceof Date)){
            console.error('DateTime set method only allow instance of Date object.');
        }
        this.date = dateInstance;
        return this;
    }

    format(fmt){
        this.assertFormat(fmt);
        this.fmt = fmt;
        return this;
    }

    assertFormat(fmt){
        if(!['ymd', 'ym', 'y', 'm', 'd', 'ymdTh:m:s', 'ymd h:m:s', 'h:m:s'].includes(fmt)){
            console.log(fmt)
            console.error('Invalid DateTime format.');
        }
        return true;
    }
}

export const dateTime = new DateTime();