import {get} from '@/api/request'
/* 获取推荐歌单 */
export const getPersonalized = (limit) => get('/personalized',{limit})

/* login 获取个性推荐歌单 */
export const getRecommend = () => get('/recommend/resource')