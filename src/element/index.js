import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI,{Table} from 'element-ui'

const fixElTableErr = table =>{
    const oldResizeListener = table.methods.resizeListener
    table.methods.resizeListener = function (){
        window.requestAnimationFrame(oldResizeListener.bind(this))
    }
}
fixElTableErr(Table)

Vue.use(ElementUI)