<template>
    <div style="height:500px;width:800px;overflow-y: scroll;">
         <div style="width:530px;margin: 0 auto;">
              <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="130">
                <FormItem label="生产许可证" prop="img1">
                        <VueImgInputer v-model="formValidate.img1" theme="light" size="small" 
                        placeholder='点击上传' bottomText='点击重新上传'
                        ></VueImgInputer>
                        <p style="color:#ccc;">* 许可证上名称、法人需与营业执照一致，复印件需加盖公司红章扫描上传</p>
                </FormItem>
                <FormItem label="商标注册证" prop="img2">
                        <VueImgInputer v-model="formValidate.img2" theme="light" size="small" 
                        placeholder='点击上传' bottomText='点击重新上传'
                        ></VueImgInputer>
                        <p style="color:#ccc;">* 许可证上名称、法人需与营业执照一致，复印件需加盖公司红章扫描上传</p>
                </FormItem>
                <FormItem label="卫生生产许可证" prop="img3">
                        <VueImgInputer v-model="formValidate.img3" theme="light" size="small" 
                        placeholder='点击上传' bottomText='点击重新上传'
                        ></VueImgInputer>
                        <p style="color:#ccc;">* 许可证上名称、法人需与营业执照一致，复印件需加盖公司红章扫描上传!</p>
                </FormItem>
                <FormItem label="授权文件" prop="img4">
                        <VueImgInputer v-model="formValidate.img4" theme="light" size="small" 
                        placeholder='点击上传' bottomText='点击重新上传'
                        ></VueImgInputer>
                        <p style="color:#ccc;">* 许可证上名称、法人需与营业执照一致，复印件需加盖公司红章扫描上传!</p>
                </FormItem>
                <FormItem style="padding-bottom:30px;">
                    <Button type="primary" @click="handlePrev('formValidate')" style="margin-right:20px;">上一步</Button>
                    <Button type="primary" @click="handleSubmit('formValidate')" style="margin-right:20px;">提交</Button>
                    <!-- <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">取消</Button> -->
                </FormItem>
            </Form>  
         </div>
    </div>
</template>
<script>
import VueImgInputer from 'vue-img-inputer'
    export default {
        components:{
            VueImgInputer,
        },
        data () {
            const valiBankImg = (rule, value, callback) => {
                console.log(value);
                
                if (value === '') {
                    callback(new Error('必须上传此证件照！'));
                } else {
                    callback();
                }
            };

            return {
                formValidate: {
                    img1:'',
                    img2:'',
                    img3:'',
                    img4:'',

                },
                ruleValidate: {
                    img1: [
                        {  required: true,validator: valiBankImg, trigger: 'blur' }
                    ],
                    img2: [
                        {  required: true,validator: valiBankImg, trigger: 'blur' }
                    ],
                    img3: [
                        {  required: true,validator: valiBankImg, trigger: 'blur' }
                    ],  
                    img4: [
                        {  required: true,validator: valiBankImg, trigger: 'blur' }
                    ],                                    
                }
            }
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        // this.$store.commit('setSetp');
                        alert('成功')
                    } else {
                        this.$Message.error('错误!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            handlePrev(){
                this.$store.commit('setPrevSetp');
            }
        }
    }
</script>