<template>
  <div class="login-form">
    <h2>登录</h2>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="username">用户名</label>
        <input 
          type="text" 
          id="username" 
          v-model="username" 
          placeholder="请输入用户名"
          required
        >
      </div>
      
      <div class="form-group">
        <label for="password">密码</label>
        <input 
          type="password" 
          id="password" 
          v-model="password" 
          placeholder="请输入密码"
          required
        >
      </div>
      
      <div class="form-options">
        <div class="remember-me">
          <input type="checkbox" id="remember" v-model="remember">
          <label for="remember">记住我</label>
        </div>
        <a href="#" class="forgot-password">忘记密码？</a>
      </div>
      
      <button type="submit" class="submit-btn">登录</button>
    </form>
    
    <div class="register-link">
      没有账号？<router-link to="/auth/register">立即注册</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// 表单数据
const username = ref('')
const password = ref('')
const remember = ref(false)
const router = useRouter()

// 登录处理
const handleLogin = () => {
  console.log('登录:', { username: username.value, password: password.value, remember: remember.value })
  // 这里只是模拟登录，实际应用中应该调用API
  setTimeout(() => {
    router.push('/')
  }, 1000)
}
</script>

<style scoped>
.login-form {
  text-align: left;
}

h2 {
  margin-bottom: 20px;
  text-align: center;
  color: #333;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #555;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

input[type="text"]:focus,
input[type="password"]:focus {
  border-color: #3498db;
  outline: none;
  box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.remember-me {
  display: flex;
  align-items: center;
}

.remember-me input {
  margin-right: 8px;
}

.forgot-password {
  color: #3498db;
  text-decoration: none;
  font-size: 0.9rem;
}

.forgot-password:hover {
  text-decoration: underline;
}

.submit-btn {
  width: 100%;
  padding: 12px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-btn:hover {
  background-color: #2980b9;
}

.register-link {
  margin-top: 20px;
  text-align: center;
  font-size: 0.9rem;
  color: #555;
}

.register-link a {
  color: #3498db;
  text-decoration: none;
}

.register-link a:hover {
  text-decoration: underline;
}
</style> 