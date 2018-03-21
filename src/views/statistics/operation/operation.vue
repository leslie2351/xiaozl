<style lang="less">
    // @import '@/styles/common.less';
    // @import './orderManagement.less';
    @import '../../../styles/common.less';
</style>

<template>
        <Card>
            <!-- <Tabs :animated='false'> -->
            <Tabs @on-click='btn'>
                <TabPane label="所有订单" icon="social-usd"><allOrder v-if='name == 0'></allOrder></TabPane>
                <TabPane label="实付金额" icon="android-map"><realityMoney v-if='name == 1'></realityMoney></TabPane>
                <TabPane label="订单总数量" icon="android-map"><orderNum v-if='name == 2'></orderNum></TabPane>
            </Tabs>
        </Card>
</template>

<script>
import allOrder from './component/allOrder'
import realityMoney from './component/realityMoney'
import orderNum from './component/orderNum'
export default {
    name: 'mutative-router',
    components:{
        allOrder,
        realityMoney,
        orderNum
    },
    data () {
        return {
            name:0
        }
    },
    computed: {

    },
    methods:{
        btn(name){
            this.name = name;

        }
    },
    mounted () {
        console.log('进入了退款退货单')

    }
};
</script>
