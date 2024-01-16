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
                        meta: {title: '首页歌单'}
                    },
                    {
                        path: 'toplist',
                        name: 'TopList',
                        component: () => import('@/views/home/TopList'),
                        meta: {title: '排行榜页面'}
                    },
                    {
                        path: 'artistlist',
                        name: 'ArtistList',
                        component: ()=> import('@/views/home/ArtistsPage'),
                        meta: {title: '歌手页'}
                    }
                ]
            }
        ]
    }
]