<style lang="less">
    @import "./issue-commodity.less";
    @import "../../../styles/common.less";
</style>
<template>
    <div>
        <tab1 v-show='getCommodityNum == 0'></tab1>
        <tab2 v-show='getCommodityNum == 1'></tab2>
    </div>
</template>

<script>
import tab1 from './component/tab1'
import tab2 from './component/tab2'
export default {
    name: 'home',
    components: {
        tab1,
        tab2,
    },
    data () {
        return {
            num:0,

        };
    },
    computed: {
        getCommodityNum () {
            return this.$store.state.app.commodityNum;
        },
    },
    methods: {

    },
    mounted(){
        this.$store.commit('initCommodityNum');
    }
};
</script>