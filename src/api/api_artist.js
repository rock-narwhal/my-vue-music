import {get} from './request'

//按条件查询歌手列表
export const queryArtist = ({type,area,initial,limit,offset})=> get('/artist/list',{type, area, initial,limit,offset})