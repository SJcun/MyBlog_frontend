<template>
  <header class="app-header" :class="{ 'header-scrolled': isScrolled }">
    <div class="container">
      <nav class="nav-container">
        <!-- 博客标志 -->
        <router-link to="/" class="logo">
          <span class="logo-icon">📝</span>
          <span class="logo-text">我的博客</span>
        </router-link>
        
        <!-- 导航链接 - 桌面 -->
        <ul class="nav-links" v-show="!isMobileMenuOpen">
          <li v-for="item in navItems" :key="item.path">
            <router-link :to="item.path" active-class="active">
              <span class="nav-icon">{{ item.icon }}</span>
              <span>{{ item.title }}</span>
            </router-link>
          </li>
          
          <!-- 登录/注册按钮 -->
          <li v-if="!userStore.isLoggedIn" class="auth-buttons">
            <router-link to="/auth/login" class="btn btn-login">登录</router-link>
            <router-link to="/auth/register" class="btn btn-register">注册</router-link>
          </li>
          
          <!-- 用户信息 -->
          <li v-else class="user-dropdown">
            <el-dropdown trigger="click">
              <div class="user-info">
                <el-avatar :size="32" :src="userStore.userInfo.avatar">
                  {{ userStore.userInfo.nickname?.charAt(0) || userStore.userInfo.username?.charAt(0) || 'U' }}
                </el-avatar>
                <span class="username">{{ userStore.userInfo.nickname || userStore.userInfo.username }}</span>
              </div>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item v-if="userStore.isAdmin" @click="goToAdmin">
                    <el-icon><Setting /></el-icon>
                    <span>管理后台</span>
                  </el-dropdown-item>
                  <el-dropdown-item @click="goToProfile">
                    <el-icon><User /></el-icon>
                    <span>个人资料</span>
                  </el-dropdown-item>
                  <el-dropdown-item @click="logout">
                    <el-icon><SwitchButton /></el-icon>
                    <span>退出登录</span>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </li>
        </ul>
        
        <!-- 移动端菜单按钮 -->
        <div class="mobile-menu-button" @click="toggleMobileMenu">
          <div class="menu-icon" :class="{ 'open': isMobileMenuOpen }">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>
    </div>
    
    <!-- 移动端菜单 -->
    <div class="mobile-menu" :class="{ 'open': isMobileMenuOpen }">
      <ul class="mobile-nav-links">
        <li v-for="item in navItems" :key="item.path">
          <router-link :to="item.path" active-class="active" @click="closeMobileMenu">
            <span class="nav-icon">{{ item.icon }}</span>
            <span>{{ item.title }}</span>
          </router-link>
        </li>
        
        <!-- 登录/注册按钮 - 移动端 -->
        <li v-if="!userStore.isLoggedIn" class="auth-buttons-mobile">
          <router-link to="/auth/login" class="btn btn-login" @click="closeMobileMenu">登录</router-link>
          <router-link to="/auth/register" class="btn btn-register" @click="closeMobileMenu">注册</router-link>
        </li>
        
        <!-- 用户选项 - 移动端 -->
        <li v-else class="user-info-mobile">
          <div class="user-avatar">
            <el-avatar :size="50" :src="userStore.userInfo.avatar">
              {{ userStore.userInfo.nickname?.charAt(0) || userStore.userInfo.username?.charAt(0) || 'U' }}
            </el-avatar>
            <span class="username">{{ userStore.userInfo.nickname || userStore.userInfo.username }}</span>
          </div>
          <div class="user-actions">
            <router-link to="/admin" v-if="userStore.isAdmin" class="user-action-link" @click="closeMobileMenu">
              <el-icon><Setting /></el-icon>
              <span>管理后台</span>
            </router-link>
            <router-link to="/admin/profile" class="user-action-link" @click="closeMobileMenu">
              <el-icon><User /></el-icon>
              <span>个人资料</span>
            </router-link>
            <a href="javascript:void(0)" class="user-action-link" @click="logoutMobile">
              <el-icon><SwitchButton /></el-icon>
              <span>退出登录</span>
            </a>
          </div>
        </li>
      </ul>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessageBox } from 'element-plus'
import { Setting, User, SwitchButton } from '@element-plus/icons-vue'
import { useUserStore } from '../../stores/user'

const router = useRouter()
const userStore = useUserStore()

// 导航项
const navItems = [
  { title: '首页', path: '/', icon: '🏠' },
  { title: '分类', path: '/category', icon: '📚' },
  { title: '标签', path: '/tag', icon: '🏷️' },
  { title: '关于', path: '/about', icon: '👤' },
  { title: '搜索', path: '/search', icon: '🔍' }
]

// 滚动状态
const isScrolled = ref(false)

// 移动菜单状态
const isMobileMenuOpen = ref(false)

// 监听滚动事件
const handleScroll = () => {
  isScrolled.value = window.scrollY > 10
}

