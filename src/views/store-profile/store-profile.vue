<style lang="less">
    @import "./store-profile.less";
    @import "../../styles/common.less";
</style>
<template>
    <div class="store-proFile">
        <tab1 class="margin-bottom-10"></tab1>
        <tab2 class="margin-bottom-10"></tab2>
        <tab3 class="margin-bottom-10"></tab3>
        <tab4></tab4>
    </div>
</template>

<script>
import tab1 from './component/tab1/tab1'
import tab2 from './component/tab2/tab2'
import tab3 from './component/tab3/tab3'
import tab4 from './component/tab4/tab4'
export default {
    name: 'home',
    components: {
        tab1,
        tab2,
        tab3,
        tab4,
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