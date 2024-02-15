import {songDetail} from "@/api/api_music";

export default {
    async playMusicById({commit}, id){
        const res = await songDetail(id)
        if(res.code !== 200) return
        if(res.songs){
            let song = res.songs[0]
            commit('playMusic',song)
        }
    }
}