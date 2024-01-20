export default{
    // 更新当前播放时间
    updateCurrent(state, second){
        state.playingInfo.current = second
    },
    playMusic(state, music){
        console.log("mutation playMusic state : ",state.playingInfo)
        console.log("mutation playMusic music : ",music)
        state.playingInfo.type = 0
        state.playingInfo.pause = false
        state.playingInfo.current = 0
        state.playingInfo.duration = music.duration
        state.playingInfo.songId = music.id
        state.playingInfo.name = music.name
        state.playingInfo.coverUrl = music.album.picUrl
        state.playingInfo.album = music.album
        state.playingInfo.artists = music.artists
        console.log("mutation playMusic state : ",state.playingInfo)
    },
    setPlayState(state, payload){
        state.playingInfo.pause = payload
    },
    setPlayingSrc(state, payload){
        state.playingInfo.src = payload
    }
}