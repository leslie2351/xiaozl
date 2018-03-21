<template>
    <div>
        <Row>
            <Col span="24">
            <Card class='clearfix'>
                <div class="margin-bottom-10 clearfix">
                    <Tabs @on-click="contentData" :value="name">
                        <TabPane label="全部服务" name="name1">
                            <div v-if="name=='name1'">
                            <Row class='fl margin-right-10'>
                                <Input v-model="searchName" icon="search" placeholder="活动名称" style="width: 200px"/>
                            </Row>
                            <Select class='fl margin-right-10' style="width:150px" placeholder='服务类型'>
                                <Option value="sp">商品</Option>
                                <Option value="sp">店铺</Option>
                                <Option value="sp">优惠券</Option>
                            </Select>
                            <Row class="margin-top-10 searchable-table-con1" justify="center" align="middle">
                                <div class="Box">
                                    <div class="basic-box">
                                        <div class="box1"><img src="" alt=""></div>
                                        <div class="box2">
                                            <h2>服务说明</h2>
                                            <p>说明说明说明说。。。</p>
                                            <Button size="large" type="primary" style="width: 100px" @click="model1 = true">查看详情</Button>
                                        </div>
                                    </div>
                                    <div class="basic-box">
                                        <div class="box1"><img src="" alt=""></div>
                                        <div class="box2">
                                            <h2>服务说明</h2>
                                            <p>说明说明说明说。。。</p>
                                            <Button size="large" type="primary" style="width: 100px">查看详情</Button>
                                        </div>
                                    </div>
                                    <div class="basic-box">
                                        <div class="box1"><img src="" alt=""></div>
                                        <div class="box2">
                                            <h2>服务说明</h2>
                                            <p>说明说明说明说。。。</p>
                                            <Button size="large" type="primary" style="width: 100px">查看详情</Button>
                                        </div>
                                    </div>
                                    <div class="basic-box">
                                        <div class="box1"><img src="" alt=""></div>
                                        <div class="box2">
                                            <h2>服务说明</h2>
                                            <p>说明说明说明说。。。</p>
                                            <Button size="large" type="primary" style="width: 100px">查看详情</Button>
                                        </div>
                                    </div>
                                </div>
                                <Modal
                                        v-model="model1"
                                        title="详情"
                                        @on-ok="ok"
                                        @on-cancel="cancel" width="1050px">
                                    <div class="expandRow-main">
                                        <div class="fl expandRow">
                                            <p class="clearfix"><strong>服务名称：</strong><span>xxx名称</span></p>
                                            <p class="clearfix"><strong>开始时间：</strong><span>2018-03-10  00:00:00</span></p>
                                        </div>
                                        <div class="fl expandRow">
                                            <p class="clearfix" style="text-indent: 2em"><strong>类型：</strong><span>xxx类型</span></p>
                                            <p class="clearfix"><strong>结束时间：</strong><span>2018-03-15  00:00:00    </span></p>
                                        </div>
                                    </div>
                                    <ul class="list">
                                        <li>
                                            <div class="list-content">
                                                <Checkbox v-model="one" class="check"></Checkbox>
                                                <div class="content-right">
                                                    <h2>一档</h2>
                                                    <h1>￥880</h1>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="list-content">
                                                <Checkbox v-model="two" class="check"></Checkbox>
                                                <div class="content-right">
                                                    <h2>一档</h2>
                                                    <h1>￥880</h1>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="list-content">
                                                <Checkbox v-model="three" class="check"></Checkbox>
                                                <div class="content-right">
                                                    <h2>一档</h2>
                                                    <h1>￥880</h1>
                                                </div>
                                            </div>
                                        </li><li>
                                        <div class="list-content">
                                            <Checkbox v-model="four" class="check"></Checkbox>
                                            <div class="content-right">
                                                <h2>一档</h2>
                                                <h1>￥880</h1>
                                            </div>
                                        </div>
                                    </li>
                                    </ul>
                                    <img src="../../../image/u13750.png" alt="" class="img1" v-if="one">
                                    <div v-if="one" class="explain">
                                        <span>说明:</span><div>说 明 说 明 说 明 说 明 说 明 说 明 说 明 说 明 说 明  说  明 说 明 说 明 说 明  说 明 说 明 说 明 说 明 说 明 说 明 说 明 说 明 说 明 说 明 说 明 说 明 说
                                        明 说 明 说 明 说 明 说 明 说 明 说 明 说 明</div>
                                    </div>
                                    <img src="../../../image/u13750.png" alt="" class="img2" v-if="two">
                                    <div v-if="two" class="explain">
                                        <span>说明:</span><div>说 明 说 明 说 明 说 明 说 明 说 明 说 明 说 明 说 明  说  明 说 明 说 明 说 明  说 明 说 明 说 明 说 明 说 明 说 明 说 明 说 明 说 明 说 明 说 明 说 明 说
                                        明 说 明 说 明 说 明 说 明 说 明 说 明 说 明</div>
                                    </div>
                                    <img src="../../../image/u13750.png" alt="" class="img3" v-if="three">
                                    <div v-if="three" class="explain">
                                        <span>说明:</span><div>说 明 说 明 说 明 说 明 说 明 说 明 说 明 说 明 说 明  说  明 说 明 说 明 说 明  说 明 说 明 说 明 说 明 说 明 说 明 说 明 说 明 说 明 说 明 说 明 说 明 说
                                        明 说 明 说 明 说 明 说 明 说 明 说 明 说 明</div>
                                    </div>
                                    <img src="../../../image/u13750.png" alt="" class="img4" v-if="four">
                                    <div v-if="four" class="explain">
                                        <span>说明:</span><div>说 明 说 明 说 明 说 明 说 明 说 明 说 明 说 明 说 明  说  明 说 明 说 明 说 明  说 明 说 明 说 明 说 明 说 明 说 明 说 明 说 明 说 明 说 明 说 明 说 明 说
                                        明 说 明 说 明 说 明 说 明 说 明 说 明 说 明</div>
                                    </div>
                                    <div class="buy"><Button type="primary" size="large" @click="modal1=true;model1=false;current=0">购买</Button></div>
                                </Modal>
                                <Modal
                                        v-model="modal1"
                                        title="确认订单"
                                        @on-ok="ok"
                                        @on-cancel="cancel" width="1000px">
                                    <Steps :current="current" class="steps" v-if="current != 2">
                                        <Step title="确认订单" style="width: 430px"></Step>
                                        <Step title="支付" style="width: 430px"></Step>
                                        <Step title="支付成功" style="width: 100px"></Step>
                                    </Steps>
                                    <div v-if="current == 0">
                                        <Row class="title T-title">
                                            <Col span="8" style="text-align: left">商品信息</Col>
                                            <Col span="8" style="text-align: center">数量</Col>
                                            <Col span="8" style="text-align: right">资费</Col>
                                        </Row>
                                        <Row class="cont T-title">
                                            <Col span="8" style="text-align: left">
                                            <p>服务名称: <span>名称名称名称</span></p>
                                            <p>类型: <span>名称名称名称</span></p>
                                            <p>服务时间: <span>2018-03-15  00:00:00 至 2019-03-15  00:00:00</span></p>
                                            </Col>
                                            <Col span="8" style="text-align: center">1</Col>
                                            <Col span="8" style="text-align: right">￥10000</Col>
                                        </Row>
                                        <p class="money">实付款: <span>￥10000</span></p>
                                        <div style="clear: both"></div>
                                        <Button type="warning" @click="next" class="go_pay">去支付</Button>
                                        <div style="clear: both"></div>
                                    </div>
                                    <div v-if="current == 1">
                                        <Row class="title T-title">
                                            <Col span="8" style="text-align: left">商品信息</Col>
                                            <Col span="8" style="text-align: center">数量</Col>
                                            <Col span="8" style="text-align: right">资费</Col>
                                        </Row>
                                        <Row class="cont T-title">
                                            <Col span="8" style="text-align: left">
                                                <p>服务名称: <span>名称名称名称</span></p>
                                                <p>类型: <span>名称名称名称</span></p>
                                                <p>分类: <span>名称名称名称</span></p>
                                                <p>可上商品数: <span>名称名称名称</span></p>
                                                <p>服务时间: <span>2018-03-15  00:00:00 至 2019-03-15  00:00:00</span></p>
                                            </Col>
                                            <Col span="8" style="text-align: center">1</Col>
                                            <Col span="8" style="text-align: right">￥10000</Col>
                                        </Row>
                                        <Row class="pay-for T-title">
                                            <Col span="12">支付方式</Col>
                                            <Col span="12" style="text-align: right">实付款: <span style="color: rgba(255, 102, 0, 1)">￥10000</span></Col>
                                        </Row>
                                        <Row class="Pay_ment T-title">
                                            <Col span="12">
                                                <div class="payment">
                                                    <div class="payment_a">
                                                        <div class="img"></div>
                                                        <p>扫一扫付款</p>
                                                    </div>
                                                    <div class="payment_a">
                                                        <div class="img"></div>
                                                        <p>扫一扫付款</p>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col span="12" style="text-align: right"></Col>
                                        </Row>
                                        <Button type="warning" @click="next" class="go_pay">去支付</Button>
                                        <div style="clear: both"></div>
                                    </div>
                                    <div v-if="current == 2" class="success_tab">
                                        <div class="success success_left">
                                            <img src="" alt="">
                                        </div>
                                        <div class="success success_right">
                                            <h1>恭喜您  购买成功</h1>
                                            <p>30秒后返回列表</p>
                                            <Button type="primary" @click="ivew">查看</Button>
                                        </div>
                                    </div>
                                </Modal>
                            </Row>
                            </div>
                        </TabPane>
                        <TabPane label="已参与的服务" name="name2">
                            <div v-if="name == 'name2'">
                            <Row class='fl margin-right-10'>
                                <Input v-model="searchName" icon="search" placeholder="服务名称" style="width: 200px"/>
                            </Row>
                                <Select class='fl margin-right-10' style="width:150px" placeholder='服务类型'>
                                    <Option value="sp">商品</Option>
                                    <Option value="sp">店铺</Option>
                                    <Option value="sp">优惠券</Option>
                                </Select>
                            <Row class="margin-top-10 searchable-table-con1" justify="center" align="middle">
                                <div class="Box">
                                    <div class="basic-box">
                                        <div class="box1"><img src="" alt=""></div>
                                        <div class="box2">
                                            <h2>服务说明</h2>
                                            <p>说明说明说明说。。。</p>
                                            <Button size="large" type="primary" style="width: 100px" @click="model2 = true">查看详情</Button>
                                        </div>
                                    </div>
                                    <div class="basic-box">
                                        <div class="box1"><img src="" alt=""></div>
                                        <div class="box2">
                                            <h2>服务说明</h2>
                                            <p>说明说明说明说。。。</p>
                                            <Button size="large" type="primary" style="width: 100px">查看详情</Button>
                                        </div>
                                    </div>
                                    <div class="basic-box">
                                        <div class="box1"><img src="" alt=""></div>
                                        <div class="box2">
                                            <h2>服务说明</h2>
                                            <p>说明说明说明说。。。</p>
                                            <Button size="large" type="primary" style="width: 100px">查看详情</Button>
                                        </div>
                                    </div>
                                    <div class="basic-box">
                                        <div class="box1"><img src="" alt=""></div>
                                        <div class="box2">
                                            <h2>服务说明</h2>
                                            <p>说明说明说明说。。。</p>
                                            <Button size="large" type="primary" style="width: 100px">查看详情</Button>
                                        </div>
                                    </div>
                                </div>
                                <Modal
                                        v-model="model2"
                                        title="详情"
                                        @on-ok="ok"
                                        @on-cancel="cancel" width="1050px">
                                    <div class="expandRow-main">
                                        <div class="fl expandRow">
                                            <p class="clearfix"><strong>服务名称：</strong><span>xxx名称</span></p>
                                            <p class="clearfix"><strong>开始时间：</strong><span>2018-03-10  00:00:00</span></p>
                                        </div>
                                        <div class="fl expandRow">
                                            <p class="clearfix" style="text-indent: 2em"><strong>类型：</strong><span>xxx类型</span></p>
                                            <p class="clearfix"><strong>结束时间：</strong><span>2018-03-15  00:00:00    </span></p>
                                        </div>
                                    </div>
                                    <p class="clearfix" style="text-indent: 2em"><strong>分类：</strong><span class="spacing">分类一</span><span class="spacing">分类一</span><span class="spacing">分类一</span><span class="spacing">分类一</span><span class="spacing">分类一</span></p>
                                    <p class="clearfix" style="text-indent: 2em"><strong>说明：</strong><span style="text-indent: 2em">说 明 说 明 说 明 说 明 说 明 说 明 说 明 说 明 说 明  说  明 说 明 说 明 说 明  说 明 说 明 说 明 说 明 说 明 说 明 说 明 说 明 说 明 说 明 说 明 说 明 说
                                        明 说 明 说 明 说 明 说 明 说 明 说 明 说 明</span></p>
                                    <Tabs value="name1" style="margin-top: 10px">
                                        <TabPane label="选择商品">
                                            <Card class='clearfix'>
                                                <ul class="List">
                                                    <li>
                                                        <div class="A_content">
                                                            <Checkbox class="check"></Checkbox>
                                                            <div class="Content">
                                                                <div class="content-left">
                                                                    <img src="" alt="">
                                                                </div>
                                                                <div class="content-right">
                                                                    <p>数据线</p>
                                                                    <p>20<span>100</span></p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div class="A_content">
                                                            <Checkbox class="check"></Checkbox>
                                                            <div class="Content">
                                                                <div class="content-left">
                                                                    <img src="" alt="">
                                                                </div>
                                                                <div class="content-right">
                                                                    <p>数据线</p>
                                                                    <p>20<span>100</span></p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div class="A_content">
                                                            <Checkbox class="check"></Checkbox>
                                                            <div class="Content">
                                                                <div class="content-left">
                                                                    <img src="" alt="">
                                                                </div>
                                                                <div class="content-right">
                                                                    <p>数据线</p>
                                                                    <p>20<span>100</span></p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div class="A_content">
                                                            <Checkbox class="check"></Checkbox>
                                                            <div class="Content">
                                                                <div class="content-left">
                                                                    <img src="" alt="">
                                                                </div>
                                                                <div class="content-right">
                                                                    <p>数据线</p>
                                                                    <p>20<span>100</span></p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                                <div style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;">
                                                    <Checkbox
                                                            :indeterminate="indeterminate"
                                                            :value="checkAll"
                                                            @click.prevent.native="handleCheckAll" style="margin-left: 10px">全选</Checkbox>
                                                    <Button type="error" size="small">删除</Button>
                                                    <Button type="primary" size="small">添加</Button>
                                                </div>
                                            </Card>
                                        </TabPane>
                                        <TabPane label="已选择商品">
                                            <Card class='clearfix'>
                                                <ul class="List">
                                                    <li>
                                                        <div class="A_content">
                                                            <Checkbox class="check"></Checkbox>
                                                            <div class="Content">
                                                                <div class="content-left">
                                                                    <img src="" alt="">
                                                                </div>
                                                                <div class="content-right">
                                                                    <p>数据线</p>
                                                                    <p>20<span>100</span></p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div class="A_content">
                                                            <Checkbox class="check"></Checkbox>
                                                            <div class="Content">
                                                                <div class="content-left">
                                                                    <img src="" alt="">
                                                                </div>
                                                                <div class="content-right">
                                                                    <p>数据线</p>
                                                                    <p>20<span>100</span></p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div class="A_content">
                                                            <Checkbox class="check"></Checkbox>
                                                            <div class="Content">
                                                                <div class="content-left">
                                                                    <img src="" alt="">
                                                                </div>
                                                                <div class="content-right">
                                                                    <p>数据线</p>
                                                                    <p>20<span>100</span></p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div class="A_content">
                                                            <Checkbox class="check"></Checkbox>
                                                            <div class="Content">
                                                                <div class="content-left">
                                                                    <img src="" alt="">
                                                                </div>
                                                                <div class="content-right">
                                                                    <p>数据线</p>
                                                                    <p>20<span>100</span></p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                                <div style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;">
                                                    <Checkbox
                                                            :indeterminate="indeterminate"
                                                            :value="checkAll"
                                                            @click.prevent.native="handleCheckAll" style="margin-left: 10px">全选</Checkbox>
                                                    <Button type="error" size="small">删除</Button>
                                                </div>
                                            </Card>
                                        </TabPane>
                                    </Tabs>
                                </Modal>
                            </Row>
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
            </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
    export default {
        name: 'basic-service',
        data () {
            return {
                searchName: '',
                model1: false,
                model2: false,
                modal1: false,
                indeterminate: true,
                checkAll: false,
                checkAllGroup: ['香蕉', '西瓜'],
                isShow: false,
                isShow1: false,
                one: false,
                two: false,
                three: false,
                four: false,
                current: 0,
                name: 'name1'
            };
        },
        methods: {
            ok () {
                this.$Message.info('Clicked ok');
            },
            cancel () {
                this.$Message.info('Clicked cancel');
            },
            handleCheckAll () {
                if (this.indeterminate) {
                    this.checkAll = false;
                } else {
                    this.checkAll = !this.checkAll;
                }
                this.indeterminate = false;

                if (this.checkAll) {
                    this.checkAllGroup = ['香蕉', '苹果', '西瓜'];
                } else {
                    this.checkAllGroup = [];
                }
            },
            next () {
                if (this.current ==  2) {
                    this.current = 0;
                } else {
                    this.current += 1;
                }
            },
            ivew () {
                this.name = 'name2';
                this.modal1 = false;
                console.log(this.name);
            },
            contentData (val) {
                this.name = val;
                console.log(val);
            }
        }
    };
</script>

<style scoped lang="less">
    @import "../basic-service/basic-service";
    @import '../../../styles/common.less';
    @import "./added-service";
</style>
