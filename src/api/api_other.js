import {get} from './request'

export const getSuggest = ({type, keywords}) => get('/search/suggest',{type, keywords})

export const getHotSearch = ()=> get('/search/hot/detail')