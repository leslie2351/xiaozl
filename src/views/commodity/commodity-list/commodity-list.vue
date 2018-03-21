<style lang="less">
    @import "./commodity-list.less";
    @import "../../../styles/common.less";
</style>

<template>
        <Card>
            <!-- <Tabs :animated='false'> -->
            <Tabs @on-click='btn'>
                <TabPane label="已上架" icon="social-usd"><tab1 v-if='name == 0'></tab1></TabPane>
                <TabPane label="已下架" icon="android-map"><tab2 v-if='name == 1'></tab2></TabPane>
                <TabPane label="仓库中" icon="android-map"><tab3 v-if='name == 2'></tab3></TabPane>
                <TabPane label="审核中商品" icon="android-map"><tab4 v-if='name == 3'></tab4></TabPane>
                <TabPane label="审核未通过" icon="android-map"><tab5 v-if='name == 4'></tab5></TabPane>
                <TabPane label="预警商品" icon="android-map"><tab6 v-if='name == 5'></tab6></TabPane>
            </Tabs>
        </Card>
</template>

<script>
import tab1 from './component/tab1/tab1'
import tab2 from './component/tab2/tab2'
import tab3 from './component/tab3/tab3'
import tab4 from './component/tab4/tab4'
import tab5 from './component/tab5/tab5'
import tab6 from './component/tab6/tab6'
export default {
    name: 'mutative-router',
    components:{
        tab1,
        tab2,
        tab3,
        tab4,
        tab5,
        tab6
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
