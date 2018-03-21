<style lang="less">
    // @import '@/styles/common.less';
    // @import './orderManagement.less';
    @import '../../../styles/common.less';
</style>

<template>
        <Card>
            <!-- <Tabs :animated='false'> -->
            <Tabs @on-click='btn'>
                <TabPane label="商品详细" icon="social-usd"><commodityInfo v-if='name == 0'></commodityInfo></TabPane>
                <TabPane label="热卖商品" icon="android-map"><bestCommodity v-if='name == 1'></bestCommodity></TabPane>
            </Tabs>
        </Card>
</template>

<script>
import commodityInfo from './component/commodity-info'
import bestCommodity from './component/best-commodity'
export default {
    name: 'mutative-router',
    components:{
        commodityInfo,
        bestCommodity
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
