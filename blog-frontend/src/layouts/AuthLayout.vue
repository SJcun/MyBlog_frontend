<template>
  <div class="layout-auth">
    <div class="auth-container">
      <div class="auth-card">
        <div class="logo">
          <span class="logo-icon">📝</span>
          <h1>我的博客</h1>
        </div>
        
        <router-view />
        
        <div class="back-home">
          <router-link to="/">
            <el-button text>
              <el-icon><ArrowLeft /></el-icon>
              返回首页
            </el-button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft } from '@element-plus/icons-vue'
</script>

<style lang="scss" scoped>
.layout-auth {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.auth-container {
  width: 100%;
  max-width: 420px;
  padding: 20px;
}

.auth-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  padding: 30px;
}

.logo {
  text-align: center;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  .logo-icon {
    font-size: 3rem;
    margin-bottom: 10px;
    color: var(--primary-color);
  }
  
  h1 {
    font-size: 1.8rem;
    color: var(--primary-color);
    margin: 0;
  }
}

.back-home {
  text-align: center;
  margin-top: 20px;
}
</style> 