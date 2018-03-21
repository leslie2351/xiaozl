
<style lang="less">
    // @import "./grouping-manage.less";
    @import "../../../../styles/common.less";
</style>
<template>
        <Row :gutter="10">
            <Card style="width:99.5%; margin:0 auto;">
                <div style="padding-bottom:10px;border-bottom:2px solid #e9eaec;" class="clearfix">
                    <span @click='reply()' class="fl">
                        <Icon type="reply" style='font-size:20px;'></Icon>
                    </span>
                    <h3 class="fl margin-left-10">添加商品</h3>

                </div>
                <!-- <div> -->
                    <!-- <p slot="title">
                        <span @click='reply()' class="fl">
                            <Icon type="reply" style='font-size:20px;'></Icon>
                        </span>
                        <span class="margin-right-10">订单号：{{$route.params.order_id}}</span> -->
                    <!-- </p> -->

                <!-- </div> -->
                <Row class="margin-top-10 searchable-table-con1" justify="center" align="middle">
                    <Table border :columns="orderColumns" :data="orderData" @on-selection-change='change'></Table>
                </Row>
                <div class="clearfix">
                    <Button type="primary" class="fl margin-top-10" @click="bathAdd">批量添加</Button>
                    <Page :total=total size="small" class='fr margin-top-20' show-elevator show-sizer show-total
                        @on-change = 'changePage' @on-page-size-change='changePageSize' placement='top'></Page>
                </div>
                <Modal
                    v-model="modal1"
                    title="确认添加"
                    @on-ok="okDel"
                    @on-cancel="cancelDel">
                    <p>确定添加吗？</p>

                </Modal>
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
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '商品名称',
                    key: 'tinyImg',
                    align: 'center',
                    render: (h, params) => {
                        return h('div',[
                                h('img',{
                                    attrs:{
                                        'src':params.row.tinyImg
                                    },
                                    style:{
                                        marginTop:'10px',
                                        width:'50px',
                                        height:'50px'
                                    }
                                }),
                                h('div',{
                                    style:{
                                        // width:'50px',
                                        // height:'50px',
                                        margin:'0 auto'
                                    }
                                },params.row.goodsName)
                            ]
                        )
                    }
                },
                {
                    title: '商品价格',
                    key: 'salePrice',
                    align: 'center'
                },
                {
                    title: '库存',
                    key: 'totalStock',
                    align: 'center'
                },
                {
                    title: '可用库存',
                    key: 'availableStock',
                    align: 'center'
                },
                {
                    title: '上架时间',
                    key: 'shelvesDate',
                    align: 'center'
                },
                {
                    title: '操作',
                    key: 'operation',
                    align: 'center',
                    render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        display: 'block',
                                        margin:'5px auto'
                                    },
                                    on: {
                                        click: () => {
                                            this.add(params.index)
                                        }
                                    }
                                }, '添加'),
                            ])
                    }
                }

            ],
            orderData: [
                // {
                //     tinyImg:'http://img5.imgtn.bdimg.com/it/u=160556671,2821322008&fm=27&gp=0.jpg',
                // }
            ],

            //删除
            modal1:false,

            id:'',
            changselect:[],//批量选中的列表
            changselectId:[],//批量选中的列表的ID

            total:0,//总页数
            current:1,//当前页码
            pageSize:10,//每页数量
        };
    },
    computed: {

    },
    methods: {
        change(selection){//当批量选中的状态发生改变时
            console.log(selection)
            this.changselectId=[]; //清空之前选择的ID数组
            this.changselect=selection;
            this.changselect.forEach((item)=>{
                this.changselectId.push(item.id)
            })
            let ss = ''
            this.changselectId.forEach((item)=>{
                ss+="'"+item + "'"+","
            })
            this.id = ss.substr(0,ss.length-1);
            console.log(this.id);

        },
        changePage(val){ //切换页码
            console.log(val)
            this.current = val
            this.initTable()
        },
        changePageSize(val){ //改变每页显示条数
            this.pageSize = val
            this.initTable()

        },
        reply(){
            this.$router.history.go(-1)
        },
        //点击添加
        add(val){
            this.modal1 = true;
            this.id = "'"+this.orderData[val].id +"'"
        },
        //点击批量添加
        bathAdd(){
            if(this.id.length<=0){
                alert('请选择商品')
            }else{
                this.modal1 = true;
            }
        },
        okDel(){ //点击添加确认的时候
            // this.$http.post('http://192.168.5.9:8080/label/addAssociatedGoods',{
            //     goodsId:this.id,

            // }).then((data)=>{
            //     console.log(data)
            //     if(data.data.result == 1){
            //         this.$Message.info(data.data.message);
            //         this.initTable()
            //     }else{
            //         alert(data.data.message)
            //     }
            // }).catch((err)=>{
            //     console.log(err)

            // })
        },
        cancelDel(){
            this.$Message.info('取消添加');
        },
        initTable(){
            this.$http.post('http://192.168.5.9:8080/label/associatedGoods',{
                id:this.$route.params.order_id,
                storeId:6666,
                pageNum:this.current,
                pageSize:this.pageSize,
            }).then((data)=>{
                console.log(data);
                this.orderData = data.data.list
                this.total = data.data.total
            }).catch((err)=>{
                console.log(err);

            })
        }

    },
    mounted(){
        this.initTable()
    }
};
</script>
