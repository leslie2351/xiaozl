<template>
    <Card>
        <Tabs @on-click='btn'>
            <TabPane label="物流公司"><tab1 v-if='name == 0'></tab1></TabPane>
            <TabPane label="运费模板"><tab2 v-if='name == 1'></tab2></TabPane>
        </Tabs>
    </Card>
</template>

<script>
    import tab1 from './tab1/tab1';
    import tab2 from './tab2/tab2';
    export default {
        name: 'logistics-management',
        components: {
            tab1,
            tab2
        },
        data () {
            return {
                name: 0
            };
        },
        methods: {
            btn (val) {
                this.name = val;
                // console.log(val);
            }
        },
        mounted () {
            // this.btn();
        }
    };
</script>

<style scoped>

</style>
