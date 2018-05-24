<template>
  <div>
    <mt-header :title="title" class="lcc-header">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <router-link to="/" slot="right">
        <mt-button>注册</mt-button>
      </router-link>
    </mt-header>
    <div class="lcc-login">
      <mt-field label="用户名" placeholder="请输入用户名" v-model="username" class="lcc-login-field"></mt-field>
      <mt-field label="密码" placeholder="请输入密码" v-model="password" class="lcc-login-field"></mt-field>
      <mt-button type="primary" size="large" class="lcc-login-button" @click="login">登陆</mt-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
      title: '登陆'
    }
  },
  methods: {
    login () {
      console.log('login: ' + this.username + ' , ' + this.password)
    }
  }
}
</script>

<style scoped lang="css">
  .lcc-login{
    margin-top: 30px;
  }
  .lcc-login-field{
    text-align: left;
    margin-left: 20px;
  }
  .lcc-login-button{
    margin-top: 60px;
    margin-left: 28px;
    margin-right: 28px;
    width: 319px;
  }
</style>
