
<style lang="less">
    // @import "./grouping-manage.less";
    @import "../../../styles/common.less";
</style>
<template>
        <Row :gutter="10">
            <Card style="width:99.5%; margin:0 auto;">
                <div style="padding-bottom:10px;border-bottom:2px solid #e9eaec;" class="clearfix">
                    <h3 class="fl">标签管理</h3>
                    <Button type="primary" class="fr" @click="btnAdd">添加标签</Button>
                </div>
                <Row class="margin-top-10 searchable-table-con1" justify="center" align="middle">
                    <Table border :columns="orderColumns" :data="orderData"></Table>
                </Row>
                <div class="clearfix">
                    <Page :total=total size="small" class='fr margin-top-20' show-elevator show-sizer show-total
                        @on-change = 'changePage' @on-page-size-change='changePageSize' placement='top'></Page>
                </div>
            </Card>
            <Modal
                v-model="modal1"
                title= '添加'
                @on-ok="okAdd"
                @on-cancel="cancelAdd">
                <div>
                    <div class="padding-top-10 display">
                        <span class="fl m-l margin-right-10">标签名称：</span>
                        <Input v-model="value1" placeholder="..." style="width: 300px"></Input>
                    </div>
                    <div class="padding-top-10 display">
                        <span class="fl m-l margin-right-10">商品个数：</span>
                        <Input v-model="value2" placeholder="..." style="width: 300px"></Input>
                    </div>
                    <div class="padding-top-10 display">
                        <span class="fl m-l margin-right-10">创建时间:</span>
                        <Input v-model="value3" placeholder="..." style="width: 300px"></Input>
                    </div>
                    <div class="padding-top-10 display">
                        <span class="fl m-l margin-right-10">排序:</span>
                        <Input v-model="value4" placeholder="..." style="width: 300px"></Input>
                    </div>
                </div>

            </Modal>
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
                    title: '标签名称',
                    key: 'labelName',
                    align: 'center'
                },
                {
                    title: '商品个数',
                    key: 'goodsNum',
                    align: 'center'
                },
                {
                    title: '创建时间',
                    key: 'createDate',
                    align: 'center'
                },
                {
                    title: '排序',
                    key: 'sort',
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
                                                name: 'commodity-set',
                                                params: argu
                                            });
                                        }
                                    }
                                }, '商品设置')                            
                            ])
                    }
                }

            ],
            orderData: [
            ],
            //点击添加
            modal1:false,
            value1:'',
            value2:'',
            value3:"",
            value4:'',
            total:0,//总页数
            current:1,//当前页码
            pageSize:10,//每页数量
        };
    },
    computed: {

    },
    methods: {
        changePage(val){ //切换页码
            console.log(val)
            this.current = val
            this.initTable()
        },
        changePageSize(val){ //改变每页显示条数
            this.pageSize = val
            this.initTable()

        },
        show(val){
            this.id = this.orderData[val].id;
            console.log(this.id);
            
        },
        //点击添加时
        btnAdd(){
            this.modal1 = true;
        },
        okAdd(){ //确认添加

            this.$http.post('http://192.168.5.11:8080/storeGroup/storeIsHaveGroup',{
                storeId:6666,


            }).then((data)=>{
                if(data.data.result == 1){
                    this.$Message.info(data.data.message);
                    this.initList()
                }else{
                    alert(data.data.message)
                }

            }).catch((err)=>{
                console.log(err)

            })
        },
        cancelAdd(){
            this.$Message.info('取消添加');
        },
        initTable(){
            this.$http.post('http://192.168.5.11:8080/label/labelShow',{
                storeId:6666,
                pageNum:this.current,
                pageSize:this.pageSize,
            }).then((data)=>{
                console.log(data);
                this.orderData = data.data.list;
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