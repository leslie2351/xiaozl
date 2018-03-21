<style lang="less">
    @import './login.less';
    @import '../styles/common.less';
</style>

<template>
    <div class="login">
        <div class="login-con" @keydown.enter="handleSubmit" v-if="onOff">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="userName">
                            <Input v-model="form.userName" placeholder="请输入用户名">
                                <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="form.password" placeholder="请输入密码">
                                <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long>登录</Button>
                        </FormItem>
                    </Form>
                    <div class="login-more clearfix" style='font-size:12px;'>
                        <router-link to='' class="fl" style='color:#000'>忘记密码</router-link>
                        <a href="javascript:;" class="fr" @click='loginBtn'>立刻注册</a>
                    </div>
                </div>
            </Card>
        </div>

        <div class="register-main" v-if="!onOff">
            <h1>注册</h1>
            <div class="step">
                <Steps :current=getAetp>
                    <Step title="基本信息" icon="person-add"></Step>
                    <Step title="账户信息" icon="camera"></Step>
                    <Step title="认证信息" icon="email"></Step>
                </Steps>
                <div></div>
            </div>
            <div class="register-info">
                <tab1 v-show="getAetp == 0"></tab1>  
                <tab2 v-show="getAetp == 1"></tab2>  
                <tab3 v-show="getAetp == 2"></tab3>              
            </div>
            
        </div>
        

    </div>
</template>

<script>
import Cookies from 'js-cookie';
import VueImgInputer from 'vue-img-inputer'
import tab1 from './main-components/login-component/tab1/tab1'
import tab2 from './main-components/login-component/tab2/tab2'
import tab3 from './main-components/login-component/tab3/tab3'
export default {
    components:{
        VueImgInputer,
        tab1,
        tab2,
        tab3
    },
    data () {
        return {
            form: {
                userName: 'hehe',
                password: ''
            },
            rules: {
                userName: [
                    { required: true, message: '账号不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ]
            },
            onOff:true,

        };
    },
    computed: {
        getAetp () {
            return this.$store.state.app.setp;
        },

    },
    methods: {
        handleSubmit () {
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    Cookies.set('user', this.form.userName);
                    Cookies.set('password', this.form.password);
                    this.$store.commit('setAvator', 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg');
                    if (this.form.userName === 'admin') {
                        Cookies.set('access', 0);
                    } else {
                        Cookies.set('access', 1);
                    }
                    this.$router.push({
                        name: 'home_index'
                    });
                }
            });
        },
        loginBtn(){
            this.onOff = false;
        }
    }
};
</script>

<style>

</style>
