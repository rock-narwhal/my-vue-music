import {get} from "@/api/request";
/* 获取音乐url */
export const getMusicUrl = (id) => get('/song/url', { id })