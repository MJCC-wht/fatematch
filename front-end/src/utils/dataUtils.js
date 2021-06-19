/*
包含 n 个日期时间处理的工具函数模块
*/
/*格式化日期
*/
export function formateDate(time) {
    if (!time) return ''
        let date = new Date(time)
    let min = '', sec = ''
    if (date.getMinutes() >= 0 && date.getMinutes() < 10) {
        min = '0' + String(date.getMinutes())
    }
    else
        min = String(date.getMinutes())

    if (date.getSeconds() >= 0 && date.getSeconds() < 10) {
        sec = '0' + String(date.getSeconds())
    }
    else
        sec = String(date.getSeconds())
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + min + ':' + sec
}