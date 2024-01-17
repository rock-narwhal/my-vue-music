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
        type: 0, // 0 表示在播放单曲，1表示在播放歌单
        pause: false, // 暂停播放
        songId: '', //歌曲 id
        coverUrl: '', //封面
        lyric:'', //歌词
        albumId: '', // 专辑id
        artists:[], //歌手/乐队
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