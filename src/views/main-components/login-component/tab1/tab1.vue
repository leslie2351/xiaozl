<template>
 
    <div style="width:500px;margin: 0 auto;">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
            <FormItem label="姓名" prop="name">
                <Input v-model="formValidate.name" placeholder="真实姓名" style="width: 343px"></Input>
            </FormItem>
            <FormItem label="身份证号" prop="user">
                <Input v-model="formValidate.user" placeholder="与姓名相对应的身份证号" style="width: 343px"></Input>
            </FormItem>
            <FormItem label="身份证照片" prop="imgUn">
                    <VueImgInputer v-model="formValidate.imgUn.picValue" theme="light" size="small" 
                    placeholder='上传身份证正面照' bottomText='点击重新上传'
                    ></VueImgInputer>

                    <VueImgInputer v-model="formValidate.imgUn.picValue2" theme="light" size="small" 
                    placeholder='上传身份证反面照' bottomText='点击重新上传' style="margin-left:20px;"
                    ></VueImgInputer>
            </FormItem>
            </FormItem>
            <FormItem label="身份证有效期" prop="Limited">
                <Input v-model="formValidate.Limited" placeholder="" style="width: 343px"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formValidate')">下一步</Button>
                <!-- <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">取消</Button> -->
            </FormItem>
        </Form>
    </div>

</template>
<script>
import VueImgInputer from 'vue-img-inputer'
    export default {
        components:{
            VueImgInputer,
        },
        data () {
            const validateUser = (rule, value, callback) => {
                console.log(value);
                
                if (value.picValue === '') {
                    callback(new Error('必须上传正面图片！'));
                }else if(value.picValue2 === ''){
                    callback(new Error('必须上传反面图片！'));
                } else {
                    callback();
                }
            };
            return {
                formValidate: {
                    name: '',
                    user: '',
                    desc: '',
                    imgUn:{
                        picValue:"",
                        picValue2:'',
                    },
                    Limited:"",
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '姓名不能为空', trigger: 'blur' }
                    ],
                    user: [
                        { required: true, message: '身份证号不能不为空', trigger: 'blur' }
                    ],
                    imgUn: [
                        {  required: true,validator: validateUser, trigger: 'blur' }
                    ],
                    Limited: [
                        { required: true, message: '有效期不能为空', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('请继续!');
                        this.$store.commit('setSetp');
                    } else {
                        this.$Message.error('错误!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        }
    }
</script>