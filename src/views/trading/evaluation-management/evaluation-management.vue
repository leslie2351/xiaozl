<template>
    <div>
        <Row>
            <Col span="24">
                <Card class='clearfix'>
                    <div class="margin-bottom-10 clearfix">
                        <Row class='fl margin-right-10'>
                            <Input icon="search"  placeholder="买家账号/商品名称" style="width: 200px" v-model="searchName" @on-click="headleSeach"/>
                        </Row>
                        <Select class='fl margin-right-10' style="width:150px" placeholder='评价类型' v-model="model1" @on-change="sellType1">
                            <Option v-for="item in evaluationType" :value="item.dictName" :key="item.dictCode">{{ item.dictName }}</Option>
                        </Select>
                        <Select class='fl margin-right-10' style="width:150px" placeholder='回复状态' v-model="model2" @on-change="sellType2">
                            <Option v-for="item in replyType" :value="item.dictName" :key="item.dictCode">{{ item.dictName }}</Option>
                        </Select>
                    </div>
                    <Row class="margin-top-10 searchable-table-con1" justify="center" align="middle">
                    <Table border :columns="evaluationColumns" :data="evaluationData" type="content"></Table>
                        <Page :total=total size="small" class='fr margin-top-20' show-elevator show-sizer show-total
                              @on-change = 'changePage' @on-page-size-change='changePageSize' placement='top'></Page>
                    <Modal
                        v-model="modal1"
                        title="回复"
                        @on-ok="replyOk"
                        @on-cancel="cancel">
                      <Input v-model="replyContent" placeholder="请输入内容" style="width: 470px"></Input>
                    </Modal>
                </Row>
                </Card>
            </Col>
        </Row>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                model1: '',
                model2: '',
                modal1: false,
                searchName: '',
                replyContent: '',
                id: '2',
                replyId: '',
                replyStateName: '',
                code1: '',
                code2: '',
                total: 0,
                current: '',
                pageSize: '',
                evaluationColumns: [
                    {
                        title: '商品名称',
                        key: 'goodsName',
                        align: 'center',
                        width: '120px'
                    },
                    {
                        title: '评价内容',
                        key: 'evaluateContent',
                        align: 'center'
                    },
                    {
                        title: '评价时间',
                        key: 'evaluateDate',
                        align: 'center'
                    },
                    {
                        title: '评价星级',
                        key: 'goodsStarLevel',
                        align: 'center',
                        width: '170px',
                        render: (h, params) => {
                            let row = params.row
                            return h('Rate', {
                                props: {
                                    value: row.goodsStarLevel,
                                    disabled: true
                                }
                            });
                        }
                    },
                    {
                        title: '买家账号',
                        key: 'userName',
                        align: 'center',
                        width: '120px'
                    },
                    {
                        title: '回复评价内容',
                        key: 'replyContent',
                        align: 'center'
                    },
                    {
                        title: '回复评价时间',
                        key: 'replyDate',
                        align: 'center'
                    },
                    {
                        title: '回复评价状态',
                        key: 'replyStateName',
                        align: 'center'
                    },
                    {
                        title: '操作',
                        key: 'operation',
                        align: 'center',
                        width: '100px',
                        render: (h, params) => {
                            if (params.row.replyState == '1') {
                                return h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '10px'
                                    },
                                    on: {
                                        click: () => {
                                            this.modal1 = true;
                                            this.replyContent = params.row.evaluateContent;
                                            this.replyId = params.row.id;
                                            this.replyStateName = params.row.replyStateName;
                                        }
                                    }
                                }, '回复');
                            }
                        }
                    }
                ],
                evaluationData: [],
                evaluationType: [
                    {
                        dictName: '全部',
                        dictCode: null
                    }
                ],
                replyType: [
                    {
                        dictName: '全部',
                        dictCode: null
                    }
                ]
            };
        },
        methods: {
            replyOk () {
                this.$http.post('http://192.168.5.15:8080/goodsEvaluate/updateGoodsEvaluate', {
                    id: this.replyId,
                    replyContent: this.replyContent,
                    replyStateName: this.replyStateName
                }).then((response) => {
                    console.log(response);
                    if (response.data.result == 1) {
                        this.$Message.info('回复成功');
                        this.replyStateName = '已回复';
                    }
                }).catch((response) => {
                    console.log(response);
                });
            },
            cancel () {
                this.$Message.info('回复失败');
            },
            tableData () { // 初始化订单列表
                this.$http.post('http://192.168.5.15:8080/goodsEvaluate/PageGoodsEvaluate', {
                    storeId: this.id
                }).then((response) => {
                    console.log(response);
                    this.evaluationData = response.data.list;
                    this.total = response.data.total;
                    this.pageSize = response.data.pageSize;
                }).catch((response) => {
                    console.log(response);
                });
            },
            headleSeach () { // 搜索
                // console.log(val)
                this.$http.post('http://192.168.5.15:8080/goodsEvaluate/PageGoodsEvaluate', {
                    storeId: this.id,
                    allQuery: this.searchName
                }).then((response) => {
                    this.evaluationData = response.data.list;
                }).catch((response) => {
                    console.log(response);
                });
            },
            filterType () { // 初始化筛选列表
                this.$http.post('http://192.168.5.15:8080/systemDict/selectDictType', {
                    dictType: "'evaluate_type','reply_state'"
                }).then((response) => {
                    console.log(response);
                    response.data.forEach(item => {
                        if (item.dictType === 'evaluate_type') {
                            this.evaluationType.push(item);
                        }
                        if (item.dictType === 'reply_state') {
                            this.replyType.push(item);
                        }
                    });
                    // this.replyType = response.data;
                    // console.log(this.replyType);
                }).catch((response) => {
                    console.log(response);
                });
            },
            sellType1 (val) { // 筛选评价类型
                this.evaluationType.forEach((item, index) => {
                    if (item.dictName === val) {
                        this.code1 = item.dictCode;
                    }
                });
                this.$http.post('http://192.168.5.15:8080/goodsEvaluate/PageGoodsEvaluate', {
                    storeId: this.id,
                    evaluateType: this.code1
                }).then((response) => {
                    console.log(response);
                    this.evaluationData = response.data.list;
                }).catch((response) => {
                    console.log(response);
                });
            },
            sellType2 (val) { // 筛选评价类型
                this.replyType.forEach((item, index) => {
                    if (item.dictName === val) {
                        this.code2 = item.dictCode;
                    }
                });
                this.$http.post('http://192.168.5.15:8080/goodsEvaluate/PageGoodsEvaluate', {
                    storeId: this.id,
                    replyState: this.code2
                }).then((response) => {
                    console.log(response);
                    this.evaluationData = response.data.list;
                }).catch((response) => {
                    console.log(response);
                });
            },
            changePage (val) { // 切换页码
                console.log(val)
                this.current = val
                this.tableData();
            },
            changePageSize (val) { // 改变每页显示条数
                this.pageSize = val
                this.tableData();
            }
        },
        mounted () {
            this.tableData();
            this.filterType();
        }
    };
</script>
<style scoped lang="less">
     @import '../../../styles/common.less';
</style>
