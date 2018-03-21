<style lang="less">
    @import "./grouping-manage.less";
    @import "../../../styles/common.less";
</style>
<template>
        <Row :gutter="10">
            <Card style="width:99.5%; margin:0 auto;">
                <div style="padding-bottom:10px;border-bottom:2px solid #e9eaec;" class="clearfix">
                    <h3 class="fl">分组管理</h3>
                    <Button type="primary" class="fr" @click='addBtn(0)'>添加分组</Button>
                </div>
                <Card class="grouping_manage">
                    <div class="head clearfix">
                        <span>分组名称</span>
                        <span>排序</span>
                        <span>前台是否展示</span>
                        <span>操作</span>
                    </div>
                    <Collapse accordion v-model="value22">
                        <Panel v-for='(item,index) in dataList' :key='item.id'>
                            <div class="head_main">
                                    <span class="head_main_h">{{item.groupName}}</span>
                                    <span class="head_main_b">{{item.groupSerialNo}}</span>
                                    <span class="head_main_b">{{item.groupFlag}}</span>
                                    <span class="head_main_b">
                                        <Button type="warning" @click.stop='addBtn(1,item.id)' style="margin-right:20px;">添加子分组</Button>
                                        <Button type="primary" style="margin-right:20px;" @click.stop='btn(item.id,index)'>编辑</Button>
                                        <Button type="error" @click.stop='btnDel(item.id)'>删除</Button>
                                    </span>
                            </div>
                            <div slot="content" v-if='item.storeGroupInfoPOs'>
                                <div class="headSlot clearfix" v-for='child,n in item.storeGroupInfoPOs'>
                                     <span class="head_main_h">{{child.groupName}}</span>
                                    <span class="head_main_b">{{child.groupSerialNo}}</span>
                                    <span class="head_main_b">{{child.groupFlag}}</span>
                                    <span class="head_main_b">
                                        <Button type="primary" style="margin-right:20px;" @click.stop='btn(child.id,index,n)'>编辑</Button>
                                        <Button type="error" @click.stop='btnDel(child.id)'>删除</Button>
                                    </span>
                                </div>

                            </div>
                        </Panel>

                    </Collapse>
                    <Modal
                        v-model="modal1"
                        title= '修改'
                        @on-ok="ok"
                        @on-cancel="cancel">
                        <div>
                            <div class="padding-top-10" v-if='onOff'>
                                <span class="fl m-l margin-right-10">上级分组：</span>
                                <Select v-model="text1" style="width:200px" @on-change='btnOption'>
                                    <Option v-for="item in cityList2" :value="item.groupName" :key="item.groupName">{{item.groupName}}</Option>
                                </Select>
                            </div>
                            <div class="padding-top-10 display">
                                <span class="fl m-l margin-right-10">分组名称：</span>
                                <Input v-model="value1" placeholder="..." style="width: 300px"></Input>
                            </div>
                            <div class="padding-top-10 display">
                                <span class="fl m-l margin-right-10">排序：</span>
                                <Input v-model="value2" placeholder="..." style="width: 300px" @on-blur="blurNum"></Input>
                            </div>
                            <div class="padding-top-10 display">
                                <span class="fl m-l margin-right-10">前台是否展示：</span>
                                <RadioGroup class='head-l' v-model="value3">
                                    <Radio label="显示"></Radio>
                                    <Radio label="不显示"></Radio>
                                </RadioGroup>
                            </div>
                        </div>

                    </Modal>
                    <Modal
                        v-model="modal10"
                        title= '添加'
                        @on-ok="okAdd"
                        @on-cancel="cancelAdd">
                        <div>
                            <div class="padding-top-10">
                                <span class="fl m-l margin-right-10">分组名称：</span>
                                <Input v-model="value1" placeholder="..." style="width: 300px"></Input>
                            </div>
                            <div class="padding-top-10 clearfix">
                                <span class="fl m-l margin-right-10">排序：</span>
                                <!-- <Input v-model="value2" placeholder="..." style="width: 300px" @on-blur="blurNum"></Input> -->
                                <p class='fl' style='font-size:14px;line-height:32px'>{{maxNum}}</p>
                            </div>
                            <div class="padding-top-10">
                                <span class="fl m-l margin-right-10">前台是否展示：</span>
                                <RadioGroup class='head-l' v-model="value3">
                                    <Radio label="显示"></Radio>
                                    <Radio label="不显示"></Radio>
                                </RadioGroup>
                            </div>
                        </div>

                    </Modal>
                    <Modal
                        v-model="delModal"
                        title="确认删除"
                        @on-ok="okDel"
                        @on-cancel="cancelDel">
                        <p>确定删除吗？删除后无法恢复</p>

                    </Modal>
                </Card>
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
            value22:'0',

            dataList:[],
            modal1:false,//修改状态
            onOff:false,//是否上级分组
            groupSerialNoold:'',//旧的分组排序
            value1:'',
            value2:'',
            value3:'',
            cityList2:[],//父级id集合
            text1:'',//父级
            //点击删除
            delModal:false,

            //点击添加时
            modal10:false,
            maxNum:0, //最大值

            id:'',
            parentGroupId:0,//父级ID
        };
    },
    computed: {

    },
    methods: {
        changePage(val){ //切换页码
            console.log(val)
            this.current = val
            this.initList()
        },
        changePageSize(val){ //改变每页显示条数
            this.pageSize = val
            this.initList()

        },
        btn(id,index,n){ //点击修改
            this.modal1 = true;
            this.id = id;
            this.getMaxNum()
            if(n == undefined){
                this.onOff = false;
                this.value1 = this.dataList[index].groupName;
                this.value2 = this.dataList[index].groupSerialNo;
                this.groupSerialNoold = this.dataList[index].groupSerialNo;
                this.value3 = this.dataList[index].groupFlag;
                this.parentGroupId = this.dataList[index].parentGroupId;
            }else{
                this.onOff = true;
                this.text1 = this.dataList[index].groupName;

                this.value1 = this.dataList[index].storeGroupInfoPOs[n].groupName;
                this.value2 = this.dataList[index].storeGroupInfoPOs[n].groupSerialNo;
                this.groupSerialNoold = this.dataList[index].storeGroupInfoPOs[n].groupSerialNo;
                this.value3 = this.dataList[index].storeGroupInfoPOs[n].groupFlag;
                this.parentGroupId = this.dataList[index].storeGroupInfoPOs[n].parentGroupId;
            }

        },
        //点击上级分组下拉框
        btnOption(val){
            console.log(val);
            this.cityList2.forEach((item)=>{
                if(val == item.groupName){
                    this.parentGroupId = item.parentGroupId;
                }
            })

        },
        ok(){ //点击修改确认的时候
            let param = this.value3 == '显示' ? 1 : 2
            this.$http.put('http://192.168.5.11:8080/storeGroup/checkAlterStoreGroup',{
                id:this.id,
                groupName:this.value1,
                parentGroupId:this.parentGroupId,
                groupSerialNo:this.value2,
                groupSerialNoold:this.groupSerialNoold,
                flag:param,
                storeId:6666
            }).then((data)=>{
                console.log(data)
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
        cancel(){
            this.$Message.info('取消修改');
        },
        btnDel(val){ //点击删除的时候
            console.log(val);
            this.delModal = true;
            this.id = val;
        },
        okDel(){ //确认删除
            let ids = "'" +this.id+"'"
            this.$http.post('http://192.168.5.11:8080/storeGroup/checkDelGroup',{
                id :ids,
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
        cancelDel(){
            this.$Message.info('取消删除');
        },
        //点击添加时获取最大值
        getMaxNum(){
            this.$http.post('http://192.168.5.11:8080/storeGroup/queryMaxNo',{
                storeId:6666,
                parentGroupId:this.parentGroupId,
            }).then((data)=>{
                console.log(data);
                this.maxNum = data.data *1 +1;
            }).catch((err)=>{
                console.log(err);

            })
        },
        //移出排序输入框时
        blurNum(){
            console.log(6666);

            if(this.value2>this.maxNum || this.value2 <=0){
                this.value2 = this.maxNum;
            }

        },
        clearVal(){
            this.value1 ='';
            this.value2 = '';
            this.value3='不显示'
        },
        //点击添加时
        addBtn(type,id){

            this.modal10 = true;
            this.clearVal()
            if(type == 1){
                this.parentGroupId=id
                this.getMaxNum()
            }else if(type == 0){
                this.parentGroupId=0;
                this.getMaxNum()
            }

        },
        okAdd(){ //确认添加
            let num = this.value3 == '显示' ? 1 :2
            this.$http.post('http://192.168.5.11:8080/storeGroup/addStoreGroup',{
                storeId:6666,
                groupName:this.value1,
                parentGroupId:this.parentGroupId,
                groupSerialNo:this.maxNum,
                flag:num,

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
        initList(){
            this.$http.post('http://192.168.5.11:8080/storeGroup/storeGroupShow',{
                storeId:'6666'
            }).then((data)=>{
                console.log(data);
                this.dataList = data.data;
                console.log(this.dataList);

                this.cityList2 =[]
                data.data.forEach((item)=>{
                    this.cityList2.push(
                        {
                            groupName:item.groupName,
                            parentGroupId:item.id
                        }
                    )
                })

            }).catch((err)=>{
                console.log(err);

            })
        }
    },
    mounted(){
        this.initList()

    }
};
</script>