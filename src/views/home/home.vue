<template>
    <div>
        <Tree ref='main' :data="data4" show-checkbox @on-check-change = 'btn' @on-toggle-expand='all'></Tree>
        <button @click='cha'>查询</button>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                data4: [
                    // {
                    //     title: 'parent 1',
                    //     expand: true,
                    //     selected: true,
                    //     children: [
                    //         {
                    //             title: 'parent 1-1',
                    //             expand: true,
                    //             children: [
                    //                 {
                    //                     title: 'leaf 1-1-1',
                    //                     children:[
                    //                         {title: '6666',}
                    //                     ]
                                        
                    //                 },
                    //                 {
                    //                     title: 'leaf 1-1-2'
                    //                 }
                    //             ]
                    //         },
                    //         {
                    //             title: 'parent 1-2',
                    //             expand: true,
                    //             children: [
                    //                 {
                    //                     title: 'leaf 1-2-1',
                    //                     checked: true
                    //                 },
                    //                 {
                    //                     title: 'leaf 1-2-1'
                    //                 }
                    //             ]
                    //         }
                    //     ]
                    // }
                ]
            }
        },
        methods:{
            btn(val){
               
                
            },
            all(val){
         
            },
            cha(){
                let param = this.$refs.main.getCheckedNodes();
                let arr = []
                param.forEach((item)=>{
                    if(item.children == undefined){
                        console.log(1);
                        arr.push(item)
                    }
                })
                console.log(arr);
                
            },
            show(data){
                for(var item of data){
                    item.title = item.area_name;
                    if(item.list && item.list.length>0){
                        item.children = item.list;
                        this.show(item.children)
                    }
                }
                
            },
            init(){
                this.$http.get('http://192.168.5.21:8080/store-express-template/listArea'
                ).then((data)=>{
                    console.log(data);
                    let arr = data.data
                    this.show(arr)
                    this.data4 = arr;
                   
                    
                }).catch((err)=>{
                    console.log(err);
                    
                })
            },

        },
        mounted(){
            this.init()
        }
    }
</script>
