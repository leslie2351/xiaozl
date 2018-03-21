<template>
    <div>
        <Row>
            <Col span="24">
            <Card class='clearfix'>
                <div class="margin-bottom-10 clearfix">
                    <Row class='fl margin-right-10'>
                        <Input icon="search"  placeholder="物流公司" style="width: 200px" v-model="searchName"/>
                    </Row>
                    状态：<Select v-model="model1" style="width:200px">
                        <Option v-for="item in statusType" :value="item.dictName" :key="item.dictCode">{{ item.dictName }}</Option>
                    </Select>
                </div>
                <Row class="margin-top-10 searchable-table-con1" justify="center" align="middle">
                    <Table border :columns="logisticsColumns" :data="logisticsData" type="content"></Table>
                    <!--<Page :total=total size="small" class='fr margin-top-20' show-elevator show-sizer show-total-->
                    <!--@on-change = 'changePage' @on-page-size-change='changePageSize' placement='top'></Page>-->
                </Row>
            </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
    export default {
        name: 'tab1',
        data () {
            return {
                searchName: '',
                model1: '',
                logisticsColumns: [
                    {
                        title: '公司名称',
                        align: 'center',
                        key: 'Name'
                    },
                    {
                        title: '状态',
                        align: 'center',
                        key: 'status'
                    },
                    {
                        title: '操作',
                        align: 'center',
                        key: 'operation',
                        render: (h, params) => {
                            return h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        let row = params.row
                                        // this.storeId = row.id
                                        let argu = {outstanding_id: row.id};
                                        this.$router.push({
                                            name: 'rights-set',
                                            params: argu
                                        });
                                    }
                                }
                            }, '关闭');
                        }
                    }
                ],
                logisticsData: [
                    {
                        Name: 'leslie',
                        status: '开启'
                    }
                ],
                statusType: [
                    {
                        dictName: '开启',
                        dictCode: 1
                    },
                    {
                        dictName: '未开启',
                        dictCode: 2
                    }
                ]
            };
        }
    };
</script>

<style scoped lang="less">
    @import '../../../../styles/common.less';
</style>
