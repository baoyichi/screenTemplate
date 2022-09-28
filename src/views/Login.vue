<template>
  <div id="container">
    <div class="login-box">
      <div class="wrapper">
        <div class="wrapper-left-bg"></div>
        <div class="wrapper-form">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="70px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="name">
              <el-input v-model="ruleForm.name" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="ruleForm.password" type="password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm()">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Form } from 'element-ui';

@Component
export default class Login extends Vue {
  ruleForm = {
    name: '',
    password: ''
  };
  rules = {
    name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
  };

  submitForm(): void {
    (this.$refs.ruleForm as Form).validate(valid => {
      if (valid) {
        //  TODO: 登录接口
        this.$router.push({
          path: '/home'
        });
      }
    });
  }
}
</script>

<style scoped lang="scss">
#container {
  height: 100vh;
  background-image: url('../assets/images/login/login-bg.jpg');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  flex: 1 1 0;
  background-attachment: fixed;
}
.login-box {
  display: flex;
  flex-direction: row;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  box-sizing: border-box;
  margin: 0 auto;
  width: 782px;
  height: 518px;
  position: relative;
  background-color: rgb(255, 255, 255);
  overflow: hidden;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.15);

  .wrapper {
    width: 100%;
    height: 408px;
    margin-top: 40px;
    display: flex;

    .wrapper-left-bg {
      width: 200px;
      padding: 0 50px;
      border-right: 0.5px solid rgb(196, 203, 215);
    }

    .wrapper-form {
      width: 320px;
      padding-left: 50px;
    }
  }

  ::v-deep {
    .el-button--primary {
      width: 100%;
    }
  }
}
</style>
