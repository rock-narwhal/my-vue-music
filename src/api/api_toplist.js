import {get} from './request'
/* 排行榜 */
export const getTopList = ()=> get('/toplist')

/* 新歌速递 */
export const getLatestByType = (type)=> get('/top/song',{type})