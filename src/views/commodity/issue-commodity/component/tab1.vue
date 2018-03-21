<style lang="less">
    // @import "../issue-commodity.less";
    // @import "../../../../styles/common.less";
</style>
<template>
        <Row :gutter="10">
            <Card style="width:99.5%; margin:0 auto;">
                <h3 style="padding-bottom:10px;border-bottom:2px solid #e9eaec;">发布商品</h3>
                <div style="text-align:center;" class="height-100 padding-top-20 padding-bottom-20">
                    类型搜索：
                    <Input v-model="value" placeholder="输入类型..." style="width: 300px"></Input><Button type="primary" style="width:80px;">搜索</Button>
                </div>
                <Card style="width:90%;" class="auto padding-bottom-20">
                    <div style="width:100%;" class="flexs">
                        <div style='width:300px;'>
                            <Input v-model="searchConName" icon="search" @on-click='search' placeholder="请输入类型名称搜索..." style="width: 300px" />
                            <Table height="300" highlight-row :columns="columns" :data="typeData" @on-current-change='btn'></Table>
                        </div>
                        <div style='width:300px;'>
                            <Input v-model="searchConName" icon="search" @on-click='search' placeholder="请输入类型名称搜索..." style="width: 300px" />
                            <Table height="300" highlight-row :columns="columns" :data="typeData" @on-current-change='btn'></Table>
                        </div>
                        <div style='width:300px;'>
                            <Input v-model="searchConName" icon="search" @on-click='search' placeholder="请输入类型名称搜索..." style="width: 300px" />
                            <Table height="300" highlight-row :columns="columns" :data="typeData" @on-current-change='btn'></Table>
                        </div>
                    </div>
                </Card>
                <div style="text-align:center;">
                    <Button type="primary" style="width:80px;" class="margin-top-20" @click='btnNext'>下一步</Button>
                </div>
            </Card>
            <Modal
                v-model="modal"
                title="请先添加分组"
                @on-ok="okSold"
                @on-cancel="cancelSold">
                <p>该店铺没有设置商品分组，请先设置商品分组，才能发布商品</p>

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
            value:'',
            searchConName:'',
            columns:[
                {
                    title: '分类名称',
                    key: 'classifyName',
                    align: 'center',
                },
            ],
            typeData:[],
            modal:false,//添加分组

        };
    },
    computed: {

    },
    methods: {
        search(){
            
        },
        btn(val){
            console.log(val);
            
        },
        btnNext(){
            this.$store.commit('setCommodityNum');
        },
        intended(){ //效验商品是否有分组
            this.$http.get('http://192.168.5.11:8080/storeGroup/storeIsHaveGroup/'+'6666')
            .then((data)=>{
                console.log(data);
                if(data.data.result == 0){
                    this.modal = true;
                }
            }).catch((err)=>{
                console.log(err);
                
            })
        },
        okSold(){ //点击添加分组确认的时候
            this.$router.push({
                name: 'grouping-manage',
            });
        },
        cancelSold(){
            this.$Message.info('取消删除');
            this.$router.push({
                name: 'grouping-manage',
            });
        },
    },
    mounted(){
        this.intended()  //检查商品是否有分组
    }
};
</script>