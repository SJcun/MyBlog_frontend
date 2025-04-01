<template>
  <div class="category-page">
    <div class="category-header">
      <h1 class="category-title">
        <span v-if="category">{{ category.name }}</span>
        <span v-else>所有分类</span>
      </h1>
      <p class="category-description" v-if="category">
        {{ category.description || `与"${category.name}"相关的所有文章` }}
      </p>
    </div>

    <!-- 分类列表 -->
    <div class="category-list" v-if="!category">
      <div class="category-item" v-for="cat in categories" :key="cat.id">
        <router-link :to="`/category/${cat.id}`" class="category-link">
          <span class="category-name">{{ cat.name }}</span>
          <span class="article-count">{{ cat.articleCount }}篇文章</span>
        </router-link>
      </div>
    </div>

    <!-- 文章列表 -->
    <div class="article-list" v-else>
      <div v-if="isLoading" class="loading-indicator">加载中...</div>
      
      <div v-else-if="articles.length === 0" class="empty-message">
        该分类下暂无文章
      </div>
      
      <article-card 
        v-else
        v-for="article in articles" 
        :key="article.id" 
        :article="article"
      />
    </div>

    <!-- 分页控件 -->
    <div class="pagination" v-if="category && totalPages > 1">
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
const categories = ref([])
const category = ref(null)
const totalPages = ref(1)
const currentPage = ref(1)
const pageSize = 10

// 计算当前要展示的分类ID
const categoryId = computed(() => route.params.id)

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

// 加载分类和文章
const loadCategoryData = async () => {
  if (categoryId.value) {
    await loadCategoryDetail()
    await loadArticlesByCategory()
  } else {
    await loadCategories()
  }
}

// 加载分类列表
const loadCategories = async () => {
  isLoading.value = true
  try {
    const result = await articleStore.fetchCategories()
    categories.value = result
  } catch (error) {
    console.error('获取分类列表失败', error)
  } finally {
    isLoading.value = false
  }
}

// 加载分类详情
const loadCategoryDetail = async () => {
  // 在实际应用中，这里应该调用API获取分类详情
  // 这里使用简化的模拟数据
  const id = categoryId.value
  const categories = await articleStore.fetchCategories()
  category.value = categories.find(c => c.id == id) || {
    id,
    name: '分类' + id,
    description: '',
    articleCount: 0
  }
}

// 加载分类下的文章
const loadArticlesByCategory = async () => {
  isLoading.value = true
  try {
    // 在实际应用中，这里应该调用API获取分类下的文章
    // params可以包含分页信息
    const params = {
      page: currentPage.value,
      size: pageSize,
      categoryId: categoryId.value
    }
    
    const result = await articleStore.fetchArticles(params)
    if (result) {
      articles.value = result.content
      totalPages.value = result.totalPages
    }
  } catch (error) {
    console.error('获取分类文章失败', error)
  } finally {
    isLoading.value = false
  }
}

// 切换页码
const changePage = (page) => {
  if (page < 1 || page > totalPages.value) return
  
  currentPage.value = page
  // 更新路由，保留当前分类ID
  router.push({
    path: `/category/${categoryId.value}`,
    query: { page }
  })
}

// 监听路由变化
watch(
  () => route.params.id,
  async () => {
    category.value = null
    currentPage.value = parseInt(route.query.page as string) || 1
    await loadCategoryData()
  }
)

// 监听页码变化
watch(
  () => route.query.page,
  (newPage) => {
    currentPage.value = parseInt(newPage as string) || 1
    if (categoryId.value) {
      loadArticlesByCategory()
    }
  }
)

onMounted(async () => {
  currentPage.value = parseInt(route.query.page as string) || 1
  await loadCategoryData()
})
</script>

<style scoped>
.category-page {
  min-height: 70vh;
}

.category-header {
  margin-bottom: 30px;
  background-color: white;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  text-align: center;
}

.category-title {
  font-size: 2rem;
  margin-bottom: 15px;
  color: #3498db;
}

.category-description {
  color: #666;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
}

/* 分类列表样式 */
.category-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.category-item {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s, box-shadow 0.3s;
}

.category-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.category-link {
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #333;
  text-decoration: none;
}

.category-name {
  font-size: 1.2rem;
  font-weight: 500;
}

.article-count {
  background-color: #f5f7fa;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 0.9rem;
  color: #666;
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