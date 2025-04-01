<template>
  <div class="article-detail-page">
    <div class="article-container">
      <!-- 文章标题区 -->
      <div class="article-header">
        <h1 class="article-title">{{ article.title }}</h1>
        <div class="article-meta">
          <div class="meta-left">
            <span class="meta-item">
              <span class="meta-icon">👤</span>
              作者: Admin
            </span>
            <span class="meta-item">
              <span class="meta-icon">🕒</span>
              {{ formatDate(article.createTime) }}
            </span>
          </div>
          <div class="meta-right">
            <span class="meta-item">
              <span class="meta-icon">👁️</span>
              {{ formatNumber(article.viewCount) }} 阅读
            </span>
            <span class="meta-item">
              <span class="meta-icon">💬</span>
              {{ formatNumber(article.commentCount) }} 评论
            </span>
          </div>
        </div>
        <div class="article-category-tags">
          <router-link :to="`/category/${article.category?.id}`" class="category-link">
            {{ article.category?.name || '未分类' }}
          </router-link>
          <div class="article-tags">
            <router-link 
              v-for="tag in article.tags" 
              :key="tag.id" 
              :to="`/tag/${tag.id}`"
              class="tag-link"
            >
              #{{ tag.name }}
            </router-link>
          </div>
        </div>
      </div>

      <!-- 文章封面图 -->
      <div v-if="article.coverImage" class="article-cover">
        <img :src="article.coverImage" alt="文章封面" />
      </div>

      <!-- 文章内容 -->
      <div class="article-content" v-html="article.content"></div>

      <!-- 文章分享和点赞 -->
      <div class="article-actions">
        <div class="action-left">
          <button class="action-btn like-btn">
            <span class="action-icon">👍</span>
            <span>点赞</span>
            <span class="count">{{ article.likeCount || 0 }}</span>
          </button>
        </div>
        <div class="action-right">
          <button class="action-btn share-btn">
            <span class="action-icon">🔗</span>
            <span>分享</span>
          </button>
        </div>
      </div>

      <!-- 相关文章 -->
      <div class="related-articles">
        <h3 class="section-title">相关文章</h3>
        <div class="related-list">
          <div v-for="item in relatedArticles" :key="item.id" class="related-item">
            <router-link :to="`/article/${item.id}`" class="related-link">
              {{ item.title }}
            </router-link>
            <span class="related-date">{{ formatDate(item.createTime) }}</span>
          </div>
        </div>
      </div>

      <!-- 评论区 -->
      <div class="comments-section">
        <h3 class="section-title">评论区 ({{ article.commentCount || 0 }})</h3>
        
        <!-- 发表评论 -->
        <div class="comment-form">
          <textarea 
            v-model="commentContent" 
            placeholder="发表你的评论..." 
            rows="4"
          ></textarea>
          <button class="submit-comment-btn" @click="submitComment">发表评论</button>
        </div>

        <!-- 评论列表 -->
        <div class="comment-list">
          <div v-if="comments.length === 0" class="no-comments">暂无评论，快来发表第一条评论吧！</div>
          
          <div v-for="comment in comments" :key="comment.id" class="comment-item">
            <div class="comment-avatar">
              <img :src="comment.avatar || 'https://via.placeholder.com/50x50'" alt="用户头像">
            </div>
            <div class="comment-body">
              <div class="comment-info">
                <span class="comment-author">{{ comment.author }}</span>
                <span class="comment-date">{{ formatDate(comment.createTime) }}</span>
              </div>
              <div class="comment-content">{{ comment.content }}</div>
              <div class="comment-actions">
                <button class="reply-btn" @click="replyToComment(comment.id)">回复</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="article-sidebar">
      <!-- 作者信息 -->
      <div class="sidebar-section author-info">
        <h3 class="sidebar-title">关于作者</h3>
        <div class="author-card">
          <div class="author-avatar">
            <img src="https://via.placeholder.com/100x100" alt="作者头像">
          </div>
          <div class="author-name">Admin</div>
          <div class="author-bio">热爱技术的全栈开发者，喜欢分享学习心得和技术经验。</div>
          <div class="author-stats">
            <div class="stat-item">
              <div class="stat-value">15</div>
              <div class="stat-label">文章</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">128</div>
              <div class="stat-label">评论</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 热门文章 -->
      <div class="sidebar-section popular-articles">
        <h3 class="sidebar-title">热门文章</h3>
        <ul class="popular-list">
          <li v-for="article in popularArticles" :key="article.id" class="popular-item">
            <router-link :to="`/article/${article.id}`">
              {{ article.title }}
            </router-link>
            <div class="popular-meta">
              <span>
                <span class="meta-icon">👁️</span>
                {{ formatNumber(article.viewCount) }}
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useArticleStore } from '../stores/article'

const route = useRoute()
const articleStore = useArticleStore()
const commentContent = ref('')

