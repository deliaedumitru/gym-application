import React from 'react';
import moment from 'moment';

export function getMonday(d)
{
    d = new Date(d);
    const day = d.getDay(),
        diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    d.setDate(diff);
    const m = moment(d);
    m.set('hour', 0);
    m.set('minute', 0);
    m.set('second', 0);
    m.set('millisecond', 0);
    return m;
}

export function getSunday(d)
{
    d = new Date(d);
    const day = d.getDay(),
        diff = d.getDate() - day + 7; // adjust when day is sunday
    d.setDate(diff);
    const m = moment(d);
    m.set('hour', 23);
    m.set('minute', 59);
    m.set('second', 59);
    m.set('millisecond', 0);
    return m;
}
