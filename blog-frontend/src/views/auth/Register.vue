<template>
  <div class="register-form">
    <h2>注册</h2>
    <form @submit.prevent="handleRegister">
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
        <label for="email">邮箱</label>
        <input 
          type="email" 
          id="email" 
          v-model="email" 
          placeholder="请输入邮箱"
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
      
      <div class="form-group">
        <label for="confirmPassword">确认密码</label>
        <input 
          type="password" 
          id="confirmPassword" 
          v-model="confirmPassword" 
          placeholder="请再次输入密码"
          required
        >
      </div>
      
      <div class="form-group agree-terms">
        <input type="checkbox" id="agree" v-model="agreeTerms" required>
        <label for="agree">我已阅读并同意<a href="#">服务条款</a>和<a href="#">隐私政策</a></label>
      </div>
      
      <button type="submit" class="submit-btn">注册</button>
    </form>
    
    <div class="login-link">
      已有账号？<router-link to="/auth/login">立即登录</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// 表单数据
const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const agreeTerms = ref(false)
const router = useRouter()

// 注册处理
const handleRegister = () => {
  if (password.value !== confirmPassword.value) {
    alert('两次输入的密码不一致')
    return
  }
  
  console.log('注册:', { 
    username: username.value, 
    email: email.value,
    password: password.value, 
    agreeTerms: agreeTerms.value 
  })
  
  // 这里只是模拟注册，实际应用中应该调用API
  setTimeout(() => {
    router.push('/auth/login')
  }, 1000)
}
</script>

<style scoped>
.register-form {
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

.agree-terms {
  display: flex;
  align-items: flex-start;
}

.agree-terms input {
  margin-top: 5px;
  margin-right: 10px;
}

.agree-terms label {
  font-weight: normal;
}

.agree-terms a {
  color: #3498db;
  text-decoration: none;
}

.agree-terms a:hover {
  text-decoration: underline;
}

input[type="text"],
input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

input[type="text"]:focus,
input[type="email"]:focus,
input[type="password"]:focus {
  border-color: #3498db;
  outline: none;
  box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
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
  margin-top: 10px;
}

.submit-btn:hover {
  background-color: #2980b9;
}

.login-link {
  margin-top: 20px;
  text-align: center;
  font-size: 0.9rem;
  color: #555;
}

.login-link a {
  color: #3498db;
  text-decoration: none;
}

.login-link a:hover {
  text-decoration: underline;
}
</style> 