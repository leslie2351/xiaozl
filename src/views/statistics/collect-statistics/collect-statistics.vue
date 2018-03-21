<!-- 我是收藏统计页面 -->
<style lang="less">

    @import '../../../styles/common.less';
    .ivu-table-cell{
        padding:0;
    }
</style>

<template>
    <div>
        <Row>
            <Col span="24">
                <Card class='clearfix'>

                    <Row class="margin-top-10 searchable-table-con1" justify="center" align="middle">
                        <Table border :columns="orderColumns" :data="orderData"></Table>
                    </Row>
                    <div class="clearfix">
                        <Page :total=total size="small" class='fr margin-top-20' show-elevator show-sizer show-total
                            @on-change = 'changePage' @on-page-size-change='changePageSize' placement='top'></Page>
                    </div>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
export default {
    name: 'mutative-router',
    data () {
        return {

            orderColumns: [
                {
                    title: '商品名称',
                    key: 'goodsName',
                    align: 'center'
                },
                {
                    title: '商品价格',
                    key: 'salePrice',
                    align: 'center'
                },
                {
                    title: '收藏数量',
                    key: 'collectionNum',
                    align: 'center'
                },

            ],
            orderData: [

            ],

            total:0,//总页数
            current:1,//当前页码
            pageSize:10,//每页数量
        };
    },

    methods:{
        changePage(val){ //切换页码
            console.log(val)
            this.current = val
            this.initTable()
        },
        changePageSize(val){ //改变每页显示条数
            this.pageSize = val
            this.initTable()

        },
        initTable(){//初始化页面
            this.$http.post('http://192.168.10.105:8080/storeStatistics/goodsCollectParticulars',{
                pageNum:this.current,
                pageSize:this.pageSize,
                storeId:2
            }).then((data)=>{
                console.log(data.data)
                this.orderData = data.data.list
                this.total = data.data.total
            }).catch((err)=>{
                console.log(err)

            })
        },

    },
    mounted(){
        this.initTable()
    }
};
</script>
