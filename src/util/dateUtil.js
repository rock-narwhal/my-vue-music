export const timeConvert = (second) => {
    let min = Math.floor(second / 60)
    let sec = Math.floor(second % 60)
    if (min < 10) {
        min = String(min).padStart(2, '0')
    }
    if (sec < 10) {
        sec = String(sec).padStart(2, '0')
    }
    return min + ':' + sec
}
/**
 * 时间戳转yyyy-MM-dd
 * @param timestamp 时间戳
 * @returns {string} 格式化字符串
 */
export const format = (timestamp) => {
    const date = new Date(timestamp); // 将时间戳转换为Date对象
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // 月份需要加1，且保证两位数显示
    const day = ("0" + date.getDate()).slice(-2); // 保证日期显示两位数
    return year + '-' + month + '-' + day;
}