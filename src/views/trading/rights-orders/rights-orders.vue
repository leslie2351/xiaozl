<template>
    <Card>
        <Tabs @on-click='btn'>
            <TabPane label="未完成退款"><tab1 v-if='name == 0'></tab1></TabPane>
            <TabPane label="未完成退货"><tab2 v-if='name == 1'></tab2></TabPane>
            <TabPane label="已完成退款"><tab3 v-if='name == 2'></tab3></TabPane>
            <TabPane label="已完成退货"><tab4 v-if='name == 3'></tab4></TabPane>
        </Tabs>
    </Card>
</template>

<script>
    import tab1 from './tab1/tab1';
    import tab2 from './tab2/tab2';
    import tab3 from './tab3/tab3';
    import tab4 from './tab4/tab4';
    export default {
        components: {
            tab1,
            tab2,
            tab3,
            tab4
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

<style scoped>

</style>
