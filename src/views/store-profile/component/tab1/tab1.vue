<style lang="less">
    @import "../../store-profile.less";
    @import "../../../../styles/common.less";
</style>
<template>
        <Row :gutter="10">
            <Card style="width:99.5%; margin:0 auto;">
                    <h3 style="padding-bottom:10px;">店铺信息</h3>
                    <div class="clearfix">
                        <div style="width:50%;padding-bottom:20px;" class="clearfix fl">

                                <div class="imgDiv fl">
                                    <img class="avator-img" :src="avatorPath" />
                                </div>
  
                                <div class="store-info fl">
                                    <div class="clearfix">
                                        <b class="card-user-infor-name fl">赵小姐的店</b>
                                        <p class="fl padding-left-20" style=" line-height:42px; ">（店铺评分  100）</p>
                                    </div>
                                    <div class="clearfix">
                                        <span class="fl" style=" line-height:32px; ">创建时间 ： 2015-07-11  11:11:13</span>
                                        <div class="fl padding-left-20" style=" line-height:32px; ">
                                            店铺类型：<span>普通店铺</span>
                                        </div>
                                    </div>
                                    <div class="clearfix">
                                        <span class="fl" style=" line-height:32px;width:75px; ">店铺简介 ：</span>
                                        <div class="fl" style=" line-height:32px; width:285px;">
                                            介简介简介简介简介简介简介简介简介简介简介简介简简介简介简介简介简介简介简介介
                                        </div>
                                    </div>
                                </div>

                        </div>
                        <div style="width:50%;padding-bottom:20px;" class="clearfix fl">
                          <h4 style="padding-left:10%;" class="margin-bottom-10">店铺动态评分</h4>
                            <div>
                                <div style="width:33%; text-align:center;" class="fl">
                                    <i-circle :percent="100">
                                        <span class="demo-Circle-inner" style="font-size:24px">5分</span>
                                    </i-circle>
                                    <div>描述相符</div>
                                </div>
                                <div style="width:33%; text-align:center;" class="fl">
                                    <i-circle :percent="80" stroke-color="#5cb85c">
                                        <span class="demo-Circle-inner" style="font-size:24px">4分</span>
                                    </i-circle>
                                    <div>物流服务</div>
                                </div>
                                <div style="width:33%; text-align:center;" class="fl">
                                    <i-circle :percent="80" stroke-color="#ff5500">
                                        <span class="demo-Circle-inner" style="font-size:24px">4分</span>
                                    </i-circle>
                                    <div>服务态度</div>
                                </div>
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
        avatorPath () {
            return localStorage.avatorImgPath;
        }
    },
    methods: {

    }
};
</script>