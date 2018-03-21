<!-- 我是退款页面 -->
<style lang="less">

    // @import '../../../../styles/common.less';
    .ivu-table-cell{
        padding:0;
    }
</style>

<template>
    <div>
        <Row>
            <Col span="24">
                <Card class='clearfix'>

                    <div class="margin-bottom-10 clearfix">
                        <Row class='fl margin-right-10'>
                            <Input v-model="searchConName" @on-click="initTable" icon="search" placeholder="请输入商品名称搜索..." style="width: 200px" />
                        </Row>
                        
                    </div>
                    <Row class="margin-top-10 searchable-table-con1" justify="center" align="middle">
                        <Table border :columns="orderColumns" :data="orderData" @on-selection-change='change'></Table>
                    </Row>
                    <div class="clearfix">
      
                        <Button type="error" class='margin-top-10 fl'  @click = 'batchDel'>批量删除</Button>
                        <Page :total=total size="small" class='fr margin-top-20' show-elevator show-sizer show-total
                            @on-change = 'changePage' @on-page-size-change='changePageSize' placement='top'></Page>
                    </div>
                    <Modal
                        v-model="modal8"
                        title="确认删除"
                        @on-ok="okDel"
                        @on-cancel="cancelDel">
                        <p>确定删除吗？删除后无法恢复</p>

                    </Modal>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
console.log(this);

export default {
    name: 'mutative-router',
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
                    title: '审核时间',
                    key: 'examineDate',
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
                                            this.show(params.index)
                                            let argu = {
                                                // btn_id:this.id,
                                                order_id: this.id
                                            };
                                            this.$router.push({
                                                name: 'commodity-info',
                                                params: argu
                                            });
                                        }
                                    }
                                }, '查看'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    style: {
                                        display: 'block',
                                        margin:'5px auto'
                                    },
                                    on: {
                                        click: () => {
                                            this.del(params.index)
                                        }
                                    }
                                }, '删除'),                              
                            ])
                    }
                }

            ],
            orderData: [
                // {
                //     tinyImg:'http://img5.imgtn.bdimg.com/it/u=160556671,2821322008&fm=27&gp=0.jpg',
                // }
            ],
            searchConName:'',
            valuedata: [],
            // seeData:[], //获取到的筛选，未过滤的
            changselect:[],//批量选中的列表
            changselectId:[],//批量选中的列表的ID
            id:'',//

            //删除
            modal8:false,

            total:0,//总页数
            current:1,//当前页码
            pageSize:10,//每页数量
            
        };
    },

    methods:{
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
        show(val){  //编辑
            this.id = this.orderData[val].id;

        },
        del(val){  //删除
            this.modal8=true;
            this.id = "'"+this.orderData[val].id+"'";
            console.log(this.id);
            
        },
        batchDel(){ //批量删除
            this.modal8=true;
            console.log(this.id);
        },
        okDel(){ //点击删除确认的时候
            this.$http.put('http://192.168.5.11:8080/storeGoods/alterStoreGoods',{
                id:this.id,
                status:5
            }).then((data)=>{
                console.log(data)
                if(data.data.result == 1){
                    this.$Message.info(data.data.message);
                    this.initTable()
                }else{
                    alert(data.data.message)
                }
            }).catch((err)=>{
                console.log(err)

            })
        },
        cancelDel(){
            this.$Message.info('取消删除');
        },
        initTable(){//初始化页面
            this.$http.post('http://192.168.5.11:8080/storeGoods/storeGoodsGroupShow',{
                pageNum:this.current,
                pageSize:this.pageSize,
                storeId:6666,
                status:3,
                goodsName:this.searchConName,
                groupId:this.groupId,//分组id
            }).then((data)=>{
                console.log(data);
                this.orderData = data.data.list
                this.total = data.data.total
            }).catch((err)=>{
                console.log(err);
                
            })
        },

    },
    mounted(){
        this.initTable()

    }
};
</script>
