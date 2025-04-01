<template>
  <div class="home-page">
    <!-- 首页Banner -->
    <div class="home-banner">
      <div class="banner-content">
        <h1 class="banner-title">我的个人博客</h1>
        <p class="banner-desc">记录学习、总结经验、分享知识</p>
      </div>
    </div>
    
    <!-- 文章列表 -->
    <div class="article-section">
      <h2 class="section-title">
        <span class="section-icon">📝</span>
        最新文章
      </h2>
      
      <div class="article-list">
        <div class="article-card" v-for="article in mockArticles" :key="article.id">
          <div class="article-img" :style="{ background: getBackground(article.id) }">
            <span class="article-category">{{ article.category }}</span>
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
                  {{ article.date }}
                </span>
                <span class="meta-item">
                  <span class="meta-icon">👁️</span>
                  {{ article.views }}
                </span>
                <span class="meta-item">
                  <span class="meta-icon">💬</span>
                  {{ article.comments }}
                </span>
              </div>
              <div class="article-tags">
                <span class="article-tag" v-for="tag in article.tags" :key="tag">
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 模拟文章数据
const mockArticles = [
  {
    id: 1,
    title: 'Vue 3 组合式 API 实战指南：打造高效的前端应用',
    summary: 'Vue 3 带来了组合式 API，它是对 Vue 2 选项式 API 的重大改进。本文将深入探讨组合式 API 的核心概念、使用方法以及实际应用场景，帮助你更好地理解和应用这一强大特性。',
    category: '技术',
    date: '2023-05-15',
    views: 1250,
    comments: 28,
    tags: ['Vue', '前端']
  },
  {
    id: 2,
    title: 'Spring Boot 3 与 Spring Security：构建安全的后端服务',
    summary: 'Spring Boot 3 和 Spring Security 为构建安全的后端服务提供了强大的支持。本文将介绍如何在 Spring Boot 3 中集成 Spring Security，实现用户认证、授权以及保护 API 安全的最佳实践。',
    category: '教程',
    date: '2023-05-10',
    views: 980,
    comments: 15,
    tags: ['Spring', '后端', '安全']
  },
  {
    id: 3,
    title: '全栈开发：前后端技术选型与架构设计',
    summary: '在构建现代 Web 应用时，选择合适的技术栈和架构设计至关重要。本文分享我在全栈开发中的经验，探讨如何选择前后端技术，以及如何设计可扩展、高性能的应用架构。',
    category: '心得',
    date: '2023-05-05',
    views: 750,
    comments: 12,
    tags: ['全栈', '架构']
  }
]

// 获取文章背景色
function getBackground(id: number) {
  const colors = [
    'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6)), #3498db',
    'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6)), #2ecc71',
    'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6)), #e74c3c'
  ]
  return colors[id % colors.length]
}
</script>

<style lang="scss" scoped>
.home-page {
  min-height: 100vh;
}

.home-banner {
  height: 300px;
  background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  margin-bottom: 40px;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.banner-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 15px;
}

.banner-desc {
  font-size: 1.2rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
}

.article-section {
  margin-bottom: 50px;
}

.section-title {
  font-size: 1.8rem;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  border-left: 4px solid #3498db;
  padding-left: 15px;
}

.section-icon {
  margin-right: 10px;
}

.article-list {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

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
  .home-banner {
    height: 250px;
  }
  
  .banner-title {
    font-size: 2rem;
  }
  
  .banner-desc {
    font-size: 1rem;
  }
  
  .article-meta {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style> 