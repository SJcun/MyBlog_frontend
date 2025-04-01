<template>
  <div class="admin-layout">
    <div class="admin-sidebar">
      <div class="admin-logo">
        <span class="logo-icon">📝</span>
        <h1>博客管理</h1>
      </div>
      
      <ul class="admin-menu">
        <li>
          <router-link to="/admin" exact>
            <span class="menu-icon">🏠</span>
            <span>控制台</span>
          </router-link>
        </li>
        <li>
          <router-link to="/admin/article">
            <span class="menu-icon">📄</span>
            <span>文章管理</span>
          </router-link>
        </li>
        <li>
          <router-link to="/admin/category">
            <span class="menu-icon">📚</span>
            <span>分类管理</span>
          </router-link>
        </li>
        <li>
          <router-link to="/admin/tag">
            <span class="menu-icon">🏷️</span>
            <span>标签管理</span>
          </router-link>
        </li>
        <li>
          <router-link to="/admin/comment">
            <span class="menu-icon">💬</span>
            <span>评论管理</span>
          </router-link>
        </li>
        <li>
          <router-link to="/admin/profile">
            <span class="menu-icon">👤</span>
            <span>个人资料</span>
          </router-link>
        </li>
      </ul>
    </div>
    
    <div class="admin-content">
      <header class="admin-header">
        <div class="header-left">
          <button class="toggle-sidebar" @click="toggleSidebar">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        
        <div class="header-right">
          <div class="user-menu">
            <span class="user-name">管理员</span>
            <div class="dropdown-menu">
              <router-link to="/">返回网站</router-link>
              <a href="#" @click.prevent="logout">退出登录</a>
            </div>
          </div>
        </div>
      </header>
      
      <main class="admin-main">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const isSidebarCollapsed = ref(false)
const router = useRouter()

const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value
}

const logout = () => {
  // 处理退出登录逻辑
  console.log('退出登录')
  router.push('/auth/login')
}
</script>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
}

.admin-sidebar {
  width: 220px;
  background-color: #304156;
  color: white;
  overflow-y: auto;
  transition: width 0.3s;
}

.admin-sidebar.collapsed {
  width: 64px;
}

.admin-logo {
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  background-color: #263445;
}

.logo-icon {
  font-size: 1.5rem;
  margin-right: 10px;
}

.admin-logo h1 {
  font-size: 1.2rem;
  margin: 0;
  white-space: nowrap;
}

.admin-menu {
  padding: 10px 0;
}

.admin-menu li {
  margin-bottom: 5px;
}

.admin-menu a {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  color: #bfcbd9;
  text-decoration: none;
  transition: all 0.3s;
}

.admin-menu a:hover {
  color: white;
  background-color: #263445;
}

.admin-menu a.router-link-active {
  color: #409eff;
  background-color: #263445;
}

.menu-icon {
  margin-right: 10px;
  font-size: 1.1rem;
}

.admin-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.admin-header {
  height: 60px;
  background-color: white;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.07);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.toggle-sidebar {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 20px;
  justify-content: space-between;
  padding: 0;
  width: 25px;
}

.toggle-sidebar span {
  background-color: #606266;
  display: block;
  height: 2px;
  transition: all 0.3s;
  width: 100%;
}

.user-menu {
  position: relative;
  cursor: pointer;
}

.user-name {
  display: flex;
  align-items: center;
}

.user-name:after {
  content: '▼';
  font-size: 0.7rem;
  margin-left: 5px;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 10px 0;
  min-width: 120px;
  z-index: 10;
  margin-top: 5px;
  display: none;
}

.user-menu:hover .dropdown-menu {
  display: block;
}

.dropdown-menu a {
  display: block;
  padding: 8px 16px;
  color: #606266;
  text-decoration: none;
}

.dropdown-menu a:hover {
  background-color: #f5f7fa;
}

.admin-main {
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
  background-color: #f5f7fa;
}

@media (max-width: 768px) {
  .admin-sidebar {
    position: fixed;
    top: 0;
    bottom: 0;
    z-index: 1000;
    transform: translateX(-100%);
  }
  
  .admin-sidebar.open {
    transform: translateX(0);
  }
  
  .admin-content {
    margin-left: 0;
  }
}
</style> 