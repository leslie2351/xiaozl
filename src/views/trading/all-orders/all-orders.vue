<template>
        <Card>
            <!-- <Tabs :animated='false'> -->
            <Tabs @on-click='btn'>
                <TabPane label="全部"><tab8 v-if='name == 0'></tab8></TabPane>
                <TabPane label="待付款"><tab1 v-if='name == 1'></tab1></TabPane>
                <TabPane label="待发货"><tab2 v-if='name == 2'></tab2></TabPane>
                <TabPane label="待收货"><tab3 v-if='name == 3'></tab3></TabPane>
                <TabPane label="已完成"><tab4 v-if='name == 4'></tab4></TabPane>
                <TabPane label="已取消"><tab5 v-if='name == 5'></tab5></TabPane>
                <TabPane label="售后中"><tab6 v-if='name == 6'></tab6></TabPane>
                <TabPane label="售后已完成"><tab7 v-if='name == 7'></tab7></TabPane>
            </Tabs>
        </Card>
</template>

<script>
    import tab1 from './tab1/tab1';
    import tab2 from './tab2/tab2';
    import tab3 from './tab3/tab3';
    import tab4 from './tab4/tab4';
    import tab5 from './tab5/tab5';
    import tab6 from './tab6/tab6';
    import tab7 from './tab7/tab7';
    import tab8 from './tab8/tab8';
    export default {
        components: {
            tab1,
            tab2,
            tab3,
            tab4,
            tab5,
            tab6,
            tab7,
            tab8
        },
        data () {
            return {
                name: 0
            };
        },
        methods: {
            btn (val) {
                this.name = val;
                console.log(val);
            }
        }
    };
</script>
