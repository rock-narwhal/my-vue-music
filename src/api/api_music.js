import {get} from "@/api/request";
/* 获取音乐url */
export const getMusicUrl = (id) => get('/song/url', { id })

/* 搜索 */
export const cloudSearch = ({limit,offset,type,keywords}) => get('/cloudsearch', {limit, offset, type, keywords})

/** 歌曲详情 */
export const songDetail = (id) => get('/song/detail',{id})