<template>
  <div class="article-card">
    <div class="article-img" :style="{ background: getBackground(article.id) }">
      <span class="article-category">{{ getCategoryName() }}</span>
    </div>
    <div class="article-content">
      <h3 class="article-title">
        <router-link :to="`/article/${article.id}`">
          {{ article.title }}
        </router-link>
      </h3>
      <p class="article-excerpt">{{ article.summary }}</p>
      <div class="article-meta">
        <div class="meta-info">
          <span class="meta-item">
            <span class="meta-icon">🕒</span>
            {{ formatDate(article.createTime) }}
          </span>
          <span class="meta-item">
            <span class="meta-icon">👁️</span>
            {{ formatNumber(article.viewCount) }}
          </span>
          <span class="meta-item">
            <span class="meta-icon">💬</span>
            {{ formatNumber(article.commentCount) }}
          </span>
        </div>
        <div class="article-tags">
          <span class="article-tag" v-for="tag in article.tags" :key="tag.id">
            {{ tag.name }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

// 定义文章属性
const props = defineProps({
  article: {
    type: Object,
    required: true
  }
})

// 获取文章分类名称
function getCategoryName() {
  return props.article.category?.name || '未分类'
}

// 获取文章背景色
function getBackground(id: number) {
  const colors = [
    'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6)), #3498db',
    'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6)), #2ecc71',
    'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6)), #e74c3c'
  ]
  return colors[id % colors.length]
}

// 格式化日期
function formatDate(date: string | null) {
  if (!date) return ''
  return new Date(date).toLocaleDateString()
}

// 格式化数字
function formatNumber(num: number) {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k'
  }
  return num
}
</script>

<style scoped>
.article-card {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s;
}

.article-card:hover {
  transform: translateY(-5px);
}

.article-img {
  height: 200px;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: flex-end;
  padding: 15px;
}

.article-category {
  background-color: #3498db;
  color: white;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 0.9rem;
  display: inline-block;
}

.article-content {
  padding: 20px;
}

.article-title {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.article-title a {
  color: #333;
  text-decoration: none;
  transition: color 0.3s;
}

.article-title a:hover {
  color: #3498db;
}

.article-excerpt {
  color: #555;
  margin-bottom: 15px;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  color: #777;
  font-size: 0.9rem;
}

.meta-info {
  display: flex;
  gap: 15px;
}

.meta-item {
  display: flex;
  align-items: center;
}

.meta-icon {
  margin-right: 5px;
}

.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.article-tag {
  background-color: #f5f5f5;
  padding: 3px 10px;
  border-radius: 15px;
  font-size: 0.8rem;
}

@media (max-width: 768px) {
  .article-meta {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style> 