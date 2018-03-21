<template>
    <div style="height:500px;width:800px;overflow-y: scroll;">
         <div style="width:530px;margin: 0 auto;">
              <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="130">
                <FormItem label="公司名称" prop="text1">
                    <Input v-model="formValidate.text1" placeholder="请输入公司名称" style="width: 343px"></Input>
                </FormItem>
                <FormItem label="营业执照注册号" prop="text2">
                    <Input v-model="formValidate.text2" placeholder="营业执照注册号" style="width: 343px"></Input>
                </FormItem>


                <FormItem label="法人代表姓名" prop="text3">
                    <Input v-model="formValidate.text3" placeholder="法人代表姓名" style="width: 343px"></Input>
                </FormItem>

                <FormItem label="成立日期" prop="date">
                    <DatePicker type="date" placeholder="成立日期" v-model="formValidate.date"></DatePicker>
                </FormItem>
                <FormItem label="营业执照所在地" prop="text4">
                    <Input v-model="formValidate.text4" placeholder="营业执照所在地" style="width: 343px"></Input>
                </FormItem>
                <FormItem label="营业执照详细地址" prop="text5">
                    <Input v-model="formValidate.text5" placeholder="营业执照详细地址" style="width: 343px"></Input>
                </FormItem>


                <FormItem label="营业期限" prop="text6">
                    <Input v-model="formValidate.text6" placeholder="营业期限" style="width: 343px"></Input>
                </FormItem>
                <FormItem label="注册资本" prop="text7">
                    <Input v-model="formValidate.text7" placeholder="注册资本" style="width: 343px"></Input>
                </FormItem>

                <FormItem label="经营范围" prop="text8">
                    <Input v-model="formValidate.text8" placeholder="营业期限" style="width: 343px"></Input>
                </FormItem>
                <FormItem label="公司所在地" prop="text9">
                    <Input v-model="formValidate.text9" placeholder="公司所在地" style="width: 343px"></Input>
                </FormItem>

                <FormItem label="公司电话" prop="text10">
                    <Input v-model="formValidate.text10" placeholder="公司电话" style="width: 343px"></Input>
                </FormItem>
                <FormItem label="公司详细地址" prop="text11">
                    <Input v-model="formValidate.text11" placeholder="公司详细地址" style="width: 343px"></Input>
                </FormItem>
                <FormItem label="法定代表人证件类型" prop="text12">
                    <Input v-model="formValidate.text12" placeholder="法定代表人证件类型" style="width: 343px"></Input>
                </FormItem>
                <FormItem label="法定代表人证件号" prop="text13">
                    <Input v-model="formValidate.text13" placeholder="法定代表人证件号" style="width: 343px"></Input>
                </FormItem>

                <FormItem label="有效期" prop="text14">
                    <Input v-model="formValidate.text14" placeholder="有效期" style="width: 343px"></Input>
                </FormItem>
                <FormItem label="开户行名称" prop="text15">
                    <Input v-model="formValidate.text15" placeholder="开户行名称" style="width: 343px"></Input>
                </FormItem>
                <FormItem label="支行联行号" prop="text16">
                    <Input v-model="formValidate.text16" placeholder="支行联行号" style="width: 343px"></Input>
                </FormItem>
                <FormItem label="法人证件身份证图片" prop="imgUn">
                        <VueImgInputer v-model="formValidate.imgUn.picValue" theme="light" size="small" 
                        placeholder='上传身份证正面照' bottomText='点击重新上传'
                        ></VueImgInputer>

                        <VueImgInputer v-model="formValidate.imgUn.picValue2" theme="light" size="small" 
                        placeholder='上传身份证反面照' bottomText='点击重新上传' style="margin-left:20px;"
                        ></VueImgInputer>
                </FormItem>
                </FormItem>
                <FormItem label="银行开户许可证" prop="bankImg">
                        <VueImgInputer v-model="formValidate.bankImg" theme="light" size="small" 
                        placeholder='点击上传' bottomText='点击重新上传'
                        ></VueImgInputer>
                        <p style="color:#ccc;">* 营业执照复印件需加盖公司红章扫描上传</p>
                </FormItem>
                </FormItem>
                <FormItem label="营业执照照片" prop="charterImg">
                        <VueImgInputer v-model="formValidate.charterImg" theme="light" size="small" 
                        placeholder='点击上传' bottomText='点击重新上传'
                        ></VueImgInputer>
                        <p style="color:#ccc;">* 许可证上名称、法人需与营业执照一致，复印件需加盖公司红章扫描上传!</p>
                </FormItem>
                <FormItem style="padding-bottom:30px;">
                    <Button type="primary" @click="handlePrev('formValidate')" style="margin-right:20px;">上一步</Button>
                    <Button type="primary" @click="handleSubmit('formValidate')" style="margin-right:20px;">下一步</Button>
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
            const valiBankImg = (rule, value, callback) => {
                console.log(value);
                
                if (value === '') {
                    callback(new Error('必须上传银行开户许可证！'));
                } else {
                    callback();
                }
            };
            
            const valiCharterImg = (rule, value, callback) => {

                if (value === '') {
                    callback(new Error('必须上传营业执照照片'));
                } else {
                    callback();
                }
            };
            return {
                formValidate: {
                    name: '',
                    user: '',
                    date: '',
                    desc: '',
                    imgUn:{
                        picValue:"",
                        picValue2:'',
                    },
                    Limited:"",
                    bankImg:'',
                    charterImg:'',
                },
                ruleValidate: {
                    text1: [
                        { required: true, message: '请输入公司名称', trigger: 'blur' }
                    ],
                    text2: [
                        { required: true, message: '营业执照注册号不能为空', trigger: 'blur' }
                    ],
                    text3: [
                        { required: true, message: '法人代表姓名不能为空', trigger: 'blur' }
                    ],
                    text4: [
                        { required: true, message: '营业执照所在地不能为空', trigger: 'blur' }
                    ],
                    text5: [
                        { required: true, message: '请输入营业执照详细地址', trigger: 'blur' }
                    ],
                    text6: [
                        { required: true, message: '营业期限不能为空', trigger: 'blur' }
                    ],
                    text7: [
                        { required: true, message: '注册资本不能为空', trigger: 'blur' }
                    ],
                    text8: [
                        { required: true, message: '经营范围不能为空', trigger: 'blur' }
                    ],
                    text9: [
                        { required: true, message: '公司所在地不能为空', trigger: 'blur' }
                    ],
                    text10: [
                        { required: true, message: '请输入公司电话', trigger: 'blur' }
                    ],
                    text11: [
                        { required: true, message: '公司详细地址不能为空', trigger: 'blur' }
                    ],
                    text12: [
                        { required: true, message: '法定代表人证件类型不能为空', trigger: 'blur' }
                    ],
                    text13: [
                        { required: true, message: '法定代表人证件号不能为空', trigger: 'blur' }
                    ],
                    text14: [
                        { required: true, message: '有效期不能为空', trigger: 'blur' }
                    ],
                    text15: [
                        { required: true, message: '开户行名称不能为空', trigger: 'blur' }
                    ],
                    text16: [
                        { required: true, message: '支行联行号不能为空', trigger: 'blur' }
                    ],
                    imgUn: [
                        {  required: true,validator: validateUser, trigger: 'blur' }
                    ],
                    Limited: [
                        { required: true, message: '有效期不能为空', trigger: 'blur' }
                    ],
                    date: [
                        { required: true, type: 'date', message: '请选择时间', trigger: 'change' }
                    ],
                    bankImg: [
                        {  required: true,validator: valiBankImg, trigger: 'blur' }
                    ],
                    charterImg: [
                        {  required: true,validator: valiCharterImg, trigger: 'blur' }
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
            },
            handlePrev(){
                this.$store.commit('setPrevSetp');
            }
        }
    }
</script>