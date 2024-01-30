import Vue from 'vue'
import SvgIcon from "@/components/svg/SvgIcon.vue"

Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext =>{
    return requireContext.keys().map(requireContext)
}

requireAll(req)

// <svg-icon icon-class="acoustic"></svg-icon>
