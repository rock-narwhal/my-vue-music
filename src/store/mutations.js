export default{
    // 更新当前播放时间
    updateCurrent(state, second){
        state.playingInfo.current = second
    },
    // 播放音乐
    playMusic(state, music){
        state.playingInfo.songId = music.id
        state.playingInfo.type = 0
        state.playingInfo.current = 0
        state.playingInfo.duration = music.duration
        state.playingInfo.name = music.name
        state.playingInfo.coverUrl = music.album.picUrl
        state.playingInfo.album = music.album
        state.playingInfo.artists = music.artists
        this.commit('addToPlayList', music)
        state.playingInfo.pause = false
    },
    // 添加到播放列表
    addToPlayList(state, music){
        let find = state.playList.find(item => item.id === music.id);
        if(!find){
            state.playList.unshift(music)
        }
    },
    // 播放状态
    setPauseState(state, payload){
        state.playingInfo.pause = payload
    },
    // 播放的音乐源
    setPlayingSrc(state, payload){
        state.playingInfo.src = payload
    }
}