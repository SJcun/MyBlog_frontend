<template>
  <div class="tag-page">
    <div class="tag-header">
      <h1 class="tag-title">
        <span v-if="tag">标签: #{{ tag.name }}</span>
        <span v-else>所有标签</span>
      </h1>
      <p class="tag-description" v-if="tag">
        {{ tag.description || `与"${tag.name}"标签相关的所有文章` }}
      </p>
    </div>

    <!-- 标签云 -->
    <div class="tag-cloud" v-if="!tag">
      <router-link 
        v-for="t in tags" 
        :key="t.id" 
        :to="`/tag/${t.id}`" 
        class="cloud-tag"
        :style="{ fontSize: getTagSize(t.articleCount) }"
      >
        #{{ t.name }} <span class="tag-count">({{ t.articleCount }})</span>
      </router-link>
    </div>

    <!-- 文章列表 -->
    <div class="article-list" v-else>
      <div v-if="isLoading" class="loading-indicator">加载中...</div>
      
      <div v-else-if="articles.length === 0" class="empty-message">
        该标签下暂无文章
      </div>
      
      <article-card 
        v-else
        v-for="article in articles" 
        :key="article.id" 
        :article="article"
      />
    </div>

    <!-- 分页控件 -->
    <div class="pagination" v-if="tag && totalPages > 1">
      <button 
        class="page-btn prev" 
        :disabled="currentPage === 1"
        @click="changePage(currentPage - 1)"
      >
        上一页
      </button>
      
      <div class="page-numbers">
        <button 
          v-for="page in displayedPages" 
          :key="page" 
          class="page-number" 
          :class="{ active: page === currentPage }"
          @click="changePage(page)"
        >
          {{ page }}
        </button>
      </div>
      
      <button 
        class="page-btn next" 
        :disabled="currentPage === totalPages"
        @click="changePage(currentPage + 1)"
      >
        下一页
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useArticleStore } from '../stores/article'
import ArticleCard from '../components/article/ArticleCard.vue'

const route = useRoute()
const router = useRouter()
const articleStore = useArticleStore()

// 状态
const isLoading = ref(false)
const articles = ref([])
const tags = ref([])
const tag = ref(null)
const totalPages = ref(1)
const currentPage = ref(1)
const pageSize = 10

// 计算当前要展示的标签ID
const tagId = computed(() => route.params.id)

// 计算要显示的分页数字
const displayedPages = computed(() => {
  const pages = []
  const totalPagesValue = totalPages.value
  const currentPageValue = currentPage.value
  
  let startPage = Math.max(1, currentPageValue - 2)
  let endPage = Math.min(startPage + 4, totalPagesValue)
  
  if (endPage - startPage < 4) {
    startPage = Math.max(1, endPage - 4)
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }
  
  return pages
})

// 根据文章数量计算标签大小
const getTagSize = (count) => {
  const min = 0.9
  const max = 1.6
  const maxCount = Math.max(...tags.value.map(t => t.articleCount))
  const minCount = Math.min(...tags.value.map(t => t.articleCount))
  
  if (maxCount === minCount) return `${min}rem`
  
  const size = min + ((count - minCount) / (maxCount - minCount)) * (max - min)
  return `${size}rem`
}

// 加载标签和文章
const loadTagData = async () => {
  if (tagId.value) {
    await loadTagDetail()
    await loadArticlesByTag()
  } else {
    await loadTags()
  }
}

// 加载标签列表
const loadTags = async () => {
  isLoading.value = true
  try {
    const result = await articleStore.fetchTags()
    tags.value = result
  } catch (error) {
    console.error('获取标签列表失败', error)
  } finally {
    isLoading.value = false
  }
}

// 加载标签详情
const loadTagDetail = async () => {
  // 在实际应用中，这里应该调用API获取标签详情
  // 这里使用简化的模拟数据
  const id = tagId.value
  const tags = await articleStore.fetchTags()
  tag.value = tags.find(t => t.id == id) || {
    id,
    name: '标签' + id,
    description: '',
    articleCount: 0
  }
}

// 加载标签下的文章
const loadArticlesByTag = async () => {
  isLoading.value = true
  try {
    // 在实际应用中，这里应该调用API获取标签下的文章
    // params可以包含分页信息
    const params = {
      page: currentPage.value,
      size: pageSize,
      tagId: tagId.value
    }
    
    // 由于目前的articleStore没有根据标签筛选的功能
    // 这里简单复用fetchArticles并假装过滤了
    const result = await articleStore.fetchArticles(params)
    if (result) {
      articles.value = result.content
      totalPages.value = result.totalPages
    }
  } catch (error) {
    console.error('获取标签文章失败', error)
  } finally {
    isLoading.value = false
  }
}

// 切换页码
const changePage = (page) => {
  if (page < 1 || page > totalPages.value) return
  
  currentPage.value = page
  // 更新路由，保留当前标签ID
  router.push({
    path: `/tag/${tagId.value}`,
    query: { page }
  })
}

// 监听路由变化
watch(
  () => route.params.id,
  async () => {
    tag.value = null
    currentPage.value = parseInt(route.query.page as string) || 1
    await loadTagData()
  }
)

// 监听页码变化
watch(
  () => route.query.page,
  (newPage) => {
    currentPage.value = parseInt(newPage as string) || 1
    if (tagId.value) {
      loadArticlesByTag()
    }
  }
)

onMounted(async () => {
  currentPage.value = parseInt(route.query.page as string) || 1
  await loadTagData()
})
</script>

<style scoped>
.tag-page {
  min-height: 70vh;
}

.tag-header {
  margin-bottom: 30px;
  background-color: white;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  text-align: center;
}

.tag-title {
  font-size: 2rem;
  margin-bottom: 15px;
  color: #3498db;
}

.tag-description {
  color: #666;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
}

/* 标签云样式 */
.tag-cloud {
  background-color: white;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  margin-bottom: 40px;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
}

.cloud-tag {
  color: #3498db;
  text-decoration: none;
  padding: 8px 15px;
  border-radius: 20px;
  background-color: #f0f8ff;
  transition: all 0.3s;
  display: inline-block;
}

.cloud-tag:hover {
  background-color: #3498db;
  color: white;
  transform: translateY(-3px);
}

.tag-count {
  font-size: 0.8em;
  opacity: 0.7;
}

/* 文章列表样式 */
.article-list {
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-bottom: 40px;
}

.loading-indicator, .empty-message {
  text-align: center;
  padding: 50px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  color: #666;
}

/* 分页控件 */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 50px;
}

.page-btn {
  background-color: white;
  border: 1px solid #ddd;
  padding: 8px 15px;
  border-radius: 4px;
  cursor: pointer;
  color: #333;
  transition: all 0.3s;
}

.page-btn:hover:not(:disabled) {
  background-color: #f5f7fa;
  border-color: #3498db;
  color: #3498db;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-numbers {
  display: flex;
  margin: 0 10px;
}

.page-number {
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
  border-radius: 4px;
  border: 1px solid #ddd;
  background-color: white;
  cursor: pointer;
  transition: all 0.3s;
}

.page-number:hover {
  border-color: #3498db;
  color: #3498db;
}

.page-number.active {
  background-color: #3498db;
  color: white;
  border-color: #3498db;
}
</style> 