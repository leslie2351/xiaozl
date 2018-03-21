<template>
    <div>
        <Row>
            <Col span="24">
            <Card class='clearfix' style="margin:1px">
                <div class="margin-bottom-10 clearfix">
                    <div style="overflow: hidden"><Button type="primary" style="float: right"  @click="modal1 = true">添加模板</Button></div>
                    <div class="box">
                        <Row class="banner">
                            <Col span="12" style="text-align: left">模板类型：重量算运费</Col>
                            <Col span="12" style="text-align: right" class="edit">
                                <Button type="primary" size="small" @click="modal2 = true">编辑</Button>
                                <Button type="error" size="small">删除</Button>
                            </Col>
                        </Row>
                        <Row class="content">
                            <Col span="5" order="4" class="col-span">模板名称</Col>
                            <Col span="5" order="3" class="col-span">首重（kg）</Col>
                            <Col span="5" order="2" class="col-span">运费（元）</Col>
                            <Col span="5" order="1" class="col-span">续重（kg）</Col>
                            <Col span="4" order="1" class="col-span">续重运费（元）</Col>
                        </Row>
                        <Row class="content">
                            <Col span="5" order="4" class="col-span">名称一</Col>
                            <Col span="5" order="3" class="col-span">8kg</Col>
                            <Col span="5" order="2" class="col-span">10</Col>
                            <Col span="5" order="1" class="col-span">8kg</Col>
                            <Col span="4" order="1" class="col-span">10</Col>
                        </Row>
                    </div>
                    <div class="box">
                        <Row class="banner">
                            <Col span="12" style="text-align: left">模板类型：计件算运费</Col>
                            <Col span="12" style="text-align: right" class="edit">
                                <Button type="primary" size="small" @click="modal2 = true">编辑</Button>
                                <Button type="error" size="small">删除</Button>
                            </Col>
                        </Row>
                        <Row class="content">
                            <Col span="5" order="4" class="col-span">模板名称</Col>
                            <Col span="5" order="3" class="col-span">首件（个）</Col>
                            <Col span="5" order="2" class="col-span">运费（元）</Col>
                            <Col span="5" order="1" class="col-span">续件（个）</Col>
                            <Col span="4" order="1" class="col-span">续件运费（元）</Col>
                        </Row>
                        <Row class="content">
                            <Col span="5" order="4" class="col-span">名称一</Col>
                            <Col span="5" order="3" class="col-span">8kg</Col>
                            <Col span="5" order="2" class="col-span">10</Col>
                            <Col span="5" order="1" class="col-span">8kg</Col>
                            <Col span="4" order="1" class="col-span">10</Col>
                        </Row>
                    </div>
                    <Modal
                            v-model="modal1"
                            title="添加模板"
                            @on-ok="ok"
                            @on-cancel="cancel" width="800px">
                        <div class="expandRow-main clearfix" style='margin-bottom:50px'>
                            <div class="fl expandRow">
                                <p class="clearfix"><strong>模板类型：</strong><RadioGroup v-model="Radio">
                                    <Radio label="1">重量算运费</Radio>
                                    <Radio label="2" style="margin-left: 40px">计件算运费</Radio>
                                </RadioGroup></p>
                                <div v-if="Radio != 2">
                                    <p class="clearfix"><strong>模板名称：</strong><Input placeholder="输入名称" clearable style="width: 400px"></Input></p>
                                    <p class="clearfix"><strong>首重：</strong><Input placeholder="kg" clearable style="width: 400px"></Input></p>
                                    <p class="clearfix"><strong>运费：</strong><Input placeholder="元" clearable style="width: 400px"></Input></p>
                                    <p class="clearfix"><strong>续重：</strong><Input placeholder="kg" clearable style="width: 400px"></Input></p>
                                    <p class="clearfix"><strong>续重运费：</strong><Input placeholder="元" clearable style="width: 400px"></Input></p>
                                    <p class="clearfix address"><strong>配送地区：</strong>
                                        <Transfer
                                                :data="data1"
                                                :target-keys="targetKeys1"
                                                :render-format="render1"
                                                @on-change="handleChange1"></Transfer>
                                    </p>
                                </div>
                                <div v-if="Radio == 2">
                                    <p class="clearfix"><strong>模板名称：</strong><Input placeholder="输入名称" clearable style="width: 400px"></Input></p>
                                    <p class="clearfix"><strong>首件：</strong><Input placeholder="个" clearable style="width: 400px"></Input></p>
                                    <p class="clearfix"><strong>运费：</strong><Input placeholder="元" clearable style="width: 400px"></Input></p>
                                    <p class="clearfix"><strong>续件：</strong><Input placeholder="个" clearable style="width: 400px"></Input></p>
                                    <p class="clearfix"><strong>续件运费：</strong><Input placeholder="元" clearable style="width: 400px"></Input></p>
                                    <p class="clearfix address"><strong>配送地区：</strong>
                                        <Transfer
                                                :data="data1"
                                                :target-keys="targetKeys1"
                                                :render-format="render1"
                                                @on-change="handleChange1"></Transfer>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Modal>
                    <Modal
                            v-model="modal2"
                            title="添加模板"
                            @on-ok="ok1"
                            @on-cancel="cancel1" width="800px">
                        <div class="expandRow-main clearfix" style='margin-bottom:50px'>
                            <div class="fl expandRow">
                                <p class="clearfix"><strong>模板类型：</strong><RadioGroup v-model="Radio1">
                                    <Radio label="1">重量算运费</Radio>
                                    <Radio label="2" style="margin-left: 40px">计件算运费</Radio>
                                </RadioGroup></p>
                                <div v-if="Radio1 != 2">
                                    <p class="clearfix"><strong>模板名称：</strong><Input placeholder="输入名称" clearable style="width: 400px"></Input></p>
                                    <p class="clearfix"><strong>首重：</strong><Input placeholder="kg" clearable style="width:400px"></Input></p>
                                    <p class="clearfix"><strong>运费：</strong><Input placeholder="元" clearable style="width: 400px"></Input></p>
                                    <p class="clearfix"><strong>续重：</strong><Input placeholder="kg" clearable style="width: 400px"></Input></p>
                                    <p class="clearfix"><strong>续重运费：</strong><Input placeholder="元" clearable style="width: 400px"></Input></p>
                                    <p class="clearfix address"><strong>配送地区：</strong>
                                        <!--<Transfer-->
                                                <!--:data="data1"-->
                                                <!--:target-keys="targetKeys1"-->
                                                <!--:render-format="render1"-->
                                                <!--@on-change="handleChange1"></Transfer>-->
                                        <Tree :data="data2" show-checkbox></Tree>
                                    </p>
                                </div>
                                <div v-if="Radio1 == 2">
                                    <p class="clearfix"><strong>模板名称：</strong><Input placeholder="输入名称" clearable style="width: 400px"></Input></p>
                                    <p class="clearfix"><strong>首件：</strong><Input placeholder="个" clearable style="width: 400px"></Input></p>
                                    <p class="clearfix"><strong>运费：</strong><Input placeholder="元" clearable style="width: 400px"></Input></p>
                                    <p class="clearfix"><strong>续件：</strong><Input placeholder="个" clearable style="width: 400px"></Input></p>
                                    <p class="clearfix"><strong>续件运费：</strong><Input placeholder="元" clearable style="width: 400px"></Input></p>
                                    <p class="clearfix address"><strong>配送地区：</strong>
                                        <Transfer
                                                :data="data1"
                                                :target-keys="targetKeys1"
                                                :render-format="render1"
                                                @on-change="handleChange1"></Transfer>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Modal>
                </div>
            </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
    export default {
        name: 'tab2',
        data () {
            return {
                modal1: false,
                modal2: false,
                Radio: 0,
                Radio1: 0,
                data1: this.getMockData(),
                targetKeys1: this.getTargetKeys(),
                data2: [
                    {
                        title: 'parent 1',
                        expand: true,
                        children: [
                            {
                                title: 'parent 1-1',
                                expand: true,
                                children: [
                                    {
                                        title: 'leaf 1-1-1'
                                    },
                                    {
                                        title: 'leaf 1-1-2'
                                    }
                                ]
                            },
                            {
                                title: 'parent 1-2',
                                expand: true,
                                children: [
                                    {
                                        title: 'leaf 1-2-1'
                                    },
                                    {
                                        title: 'leaf 1-2-1'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            };
        },
        methods: {
            ok () {
                this.$Message.info('添加成功');
            },
            cancel () {
                this.$Message.info('添加失败');
            },
            ok1 () {
                this.$Message.info('添加成功');
            },
            cancel1 () {
                this.$Message.info('添加失败');
            },
            getMockData () {
                let mockData = [];
                for (let i = 1; i <= 20; i++) {
                    mockData.push({
                        key: i.toString(),
                        label: 'Content ' + i,
                        description: 'The desc of content' + i,
                        disabled: Math.random() * 3 < 1
                    });
                }
                return mockData;
            },
            getTargetKeys () {
                return this.getMockData()
                    .filter(() => Math.random() * 2 > 1)
                    .map(item => item.key);
            },
            render1 (item) {
                return item.label;
            },
            handleChange1 (newTargetKeys, direction, moveKeys) {
                console.log(newTargetKeys);
                console.log(direction);
                console.log(moveKeys);
                this.targetKeys1 = newTargetKeys;
            }
        }
    };
</script>

<style scoped lang="less">
    @import '../../../../styles/common.less';
    @import './tab2.less';
</style>