// 切换移动菜单
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  if (isMobileMenuOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

// 关闭移动菜单
const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
  document.body.style.overflow = ''
}

// 前往管理后台
const goToAdmin = () => {
  router.push('/admin')
}

// 前往个人资料
const goToProfile = () => {
  router.push('/admin/profile')
}

// 退出登录
const logout = () => {
  ElMessageBox.confirm('确定要退出登录吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    userStore.logout()
    router.push('/')
  }).catch(() => {})
}

// 移动端退出登录
const logoutMobile = () => {
  ElMessageBox.confirm('确定要退出登录吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    userStore.logout()
    closeMobileMenu()
    router.push('/')
  }).catch(() => {})
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll() // 初始检查
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style lang="scss" scoped>
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(5px);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  transition: background-color 0.3s, box-shadow 0.3s;
  
  &.header-scrolled {
    background-color: rgba(255, 255, 255, 0.95);
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  }
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
}

.logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: var(--primary-color);
  font-weight: bold;
  font-size: 1.3rem;
  transition: transform 0.3s;
  
  &:hover {
    transform: scale(1.05);
  }
  
  .logo-icon {
    margin-right: 8px;
    font-size: 1.5rem;
  }
}

.nav-links {
  display: flex;
  align-items: center;
  
  li {
    margin-left: 25px;
    
    a {
      display: flex;
      align-items: center;
      color: var(--text-color);
      text-decoration: none;
      font-weight: 500;
      transition: color 0.3s;
      
      &:hover, &.active {
        color: var(--primary-color);
      }
      
      .nav-icon {
        margin-right: 5px;
      }
    }
  }
}

.auth-buttons {
  display: flex;
  align-items: center;
  gap: 10px;
  
  .btn {
    padding: 8px 15px;
    border-radius: 4px;
    font-weight: 500;
    font-size: 0.9rem;
    transition: all 0.3s;
  }
  
  .btn-login {
    color: var(--primary-color);
    border: 1px solid var(--primary-color);
    
    &:hover {
      background-color: rgba(52, 152, 219, 0.1);
    }
  }
  
  .btn-register {
    background-color: var(--primary-color);
    color: white;
    
    &:hover {
      background-color: darken(#3498db, 10%);
    }
  }
}

.user-dropdown {
  .user-info {
    display: flex;
    align-items: center;
    cursor: pointer;
    
    .username {
      margin-left: 8px;
      max-width: 100px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}

// 移动端样式
.mobile-menu-button {
  display: none;
  cursor: pointer;
  z-index: 110;
}

.menu-icon {
  width: 30px;
  height: 20px;
  position: relative;
  
  span {
    display: block;
    position: absolute;
    height: 3px;
    width: 100%;
    background: var(--primary-color);
    border-radius: 3px;
    opacity: 1;
    left: 0;
    transform: rotate(0deg);
    transition: 0.25s ease-in-out;
    
    &:nth-child(1) {
      top: 0px;
    }
    
    &:nth-child(2) {
      top: 8px;
    }
    
    &:nth-child(3) {
      top: 16px;
    }
  }
  
  &.open {
    span:nth-child(1) {
      top: 9px;
      transform: rotate(135deg);
    }
    
    span:nth-child(2) {
      opacity: 0;
      left: -60px;
    }
    
    span:nth-child(3) {
      top: 9px;
      transform: rotate(-135deg);
    }
  }
}

.mobile-menu {
  position: fixed;
  top: 0;
  right: -100%;
  width: 100%;
  height: 100vh;
  background-color: white;
  z-index: 100;
  padding: 80px 20px 20px;
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
  transition: right 0.3s ease;
  overflow-y: auto;
  
  &.open {
    right: 0;
  }
  
  .mobile-nav-links {
    display: flex;
    flex-direction: column;
    gap: 20px;
    
    li a {
      display: flex;
      align-items: center;
      font-size: 1.2rem;
      padding: 10px 0;
      border-bottom: 1px solid #eee;
      
      .nav-icon {
        margin-right: 10px;
        font-size: 1.3rem;
      }
    }
  }
}

.auth-buttons-mobile {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 15px;
  
  .btn {
    display: block;
    text-align: center;
    padding: 12px;
    border-radius: 4px;
    font-weight: 500;
  }
}

.user-info-mobile {
  border-top: 1px solid #eee;
  padding-top: 20px;
  margin-top: 15px;
  
  .user-avatar {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
    
    .username {
      font-size: 1.1rem;
      font-weight: 500;
    }
  }
  
  .user-actions {
    display: flex;
    flex-direction: column;
    gap: 15px;
    
    .user-action-link {
      display: flex;
      align-items: center;
      padding: 10px 15px;
      background-color: #f5f5f5;
      border-radius: 4px;
      
      .el-icon {
        margin-right: 10px;
      }
    }
  }
}

@media (max-width: 768px) {
  .nav-links {
    display: none !important;
  }
  
  .mobile-menu-button {
    display: block;
  }
}
</style> 