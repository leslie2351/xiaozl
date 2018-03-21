<template>
    <div>
        <Row>
            <Col span="24">
            <Card class='clearfix'>
                <div class="margin-bottom-10 clearfix">
                    <Tabs>
                        <TabPane label="全部服务">
                            <Row class='fl margin-right-10'>
                                <Input v-model="searchName" icon="search" placeholder="活动名称" style="width: 200px"/>
                            </Row>
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
                                    <p class="clearfix" style="text-indent: 2em"><strong>分类：</strong><span class="spacing">分类一</span><span class="spacing">分类一</span><span class="spacing">分类一</span><span class="spacing">分类一</span><span class="spacing">分类一</span></p>
                                    <p class="clearfix" style="text-indent: 2em"><strong>说明：</strong><span style="text-indent: 2em">说 明 说 明 说 明 说 明 说 明 说 明 说 明 说 明 说 明  说  明 说 明 说 明 说 明  说 明 说 明 说 明 说 明 说 明 说 明 说 明 说 明 说 明 说 明 说 明 说 明 说
                                        明 说 明 说 明 说 明 说 明 说 明 说 明 说 明</span></p>
                                    <div class="Button">
                                        <Button type="primary" size="small" @click="isShow = true">参与</Button>
                                        <Button type="error" size="small">取消</Button>
                                    </div>
                                    <Tabs value="name1" v-if="isShow">
                                        <TabPane label="选择商品" name="name1">
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
                                        <TabPane label="已选择商品" name="name2">
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
                        </TabPane>
                        <TabPane label="已参与的服务">
                            <Row class='fl margin-right-10'>
                                <Input v-model="searchName" icon="search" placeholder="服务名称" style="width: 200px"/>
                            </Row>
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
                                        <TabPane label="选择商品" name="name1">
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
                                        <TabPane label="已选择商品" name="name2">
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
                indeterminate: true,
                checkAll: false,
                checkAllGroup: ['香蕉', '西瓜'],
                isShow: false,
                isShow1: false
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
            }
        }
    };
</script>

<style scoped lang="less">
    @import "./basic-service";
</style>
