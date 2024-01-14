export default [
    {
        name: 'root',
        path: '/',
        component: () => import('@/views/Layout'),
        redirect: '/homePage',
        children: [
            // 首页 发现音乐
            {
                name: 'HomePage',
                path: 'homePage',
                component: () => import('@/views/home/HomePage'),
                redirect: '/homePage/personalrecom',
                children: [
                    {
                        path: 'personalrecom',
                        name: 'PersonalRecom',
                        component: () => import('@/views/home/PersonalRecom'),
                        meta: {title: '个性推荐'}
                    },
                    {
                        path: 'playlist',
                        name: 'PlayList',
                        component: () => import('@/views/home/PlayList'),
                        meta: {title: '歌单列表'}
                    }
                ]
            }
        ]
    }
]