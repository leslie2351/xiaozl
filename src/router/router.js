import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: () => import('@/views/login.vue')
};

export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: () => import('@/views/error-page/404.vue')
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: () => import('@//views/error-page/403.vue')
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: () => import('@/views/error-page/500.vue')
};


export const locking = {
    path: '/locking',
    name: 'locking',
    component: () => import('@/views/main-components/lockscreen/components/locking-page.vue')
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',

    component: Main,
    children: [
        { path: 'home', title: '首页', name: 'home_index', component: () => import('@/views/home/home.vue') },
        { path: 'ownspace', title: '个人中心', name: 'ownspace_index', component: () => import('@/views/own-space/own-space.vue') },
        { path: 'order/:order_id', title: '订单详情', name: 'order-info', component: () => import('@/views/advanced-router/component/order-info.vue') },
        { path: 'message', title: '消息中心', name: 'message_index', component: () => import('@/views/message/message.vue') },
        { path: 'commodity/:order_id', title: '编辑商品', name: 'commodity-info', component: () => import('@/views/advanced-router/component/commodity-info/commodity-info.vue') },
        { path: 'commoditySet/:order_id', title: '商品设置', name: 'commodity-set', component: () => import('@/views/advanced-router/component/commodity-set/commodity-set.vue') },
        { path: 'commodityadd/:order_id', title: '添加商品', name: 'commodity-add', component: () => import('@/views/advanced-router/component/commodity-add/commodity-add.vue') },
        { path: 'settlementDetails/:settlement_id', title: '结算详情', name: 'settlement-details', component: () => import('@/views/advanced-router/component/settlement-details/settlement-details.vue') },
        { path: 'paymentDetails/:payment_id', title: '查看详情', name: 'payment-details', component: () => import('@/views/advanced-router/component/allorders-details/payment-details.vue') },
        { path: 'rightsSet/:outstanding_id', title: '查看详情', name: 'rights-set', component: () => import('@/views/advanced-router/component/rights-Set/rights-Set.vue') },
        { path: 'rightsSet1/:unfinished_id', title: '查看详情', name: 'rights-set1', component: () => import('@/views/advanced-router/component/rights-Set/rights-Set1.vue') },
        { path: 'completeSet/:complete_id', title: '查看详情', name: 'complete-set', component: () => import('@/views/advanced-router/component/rights-Set/complete-Set.vue') },
        { path: 'completeSet1/:returned_id', title: '查看详情', name: 'complete-set1', component: () => import('@/views/advanced-router/component/rights-Set/complete-Set1.vue') },
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    // {
    //     path: '/access',
    //     icon: 'key',
    //     name: 'access',
    //     title: '权限管理',
    //     component: Main,
    //     children: [
    //         { path: 'index', title: '权限管理', name: 'access_index', component: () => import('@/views/access/access.vue') }
    //     ]
    // },
    // {
    //     path: '/access-test',
    //     icon: 'lock-combination',
    //     title: '权限测试页',
    //     name: 'accesstest',
    //     access: 0,
    //     component: Main,
    //     children: [
    //         { path: 'index', title: '权限测试页', name: 'accesstest_index', access: 0, component: () => import('@/views/access/access-test.vue') }
    //     ]
    // },
    {
        path: '/store-profile',
        icon: 'key',
        name: 'storeProfile',
        title: '店铺概况',
        component: Main,
        children: [
            { path: '/store-profile', title: '店铺概况', name: 'store-profile', component: () => import('@/views/store-profile/store-profile.vue') }
        ]
    },
    {
        path: '/commodity',
        icon: 'key',
        name: 'commodity',
        title: '商品设置',
        component: Main,
        children: [
            { path: '/issue-commodity', title: '发布商品', name: 'issue-commodity', component: () => import('@/views/commodity/issue-commodity/issue-commodity.vue') },
            { path: '/commodity-list', title: '商品列表', name: 'commodity-list', component: () => import('@/views/commodity/commodity-list/commodity-list.vue') },
            { path: '/grouping-manage', title: '分组管理', name: 'grouping-manage', component: () => import('@/views/commodity/grouping-manage/grouping-manage.vue') },
            { path: '/label', title: '标签', name: 'label', component: () => import('@/views/commodity/label/label.vue') }
        ]
    },
    {
        path: '/statistics',
        icon: 'key',
        name: 'statistics',
        title: '统计',
        component: Main,
        children: [
            { path: '/store-profiles', title: '店铺概况', name: 'store-profiles', component: () => import('@/views/statistics/store-profiles/store-profiles.vue') },
            { path: '/commodity-analyze', title: '商品分析', name: 'commodity-analyze', component: () => import('@/views/statistics/commodity-analyze/commodity-analyze.vue') },
            { path: '/operation', title: '运营报告', name: 'operation', component: () => import('@/views/statistics/operation/operation.vue') },
            { path: '/collect-statistics', title: '收藏统计', name: 'collect-statistics', component: () => import('@/views/statistics/collect-statistics/collect-statistics.vue') },
        ]
    },
    {
        path: '/trading',
        icon: 'key',
        name: 'trading',
        title: '交易',
        component: Main,
        children: [
            { path: '/all-orders', title: '所有订单', name: 'all-orders', component: () => import('@/views/trading/all-orders/all-orders.vue') },
            { path: '/evaluation-management', title: '评价管理', name: 'evaluation-management', component: () => import('@/views/trading/evaluation-management/evaluation-management.vue') },
            { path: '/settlement-management', title: '结算管理', name: 'settlement-management', component: () => import('@/views/trading/settlement-management/settlement-management.vue') },
            { path: '/rights-orders', title: '维权订单', name: 'rights-orders', component: () => import('@/views/trading/rights-orders/rights-orders.vue') },
            { path: '/logistics-management', title: '物流管理', name: 'logistics-management', component: () => import('@/views/trading/logistics-management/logistics-management.vue') }
        ]
    },
    {
        path: '/platform-services',
        icon: 'key',
        name: 'platformServices',
        title: '平台服务',
        component: Main,
        children: [
            { path: '/basic-service', title: '基础服务', name: 'basicService', component: () => import('@/views/platform-services/basic-service/basic-service.vue')},
            { path: '/added-service', title: '增值服务', name: 'addedService', component: () => import('@/views/platform-services/added-service/added-service.vue')}
        ]
    },
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    locking,
    ...appRouter,
    page500,
    page403,
    page404
];
