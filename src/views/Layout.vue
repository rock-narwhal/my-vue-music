<template>
    <div class="layout">
        <!-- 头部区域 -->
        <div class="header">
            <HeaderBar></HeaderBar>
        </div>
        <!-- 中间区域 -->
        <div class="main">
            <!-- 左侧菜单区 -->
            <div class="aside">
                <LeftAside></LeftAside>
            </div>
            <div class="content">
                <!-- 内容区 -->
            </div>
            <!-- 右侧抽屉栏 播放列表 -->
            <div class="drawer">
                <DrawerList></DrawerList>
            </div>
        </div>
        <!-- 底部音乐进度条 -->
        <div class="footer">
            <FooterBar></FooterBar>
        </div>
    </div>
</template>

<script>
import HeaderBar from '@/components/header/HeaderBar.vue'
import LeftAside from '@/components/aside/LeftAside.vue'
import DrawerList from '@/components/drawer/DrawerList.vue'
import FooterBar from '@/components/footer/FooterBar.vue'
export default {
    name: 'Layout',
    components: {
        HeaderBar, LeftAside, DrawerList,FooterBar
    },
    data(){
        return {
            msg: 'Layout'
        }
    },
    mounted(){
        console.log('layout组件被挂载')
    }
}
</script>

<style scoped>
</style>