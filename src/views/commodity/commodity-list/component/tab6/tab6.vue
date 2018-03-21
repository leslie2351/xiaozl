<!-- 我是退款页面 -->
<style lang="less">

    // @import '../../../../styles/common.less';
    .ivu-table-cell{
        padding:0;
    }
.m-t{
    width: 150px;
    text-align:right;
    line-height: 32px;
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
                        <div class='fl padding-left-20'>
                            <span class="fl" style="color: #495060;font-size: 12px;line-height: 32px;">分组选择框：</span>
                            <Cascader :data="data" v-model="value1" class='fl margin-right-10' @on-change='btnSee' change-on-select></Cascader>
                        </div>
                    </div>
                    <Row class="margin-top-10 searchable-table-con1" justify="center" align="middle">
                        <Table border :columns="orderColumns" :data="orderData" @on-selection-change='change'></Table>
                    </Row>
                    <div class="clearfix">
                        <Button type="primary" class='margin-top-10 fl' @click = 'batchSold'>批量下架</Button>
                        <Button type="error" class='margin-top-10 fl margin-left-10' @click = 'batchDel'>批量删除</Button>
                        <Page :total=total size="small" class='fr margin-top-20' show-elevator show-sizer show-total
                            @on-change = 'changePage' @on-page-size-change='changePageSize' placement='top'></Page>
                    </div>
                    <Modal
                        v-model="modal7"
                        title='修改'
                        @on-ok="ok"
                        @on-cancel="cancel">
                        <div class="padding-top-10">
                            <span class="fl m-t margin-right-10">库存：</span>
                            <Input v-model="text1" placeholder="" style="width: 200px"></Input>
                        </div>
                        <div class="padding-top-10">
                            <span class="fl m-t margin-right-10">可用库存：</span>
                            <Input v-model="text2" placeholder="" style="width: 200px"></Input>
                        </div>

                    </Modal>
                    <Modal
                        v-model="modal8"
                        title="确认删除"
                        @on-ok="okDel"
                        @on-cancel="cancelDel">
                        <p>确定删除吗？删除后无法恢复</p>

                    </Modal>
                    <Modal
                        v-model="modal9"
                        title="确认下架"
                        @on-ok="okSold"
                        @on-cancel="cancelSold">
                        <p>确定下架吗？下架后可重新上架</p>

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
                                            this.show(params.index)
                                            
                                        }
                                    }
                                }, '修改库存'),
                                h('Button', {
                                    props: {
                                        type: 'success',
                                        size: 'small'
                                    },
                                    style: {
                                        display: 'block',
                                        margin:'5px auto'
                                    },
                                    on: {
                                        click: () => {
                                            this.sold(params.index)
                                        }
                                    }
                                }, '下架'),
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
            // model1:'',
            // order_state:[{dictCode:'',dictName:'全部'}],//订单状态
            value1: [],
            data: [
            ],
            // seeData:[], //获取到的筛选，未过滤的
            changselect:[],//批量选中的列表
            changselectId:[],//批量选中的列表的ID
            id:'',//
            //点击修改
            modal7:false,
            text1:"",
            text2:"",
            //删除
            modal8:false,
            //下架
            modal9:false,

            groupId:'',//分组id
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
        screenOrder(val){
            console.log(val)
        },
        show(val){  //编辑
            this.id = this.orderData[val].id;
            this.text1 = this.orderData[val].totalStock;
            this.text2 = this.orderData[val].availableStock;
            this.modal7 = true;
        },
        ok(){ //点击编辑确认的时候
            this.$http.post('http://192.168.5.11:8080/warningProduct/alterWarningProduct',{
                id:this.id,
                availableStock:this.text2,
                totalStock:this.text1
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
        cancel(){
            this.$Message.info('取消删除');
        },
        del(val){  //删除
            this.modal8=true;
            this.id = "'"+this.orderData[val].id+"'";
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
        sold(val){  //下架
            this.modal9 = true;
            this.id = "'"+this.orderData[val].id+"'";
            
        },
        batchSold(){ //批量下架事件
            this.modal9 =true;
            console.log(this.changselectId)
            // let ss = ''
            // this.changselectId.forEach((item)=>{
            //     ss+="'"+item + "'"+","
            // })
            // this.id = ss.substr(0,ss.length-1);
            console.log(this.id);
            

        },
        okSold(){ //点击下架确认的时候
            this.$http.put('http://192.168.5.11:8080/storeGoods/alterStoreGoods',{
                id:this.id,
                status:2
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
        cancelSold(){
            this.$Message.info('取消删除');
        },
        initSeero(){ //获取下拉框内容
            this.$http.post('http://192.168.5.11:8080/storeGroup/storeGroupShow',{
                storeId:'6666'
            }).then((data)=>{
                console.log(data.data);
                // this.seeData = data.data;

                this.AtterSee(data.data)
                
            }).catch((err)=>{
                console.log(err);
                
            })
        },
        //过滤筛选，调整筛选内容为前段需要的
        AtterSee(data){
            data.forEach((item)=>{
                item.value = item.id;
                item.label = item.groupName;
                if(item.storeGroupInfoPOs !=undefined){
                    item.children = item.storeGroupInfoPOs;
                    this.AtterSee(item.children)
                }

            })
            this.data = data;      
        },
        btnSee(val){ // 点击下拉框
            this.groupId = val[val.length-1]
            console.log(this.groupId);
            this.initTable()
        },
        initTable(){//初始化页面
            this.$http.post('http://192.168.5.11:8080/warningProduct/warningProductShow',{
                pageNum:this.current,
                pageSize:this.pageSize,
                storeId:6666,
                status:1,
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
        this.initSeero()

    }
};
</script>
