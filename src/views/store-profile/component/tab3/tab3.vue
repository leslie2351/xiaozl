<style lang="less">
    @import "./tab3.less";
    @import "../../../../styles/common.less";
</style>
<template>
        <Row :gutter="10">
            <Card style="width:99.5%; margin:0 auto;">
                    <h3 style="padding-bottom:20px;">认证信息</h3>
                    <div class="clearfix flex" style="padding-left:10px;">
                        <div style="width:25%;text-align: center;">
                            <div class="tabImgDiv">
                                <img class="avator-img" :src="avatorPath" />
                            </div>
                            <div class="padding-top-20">生产许可证</div>
                        </div>
                        <div style="width:25%;text-align: center;">
                            <div class="tabImgDiv">
                                <img class="avator-img" :src="avatorPath" />
                            </div>
                            <div class="padding-top-20">商标注册证</div>
                        </div>
                        <div style="width:25%;text-align: center;">
                            <div class="tabImgDiv">
                                <img class="avator-img" :src="avatorPath" />
                            </div>
                            <div class="padding-top-20">卫生生产许可证</div>
                        </div>
                        <div style="width:25%;text-align: center;">
                            <div class="tabImgDiv">
                                <img class="avator-img" :src="avatorPath" />
                            </div>
                            <div class="padding-top-20">授权文件</div>
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
        avatorPath () {
            return localStorage.avatorImgPath;
        }
    },
    methods: {

    }
};
</script>