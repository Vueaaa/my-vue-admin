<script setup lang='ts'>
import { ref,reactive } from 'vue';
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import service from '../../axios/index'

interface LoginInfo {
    username: string;
    password: string;
}
const param = reactive<LoginInfo>({
    username: 'huxin',
    password: '123456',
});
const loginRulesFormRef = ref<FormInstance>()

const rules: FormRules = {
    username: [
        {
            required: true,
            message: '请输入用户名',
            trigger: 'blur',
        },
    ],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
};

const login = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid) => {
    if (valid) {
      service
        .post('/api/auth/login', param)
        .then((response) => {
          if (response.status === 201) {
            ElMessage({
              message: '登录成功！！',
              type: 'success'
            })
          }
        })
        .catch((error) => {
          ElMessage.error(error.message || 'An error occurred.')
        })
    }
  })
}


    

</script>

<template>
    <div class="login">
        <div class="login-container">
            <div class="login-header">
                <img class="logo mr10" src="../../assets/img/logo.png">
                <div class="login-title">后台管理系统</div>
            </div>
            <el-form :model="param" :rules="rules" ref="loginRulesFormRef" size="large">
                <el-form-item prop="username">
                    <el-input v-model="param.username" placeholder="用户名">
                        <template #prepend>
                            <el-icon>
                                <User />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        type="password"
                        placeholder="密码"
                        v-model="param.password"
                        @keyup.enter="login(loginRulesFormRef)"
                    >
                        <template #prepend>
                            <el-icon>
                                <Lock />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-button class="login-btn" type="primary" size="large" @click="login(loginRulesFormRef)">登录</el-button>
            </el-form>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.login {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    background: url('../../assets/img/bg.png') center/cover no-repeat;
    .login-container{
        width: 450px;
        border-radius: 5px;
        background-color: #fff;
        padding: 40px 50px 50px;
        box-sizing: border-box;
    .login-header {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 40px;

        .logo {
            width: 36px;
        }

        .login-title {
            font-size: 22px;
            color: #333;
            font-weight: bold;
        }
    }
    .login-btn{
        display: block;
        width: 100%;
    }
}
}
</style>