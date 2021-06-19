export function dataFormat(date) {
    if (!date) 
        return ''
    // Mon May 03 2021 14:42:11 GMT+0800 (中国标准时间)
    let month = '', year = '', day = ''
    let dateArr = String(date).split(' ')
    if (dateArr[1] === 'May') 
        month = '05';
    else if (dateArr[1] === 'Jun') 
        month = '06';
    else if (dateArr[1] === 'Jul') 
        month = '07';
    else
        month = '08'
    year = dateArr[3];
    day = dateArr[2];
    let res = `${year}-${month}-${day}`
    return res;
}