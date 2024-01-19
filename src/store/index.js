import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
    isLogin: false,
    account :{},
    profile: {},
    // 正在播放的歌曲的信息
    playingInfo:{
        type: 1, // 0 表示在播放单曲，1表示在播放歌单
        mode: 0, // 0列表循环, 1 单曲循环 , 2 随机播放  ,3 列表顺序播放
        pause: false, // 暂停播放
        songId: '', //歌曲 id
        like:'', // 是否喜爱该歌曲
        collect:'',// 是否收藏该歌曲
        name:'In the End', //歌曲名称
        src: '',
        coverUrl: 'http://p2.music.126.net/CUgGGyE5KHiRsyR43mF3eQ==/109951163572864669.jpg', //封面
        lyric:'', //歌词
        albumId: '', // 专辑id
        artists:[{
            id:'1000000',
            name:'Linkin Park'
        }], //歌手/乐队
    },
    // 播放列表信息
    playList:[]
}

const getters = {
    subscribePlaylist(){

    },
    createPlaylist(){

    }
}

const store = new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})

export default store