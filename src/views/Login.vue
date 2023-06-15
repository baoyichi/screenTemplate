<template>
  <div id="container">
    <img :src="titlePic" alt="" />
    <div class="login-box">
      <div class="wrapper">
        <p>欢迎登录</p>
        <div class="wrapper-form">
          <el-form label-position="top" :model="ruleForm" ref="ruleForm" class="demo-ruleForm">
            <el-form-item label="用户名">
              <el-input v-model="ruleForm.name" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="ruleForm.password" type="password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item label="">
              <el-checkbox-group v-model="ruleForm.remember">
                <el-checkbox label="记住密码" name="type"></el-checkbox>
              </el-checkbox-group>
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
  titlePic = require('@/assets/images/login/title-pic.png');
  ruleForm = {
    name: '',
    password: '',
    remember: false
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

  img {
    position: absolute;
    left: 150.4px;
    top: 129.48px;
  }
}
.login-box {
  position: absolute;
  width: 368px;
  height: 473px;
  left: calc(50% - 368px / 2);
  top: calc(50% - 459px / 2 + 0.5px);
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(5px);
  border-radius: 4px;
  box-sizing: border-box;

  .wrapper {
    width: auto;
    height: 408px;
    padding: 32px;
    text-align: left;

    p {
      font-style: normal;
      font-weight: 500;
      font-size: 24px;
      line-height: 28px;
    }

    .wrapper-form {
      width: 304px;
      margin-top: 38px;
    }
  }

  ::v-deep {
    .el-button--primary {
      width: 100%;
    }
  }
}
</style>
