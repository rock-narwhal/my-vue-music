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
                        component: () => import('@/views/home/ArtistsPage'),
                        meta: {title: '歌手页'}
                    },
                    {
                        path: 'latest',
                        name: 'LatestPage',
                        redirect: '/homePage/latest/songs',
                        component: () => import('@/views/home/LatestPage'),
                        meta: {title: '最新音乐'},
                        children: [
                            {
                                path: 'songs',
                                name: 'LatestSongPage',
                                component: () => import('@/views/home/latest/LatestSongPage'),
                                meta: {title: '新歌速递'}
                            },
                            {
                                path: 'albums',
                                name: 'LatestAlbumPage',
                                component: () => import('@/views/home/latest/LatestAlbumPage'),
                                meta: {title: '新碟上架'}
                            },
                        ]
                    },
                ]
            },
            //搜索
            {
                name: 'SearchPage',
                path: 'search',
                // props: (route) => ({ keywords: route.query.keywords }),
                props: true,
                component: () => import('@/views/search/SearchPage'),
                redirect: '/search/songs',
                children: [
                    {
                        name: 'SearchSongs',
                        path: 'songs',
                        props: true,
                        component: () => import('@/views/search/SearchSongs.vue')
                    },
                    {
                        name: 'SearchAlbum',
                        path: 'albums',
                        props: true,
                        component: () => import('@/views/search/SearchAlbums.vue')
                    },
                    {
                        name: 'SearchArtists',
                        path: 'artists',
                        props: true,
                        component: () => import('@/views/search/SearchArtists.vue')
                    },
                    {
                        name: 'SearchPlaylist',
                        path: 'playlist',
                        props: true,
                        component: () => import('@/views/search/SearchPlaylist.vue')
                    }
                ]
            },
            //详情
            {
                name: 'Detail',
                path: 'detail',
                props: true,
                component: () => import('@/views/detail/DetailPage'),
                children: [
                    {
                        name: 'ArtistDetail',
                        path: 'artist',
                        props: true,
                        component: () => import('@/views/detail/artist/ArtistDetail.vue'),
                        redirect: '/detail/artist/album',
                        children: [
                            {
                                name: 'ArtistAlbum',
                                path: 'album',
                                component: () => import('@/views/detail/artist/AritstAlbum.vue')
                            },
                            {
                                name: 'ArtistMV',
                                path: "mv",
                                component: () => import('@/views/detail/artist/ArtistMV.vue')
                            },
                            {
                                name: 'ArtistInfo',
                                path: 'info',
                                component: () => import('@/views/detail/artist/ArtistInfo.vue')
                            },
                            {
                                name: 'SimilarArtist',
                                path: 'similar',
                                component: () => import('@/views/detail/artist/SimilarArtist.vue')
                            }
                        ]
                    },
                    {
                        name: 'AlbumDetail',
                        path: 'album',
                        component: () => import('@/views/detail/album/AlbumDetail.vue'),
                        redirect:'/detail/album/musicList',
                        children: [
                            {
                                name: 'AlbumMusicList',
                                path: 'musicList',
                                component: () => import('@/views/detail/album/AlbumMusicList.vue')
                            },
                            {
                                name: 'AlbumComments',
                                path: 'comments',
                                component: () => import('@/views/detail/album/AlbumComments.vue')
                            },
                            {
                                name: 'AlbumInfo',
                                path: 'info',
                                component: () => import('@/views/detail/album/AlbumInfo.vue')
                            }
                        ]
                    }
                ]
            }
        ]
    }
]