export default [
    {
        name:'root',
        path:'/',
        component: ()=> import('@/views/Layout'),
        // redirect:'homePage',
        children:[
            // 首页 发现音乐
            {
                name:'HomePage',
                path:'homePage',
                redirect:'/personalrecom',
                children: [
                    {
                        path: 'personalrecom',
                        name:'PersonalRecom',

                    }
                ]
            }
        ]
    }
]