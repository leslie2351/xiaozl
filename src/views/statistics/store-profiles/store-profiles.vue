<!-- 商品统计 -->
<style lang="less">
@import "./store-profiles.less";
@import '../../../styles/common.less';
</style>
<template>
        <Card style='min-height:600px;'>
            <div class='margin-bottom-30 flexs'>
                <Col :xs="24" :sm="12" :md="6">
                    <infor-card

                        id-name="user_disputeCount_count"
                        :end-val="count.createUser"
                        iconType="clipboard"
                        color="#5ab1fd"
                        intro-text="30天平均客单量（个）"
                    ></infor-card>
                </Col>
                <Col :xs="24" :sm="12" :md="6">
                    <infor-card
                        paths="commodity/commodityAudit"
                        id-name="user_applyGoodsNum_count"
                        :end-val="count.visit"
                        iconType="bag"
                        color="#ffbb1e"
                        intro-text="30天平均单价（元）"
                    ></infor-card>
                </Col>
                <Col :xs="24" :sm="12" :md="6">
                    <infor-card

                        id-name="user_countReview_count"
                        :end-val="count.goodsNum"
                        iconType="ios-home-outline"
                        color="#2ac9b9"
                        intro-text="商品收藏量"
                    ></infor-card>
                </Col>
                <Col :xs="24" :sm="12" :md="6">
                    <infor-card
                        paths="commodity/auditBrand"
                        id-name="user_applyBrandNum_count"
                        :end-val="count.storeCollect"
                        iconType="ios-pricetag-outline"
                        color="#fd7a9d"
                        intro-text="店铺收藏量"
                    ></infor-card>
                </Col>


            </div>
            <Tabs value="name1" @on-click='btn' :animated='false'>
                <TabPane label="下单金额" name="name1"><tab1 v-if="name == 'name1'" :data=data.monthDay :num=data.orderMoneyNum></tab1></TabPane>
                <TabPane label="下单用户数" name="name2"><tab2 v-if="name == 'name2'" :data=data></tab2></TabPane>
                <TabPane label="下单量" name="name3"><tab3 v-if="name == 'name3'" :data=data></tab3></TabPane>
                <TabPane label="下单商品数" name="name4"><tab4 v-if="name == 'name4'" :data=data></tab4></TabPane>
            </Tabs>
        </Card>
</template>

<script>
import inforCard from './component/infor-card.vue';
import tab1 from './component/tab1.vue'
import tab2 from './component/tab2.vue'
import tab3 from './component/tab3.vue'
import tab4 from './component/tab4.vue'
export default {
    name: 'home',
    components: {
        inforCard,
        tab1,
        tab2,
        tab3,
        tab4,
    },
    data () {
        return {
            name:'name1',
            count: {
                createUser: 0,
                visit: 0,
                goodsNum: 0,
                storeCollect:0,
            },
            data:{
                monthDay:[],//时间
                orderMoneyNum:[],//下单金额 
                userNum:[],//下单用户数
                orderNum:[],//下单量
                productNum:[],//下单商品数
            }
        }
    },
    methods:{
        btn(val){

            this.name=val
        },

        initList(){
            this.$http.post('http://192.168.10.105:8080/storeStatistics/storeStatisticsDay',{
                storeId:2
            }).then((data)=>{

                data.data.forEach((item)=>{
                    this.data.monthDay.push(item.monthDay)
                    this.data.orderMoneyNum.push(item.orderMoneyNum)
                    this.data.userNum.push(item.userNum)
                    this.data.orderNum.push(item.orderNum)
                    this.data.productNum.push(item.productNum)
                    this.count.goodsNum = item.goodsNum;
                    this.count.storeCollect = item.storeCollect;

                })
                console.log(this.data);
                
            }).catch((err)=>{
                console.log(err);
                
            })
        },
        initNum(){
            this.$http.post('http://192.168.10.105:8080/storeStatistics/storeAvgDay',{
                storeId:2
            }).then((data)=>{
                console.log(data.data[0]);
                this.count.createUser=data.data[0].userAvg;
                this.count.visit=data.data[0].priceAvg;
            }).catch((err)=>{
                console.log(err);
                
            })
        }
    },
    mounted(){
        this.initList()
        this.initNum()
    }
}
</script>
