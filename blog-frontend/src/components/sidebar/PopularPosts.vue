<template>
  <div class="popular-posts">
    <h3 class="widget-title">
      <span class="widget-icon">🔥</span>
      热门文章
    </h3>
    
    <ul class="post-list">
      <li v-for="(post, index) in popularPosts" :key="post.id" class="post-item">
        <div class="post-rank">{{ index + 1 }}</div>
        <div class="post-content">
          <router-link :to="`/article/${post.id}`" class="post-title">
            {{ post.title }}
          </router-link>
          <div class="post-meta">
            <span class="post-date">
              <el-icon><Clock /></el-icon>
              {{ formatDate(post.createTime) }}
            </span>
            <span class="post-views">
              <el-icon><View /></el-icon>
              {{ formatNumber(post.viewCount) }}
            </span>
          </div>
        </div>
      </li>
      
      <div v-if="loading" class="loading-posts">
        <el-skeleton :rows="5" animated />
      </div>
      
      <div v-if="!loading && popularPosts.length === 0" class="empty-posts">
        暂无文章
      </div>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Clock, View } from '@element-plus/icons-vue'
import axios from '../../utils/axios'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')

const popularPosts = ref([])
const loading = ref(true)

// 获取热门文章
const getPopularPosts = async () => {
  try {
    loading.value = true
    const response = await axios.get('/api/articles/popular', { params: { size: 5 } })
    popularPosts.value = response.data.data || []
  } catch (error) {
    console.error('获取热门文章失败', error)
  } finally {
    loading.value = false
  }
}

// 日期格式化
const formatDate = (date: string | null) => {
  if (!date) return ''
  return dayjs(date).format('MM-DD')
}

// 数字格式化
const formatNumber = (num: number) => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k'
  }
  return num
}

onMounted(() => {
  getPopularPosts()
})
</script>

<style lang="scss" scoped>
.popular-posts {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.widget-title {
  font-size: 1.2rem;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  
  .widget-icon {
    margin-right: 8px;
  }
}

.post-list {
  list-style: none;
  
  .post-item {
    display: flex;
    gap: 12px;
    padding: 12px 0;
    border-bottom: 1px dashed #eee;
    
    &:last-child {
      border-bottom: none;
    }
    
    .post-rank {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      background-color: var(--light-gray);
      color: var(--dark-gray);
      font-weight: 500;
      border-radius: 4px;
      flex-shrink: 0;
      margin-top: 3px;
      
      // 前三名特殊颜色
      &:nth-child(1) {
        background-color: #f39c12;
        color: white;
      }
      
      &:nth-child(2) {
        background-color: #bdc3c7;
        color: white;
      }
      
      &:nth-child(3) {
        background-color: #d35400;
        color: white;
      }
    }
    
    .post-content {
      flex-grow: 1;
      overflow: hidden;
      
      .post-title {
        display: block;
        font-size: 0.95rem;
        line-height: 1.4;
        margin-bottom: 5px;
        color: var(--text-color);
        text-decoration: none;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        transition: color 0.3s;
        
        &:hover {
          color: var(--primary-color);
        }
      }
      
      .post-meta {
        display: flex;
        gap: 15px;
        font-size: 0.8rem;
        color: var(--dark-gray);
        
        .post-date, .post-views {
          display: flex;
          align-items: center;
          
          .el-icon {
            margin-right: 3px;
            font-size: 0.9rem;
          }
        }
      }
    }
  }
}

.loading-posts, .empty-posts {
  margin-top: 10px;
  color: var(--dark-gray);
  font-size: 0.9rem;
  text-align: center;
}
</style> 