<style lang="less">
    @import "./tab4.less";
    @import "../../../../styles/common.less";
</style>
<template>
        <Row :gutter="10">
            <Card style="width:99.5%; margin:0 auto;">
                <h3 style="padding-bottom:10px;">平台客服</h3>
                <Row class="margin-top-10 searchable-table-con1" justify="center" align="middle">
                    <Table border :columns="orderColumns" :data="orderData"></Table>
                </Row>
            </Card>
        </Row>
</template>

<script>

export default {
    name: 'home',
    components: {

    },
    data () {
        return {
            orderColumns: [

                {
                    title: '客服名称',
                    key: 'goodsNo',
                    align: 'center'
                },
                {
                    title: '服务图标',
                    key: 'goodsName',
                    align: 'center'
                },
                {
                    title: '客服电话',
                    key: 'storeName',
                    align: 'center'
                },
                {
                    title: '负责人名称',
                    key: 'classifyName',
                    align: 'center'
                }

  
            ],
            orderData: [],

        };
    },
    computed: {

    },
    methods: {

    }
};
</script>