// 文章详情数据
const article = ref({
  id: parseInt(route.params.id as string),
  title: '加载中...',
  content: '<p>文章内容加载中...</p>',
  summary: '',
  createTime: null,
  updateTime: null,
  viewCount: 0,
  commentCount: 0,
  likeCount: 0,
  category: null,
  tags: []
})

// 模拟评论数据
const comments = ref([
  {
    id: 1,
    author: '张三',
    avatar: '',
    content: '这篇文章写得非常棒，学到了很多知识！',
    createTime: '2023-05-20T08:30:00Z',
  },
  {
    id: 2,
    author: '李四',
    avatar: '',
    content: '内容深入浅出，解释得很清晰。期待更多此类内容！',
    createTime: '2023-05-19T16:45:00Z',
  }
])

// 模拟相关文章
const relatedArticles = ref([
  { id: 2, title: 'Spring Boot 3 与 Spring Security：构建安全的后端服务', createTime: '2023-05-10' },
  { id: 3, title: '全栈开发：前后端技术选型与架构设计', createTime: '2023-05-05' }
])

// 模拟热门文章
const popularArticles = ref([
  { id: 1, title: 'Vue 3 组合式 API 实战指南：打造高效的前端应用', viewCount: 1250 },
  { id: 2, title: 'Spring Boot 3 与 Spring Security：构建安全的后端服务', viewCount: 980 },
  { id: 3, title: '全栈开发：前后端技术选型与架构设计', viewCount: 750 },
  { id: 4, title: 'TypeScript 高级类型与实战技巧', viewCount: 680 },
  { id: 5, title: 'Redis缓存策略：从入门到精通', viewCount: 520 }
])

// 加载文章详情
const loadArticle = async () => {
  try {
    const articleId = route.params.id
    // 实际项目中，这里应该调用文章详情API
    // 这里使用模拟数据
    const result = await articleStore.fetchArticleById(articleId)
    
    if (result) {
      article.value = {
        ...result,
        content: `<p>这是文章的正文内容。在实际应用中，这里应该显示从服务器获取的文章详细内容。</p>
                  <p>Vue 3 的组合式 API 提供了一种更灵活的方式来组织和重用逻辑。相比于 Vue 2 的选项式 API，组合式 API 允许我们按照功能而不是选项类型来组织代码，这使得代码更易于理解和维护。</p>
                  <h2>为什么使用组合式 API</h2>
                  <p>组合式 API 的主要优势包括：</p>
                  <ul>
                    <li>更好的逻辑复用</li>
                    <li>更灵活的代码组织</li>
                    <li>更好的类型推断</li>
                    <li>更小的包体积</li>
                  </ul>
                  <h2>基本用法</h2>
                  <p>以下是一个简单的例子：</p>
                  <pre><code>import { ref, computed, onMounted } from 'vue'

export default {
  setup() {
    // 响应式状态
    const count = ref(0)
    
    // 计算属性
    const doubleCount = computed(() => count.value * 2)
    
    // 方法
    function increment() {
      count.value++
    }
    
    // 生命周期钩子
    onMounted(() => {
      console.log('组件已挂载')
    })
    
    // 暴露给模板
    return {
      count,
      doubleCount,
      increment
    }
  }
}</code></pre>
                  <p>这只是组合式 API 的一个简单示例，在实际项目中，您可以根据需要组合各种功能，创建更强大的组件。</p>`
      }
    }
  } catch (error) {
    console.error('获取文章详情失败', error)
  }
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

// 提交评论
const submitComment = () => {
  if (!commentContent.value.trim()) {
    alert('评论内容不能为空')
    return
  }
  
  // 在实际应用中，这里应该调用API提交评论
  // 这里仅作模拟
  const newComment = {
    id: comments.value.length + 1,
    author: '游客',
    avatar: '',
    content: commentContent.value,
    createTime: new Date().toISOString(),
  }
  
  comments.value.unshift(newComment)
  commentContent.value = ''
  article.value.commentCount = (article.value.commentCount || 0) + 1
}

// 回复评论
const replyToComment = (commentId: number) => {
  // 在实际应用中，这里应该打开回复表单
  console.log('回复评论:', commentId)
}

onMounted(() => {
  loadArticle()
})
</script>

<style scoped>
.article-detail-page {
  display: flex;
  gap: 30px;
}

.article-container {
  flex: 1;
  min-width: 0;
}

.article-sidebar {
  width: 300px;
}

@media (max-width: 900px) {
  .article-detail-page {
    flex-direction: column;
  }
  
  .article-sidebar {
    width: 100%;
  }
}

/* 文章标题区 */
.article-header {
  margin-bottom: 25px;
}

.article-title {
  font-size: 2.2rem;
  margin-bottom: 15px;
  color: #333;
  line-height: 1.3;
}

.article-meta {
  display: flex;
  justify-content: space-between;
  color: #666;
  margin-bottom: 15px;
  flex-wrap: wrap;
  gap: 10px;
}

.meta-left, .meta-right {
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

.article-category-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 20px;
}

.category-link {
  display: inline-block;
  background-color: #3498db;
  color: white;
  padding: 5px 15px;
  border-radius: 20px;
  text-decoration: none;
  font-size: 0.9rem;
}

.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tag-link {
  color: #666;
  text-decoration: none;
  background-color: #f5f5f5;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 0.85rem;
}

.tag-link:hover {
  background-color: #e0e0e0;
}

/* 文章封面 */
.article-cover {
  margin-bottom: 25px;
  border-radius: 8px;
  overflow: hidden;
}

.article-cover img {
  width: 100%;
  max-height: 400px;
  object-fit: cover;
}

/* 文章内容 */
.article-content {
  line-height: 1.8;
  color: #333;
  margin-bottom: 40px;
  font-size: 1.1rem;
}

.article-content h2 {
  margin-top: 30px;
  margin-bottom: 20px;
  font-size: 1.6rem;
  color: #333;
}

.article-content p {
  margin-bottom: 20px;
}

.article-content ul, .article-content ol {
  margin-bottom: 20px;
  padding-left: 20px;
}

.article-content li {
  margin-bottom: 10px;
}

.article-content pre {
  background-color: #f5f7fa;
  padding: 15px;
  border-radius: 8px;
  overflow-x: auto;
  margin-bottom: 20px;
}

.article-content code {
  font-family: 'Courier New', Courier, monospace;
}

/* 文章操作 */
.article-actions {
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
  padding: 20px 0;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
}

.action-btn {
  border: none;
  background-color: #f5f7fa;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s;
}

.action-btn:hover {
  background-color: #e0e0e0;
}

.like-btn .count {
  margin-left: 3px;
  font-weight: bold;
}

/* 相关文章 */
.related-articles {
  margin-bottom: 40px;
}

.section-title {
  font-size: 1.4rem;
  margin-bottom: 20px;
  color: #333;
  position: relative;
  padding-left: 15px;
}

.section-title::before {
  content: '';
  position: absolute;
  left: 0;
  top: 5px;
  bottom: 5px;
  width: 4px;
  background-color: #3498db;
  border-radius: 2px;
}

.related-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.related-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: #f5f7fa;
  border-radius: 8px;
}

