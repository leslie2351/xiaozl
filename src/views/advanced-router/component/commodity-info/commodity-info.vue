<template>
 
    <Card>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
            <FormItem label="商品编号：">
                <p style="width: 343px">526353654</p>
            </FormItem>
            <FormItem label="品牌：" prop="text1">
                <Input v-model="formValidate.text1" placeholder="品牌" style="width: 343px"></Input>
            </FormItem>
            <FormItem label="商品名称：" prop="text2">
                <Input v-model="formValidate.text2" placeholder="商品名称" style="width: 343px"></Input>
            </FormItem>
            <FormItem label="原价：" prop="text3">
                <Input v-model="formValidate.text3" placeholder="原价" style="width: 343px"></Input>
            </FormItem>
            <FormItem label="销售价格：" prop="text4">
                <Input v-model="formValidate.text4" placeholder="销售价格" style="width: 343px"></Input>
            </FormItem>
            <FormItem label="商品重量：" prop="text5">
                <Input v-model="formValidate.text5" placeholder="商品重量" style="width: 343px"></Input>
            </FormItem>
            <FormItem label="商品图片：" prop="imgUn">
                    <VueImgInputer v-model="formValidate.imgUn.picValue" theme="light" size="small" 
                    placeholder='' bottomText='点击重新上传'
                    ></VueImgInputer>

                    <VueImgInputer v-model="formValidate.imgUn.picValue2" theme="light" size="small" 
                    placeholder='' bottomText='点击重新上传' style="margin-left:20px;"
                    ></VueImgInputer>
                    <VueImgInputer v-model="formValidate.imgUn.picValue3" theme="light" size="small" 
                    placeholder='' bottomText='点击重新上传' style="margin-left:20px;"
                    ></VueImgInputer>

                    <VueImgInputer v-model="formValidate.imgUn.picValue4" theme="light" size="small" 
                    placeholder='' bottomText='点击重新上传' style="margin-left:20px;"
                    ></VueImgInputer>
            </FormItem>
            </FormItem>
            <FormItem label="总库存" prop="text6">
                <Input v-model="formValidate.text6" placeholder="" style="width: 343px"></Input>
            </FormItem>
            <FormItem label="运费模板：" prop="text7">
                <div class="margin-bottom-10">
                    <Select v-model="formValidate.text7" style="width:200px">
                        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <Button class="margin-left-10">添加模板</Button>
                </div>
                <Alert type="success" show-icon closable style='width:600px' v-if='formValidate.text7 != ""'>
                    <span slot="desc">默认运费：8.0千克内0.00元，每增加10.00千克，加10元 </span>
                </Alert>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                <!-- <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">取消</Button> -->
            </FormItem>
        </Form>
    </Card>

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
                    callback(new Error('必须上传图片！'));
                }else if(value.picValue2 === ''){
                    callback(new Error('必须上传图片！'));
                } else {
                    callback();
                }
            };
            return {
                cityList:[
                    {
                        value: '模板一',
                        label: '模板一'
                    },
                    {
                        value: '模板二',
                        label: '模板二'
                    },
                ],
                formValidate: {
                    text1:"",
                    text2:'',
                    text3:'',
                    text4:'',
                    text5:'',
                    imgUn:{
                        picValue:"",
                        picValue2:'',
                        picValue3:'',
                        picValue4:'',
                        picValue5:'',
                    },
                    text6:'',
                    text7:'',
 
                },
                ruleValidate: {
                    text1: [
                        { required: true, message: '品牌不能为空', trigger: 'blur' }
                    ],
                    text2: [
                        { required: true, message: '商品名称不能不为空', trigger: 'blur' }
                    ],
                    text3: [
                        { required: true, message: '原价不能为空', trigger: 'blur' }
                    ],
                    text4: [
                        { required: true, message: '销售价格不能为空', trigger: 'blur' }
                    ],
                    text5: [
                        { required: true, message: '商品重量不能为空', trigger: 'blur' }
                    ],
                    imgUn: [
                        {  required: true,validator: validateUser, trigger: 'blur' }
                    ],
                    text6: [
                        { required: true, message: '总库存不能为空', trigger: 'blur' }
                    ],
                    text7: [
                        { required: true, message: '运费模板不能为空', trigger: 'blur' }
                    ],
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