<style lang="less">
    @import "../../store-profile.less";
    @import "../../../../styles/common.less";
</style>
<template>
        <Row :gutter="10">
            <Card style="width:99.5%; margin:0 auto;">
                    <h3 style="padding-bottom:20px;">商家信息</h3>
                    <div class="clearfix" style="padding-left:10px;">
                        <div class="fl merchant" style="width:50%;">
                            <div>
                                <span class="merchant_name fl">企业名称：</span>
                                <span>山西世纪兄妹有限公司</span>
                            </div>
                            <div>
                                <span class="merchant_name fl">企业性质：</span>
                                <span>山西世纪兄妹有限公司</span>
                            </div>
                            <div>
                                <span class="merchant_name fl">法定代表人：</span>
                                <span>山西世纪兄妹有限公司</span>
                            </div>
                            <div>
                                <span class="merchant_name fl">法人身份证号：</span>
                                <span>140222523636322211</span>
                            </div>
                            <div>
                                <span class="merchant_name fl">企业所在详细地址：</span>
                                <span>山西省  太原市  迎泽区 智慧产业园B座</span>
                            </div>
                        </div>
                        <div class="fr merchant " style="width:50%;">
                            <div>
                                <span class="merchant_name fl">银行开户行：</span>
                                <span>140222523636322211</span>
                            </div>
                            <div>
                                <span class="merchant_name fl">银行卡号：</span>
                                <span>山西世纪兄妹有限公司</span>
                            </div>
                            <div>
                                <span class="merchant_name fl">开户行名称：</span>
                                <span>山西世纪兄妹有限公司</span>
                            </div>
                            <div>
                                <span class="merchant_name fl">支行联行号：</span>
                                <span>140222523636322211</span>
                            </div>

                        </div>
                    </div>
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


        };
    },
    computed: {
  
    },
    methods: {

    }
};
</script>