.related-link {
  color: #333;
  text-decoration: none;
  font-weight: 500;
  flex: 1;
}

.related-link:hover {
  color: #3498db;
}

.related-date {
  color: #999;
  font-size: 0.9rem;
}

/* 评论区 */
.comments-section {
  margin-bottom: 40px;
}

.comment-form {
  margin-bottom: 30px;
}

.comment-form textarea {
  width: 100%;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  resize: vertical;
  font-family: inherit;
  font-size: 1rem;
  margin-bottom: 15px;
}

.comment-form textarea:focus {
  outline: none;
  border-color: #3498db;
}

.submit-comment-btn {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.submit-comment-btn:hover {
  background-color: #2980b9;
}

.no-comments {
  text-align: center;
  padding: 30px;
  color: #666;
  background-color: #f5f7fa;
  border-radius: 8px;
}

.comment-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.comment-item {
  display: flex;
  gap: 15px;
  padding: 20px;
  background-color: #f5f7fa;
  border-radius: 8px;
}

.comment-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
}

.comment-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.comment-body {
  flex: 1;
}

.comment-info {
  margin-bottom: 10px;
}

.comment-author {
  font-weight: bold;
  color: #333;
}

.comment-date {
  margin-left: 10px;
  color: #999;
  font-size: 0.9rem;
}

.comment-content {
  line-height: 1.6;
  color: #333;
  margin-bottom: 10px;
}

.comment-actions {
  display: flex;
  gap: 10px;
}

.reply-btn {
  background: none;
  border: none;
  color: #3498db;
  cursor: pointer;
  padding: 0;
  font-size: 0.9rem;
}

.reply-btn:hover {
  text-decoration: underline;
}

/* 侧边栏 */
.sidebar-section {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 20px;
  margin-bottom: 30px;
}

.sidebar-title {
  font-size: 1.2rem;
  margin-bottom: 20px;
  color: #333;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

/* 作者信息 */
.author-card {
  text-align: center;
}

.author-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto 15px;
}

.author-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.author-name {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
}

.author-bio {
  color: #666;
  margin-bottom: 20px;
  line-height: 1.6;
}

.author-stats {
  display: flex;
  justify-content: center;
  gap: 30px;
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: #3498db;
}

.stat-label {
  color: #666;
  font-size: 0.9rem;
}

/* 热门文章 */
.popular-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.popular-item {
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.popular-item:last-child {
  border-bottom: none;
}

.popular-item a {
  color: #333;
  text-decoration: none;
  display: block;
  margin-bottom: 5px;
}

.popular-item a:hover {
  color: #3498db;
}

.popular-meta {
  color: #999;
  font-size: 0.85rem;
}
</style> 