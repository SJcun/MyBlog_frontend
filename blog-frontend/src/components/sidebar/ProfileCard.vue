<template>
  <div class="profile-card">
    <div class="profile-avatar">
      <span v-if="!blogInfo.avatar">👨‍💻</span>
      <img v-else :src="blogInfo.avatar" alt="Avatar" />
    </div>
    
    <h3 class="profile-name">{{ blogInfo.nickName }}</h3>
    <p class="profile-bio">{{ blogInfo.signature }}</p>
    
    <div class="profile-stats">
      <div class="stat-item">
        <div class="stat-number">{{ blogInfo.articleCount }}</div>
        <div class="stat-label">文章</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">{{ blogInfo.categoryCount }}</div>
        <div class="stat-label">分类</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">{{ blogInfo.tagCount }}</div>
        <div class="stat-label">标签</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">{{ formatNumber(blogInfo.viewCount) }}</div>
        <div class="stat-label">访问</div>
      </div>
    </div>
    
    <div class="social-links">
      <a 
        v-for="(link, index) in socialLinks" 
        :key="index" 
        :href="link.url" 
        target="_blank" 
        class="social-link"
        :title="link.name"
      >
        <span class="social-icon">{{ link.icon }}</span>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from '../../utils/axios'

// 博客信息
const blogInfo = ref({
  nickName: '张开发',
  signature: '全栈开发工程师 | Vue爱好者 | 写作分享',
  avatar: '',
  articleCount: 0,
  categoryCount: 0,
  tagCount: 0,
  viewCount: 0
})

// 社交链接
const socialLinks = [
  { name: '邮箱', icon: '📧', url: 'mailto:example@example.com' },
  { name: '推特', icon: '🐦', url: 'https://twitter.com' },
  { name: '微信', icon: '📱', url: '#' },
  { name: 'GitHub', icon: '💻', url: 'https://github.com' }
]

// 获取博客信息
const getBlogInfo = async () => {
  try {
    const response = await axios.get('/api/blog/info')
    blogInfo.value = { ...blogInfo.value, ...response.data.data }
  } catch (error) {
    console.error('获取博客信息失败', error)
  }
}

// 格式化数字 (1000 -> 1k)
const formatNumber = (num: number) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k'
  }
  return num
}

onMounted(() => {
  getBlogInfo()
})
</script>

<style lang="scss" scoped>
.profile-card {
  background-color: white;
  border-radius: 8px;
  padding: 25px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  text-align: center;
}

.profile-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 0 auto 15px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--light-gray);
  
  span {
    font-size: 2.5rem;
    color: var(--primary-color);
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.profile-name {
  font-size: 1.3rem;
  margin-bottom: 5px;
  color: var(--text-color);
}

.profile-bio {
  color: var(--dark-gray);
  font-size: 0.9rem;
  margin-bottom: 20px;
}

.profile-stats {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  
  .stat-item {
    flex: 1;
    
    .stat-number {
      font-size: 1.2rem;
      font-weight: bold;
      color: var(--primary-color);
    }
    
    .stat-label {
      font-size: 0.8rem;
      color: var(--dark-gray);
    }
  }
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 15px;
  
  .social-link {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: var(--light-gray);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s;
    
    .social-icon {
      font-size: 1.2rem;
    }
    
    &:hover {
      transform: translateY(-3px);
      background-color: var(--primary-color);
      color: white;
      box-shadow: 0 5px 10px rgba(52, 152, 219, 0.3);
    }
  }
}
</style> 