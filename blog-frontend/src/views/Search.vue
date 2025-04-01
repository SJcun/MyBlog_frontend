<template>
  <div class="search-page">
    <div class="search-header">
      <h1 class="search-title">搜索</h1>
      
      <div class="search-box">
        <input 
          type="text" 
          v-model="keyword" 
          placeholder="输入关键词搜索..." 
          @keyup.enter="search"
          class="search-input"
        />
        <button class="search-btn" @click="search">搜索</button>
      </div>
      
      <div class="advanced-options" :class="{ 'is-expanded': showAdvanced }">
        <div class="toggle-advanced" @click="toggleAdvanced">
          {{ showAdvanced ? '收起高级选项' : '展开高级选项' }}
        </div>
        
        <div class="advanced-filters" v-if="showAdvanced">
          <div class="filter-group">
            <label>分类</label>
            <select v-model="filters.categoryId">
              <option value="">所有分类</option>
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                {{ cat.name }}
              </option>
            </select>
          </div>
          
          <div class="filter-group">
            <label>标签</label>
            <select v-model="filters.tagId">
              <option value="">所有标签</option>
              <option v-for="tag in tags" :key="tag.id" :value="tag.id">
                {{ tag.name }}
              </option>
            </select>
          </div>
          
          <div class="filter-group">
            <label>时间范围</label>
            <select v-model="filters.timeRange">
              <option value="">不限</option>
              <option value="day">最近一天</option>
              <option value="week">最近一周</option>
              <option value="month">最近一个月</option>
              <option value="year">最近一年</option>
            </select>
          </div>
          
          <div class="filter-group">
            <label>排序方式</label>
            <select v-model="filters.sort">
              <option value="relevance">相关度</option>
              <option value="newest">最新发布</option>
              <option value="oldest">最早发布</option>
              <option value="views">浏览量</option>
              <option value="comments">评论数</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- 搜索结果 -->
    <div class="search-results">
      <!-- 搜索提示 -->
      <div class="search-info" v-if="hasSearched">
        <template v-if="isLoading">
          <div class="loading-indicator">正在搜索...</div>
        </template>
        <template v-else-if="articles.length === 0">
          <div class="no-results">
            <span class="no-results-icon">🔍</span>
            <p>抱歉，没有找到与 <strong>"{{ lastKeyword }}"</strong> 相关的内容</p>
            <p class="suggestions">建议：</p>
            <ul>
              <li>请检查您的拼写</li>
              <li>尝试使用更通用的关键词</li>
              <li>尝试使用相关的同义词</li>
            </ul>
          </div>
        </template>
        <template v-else>
          <div class="results-count">
            找到 <strong>{{ totalItems }}</strong> 条与 <strong>"{{ lastKeyword }}"</strong> 相关的结果
          </div>
        </template>
      </div>

      <!-- 文章列表 -->
      <div class="article-list" v-if="hasSearched && !isLoading && articles.length > 0">
        <article-card 
          v-for="article in articles" 
          :key="article.id" 
          :article="article"
        />
      </div>

      <!-- 搜索提示 -->
      <div class="search-tips" v-if="!hasSearched">
        <div class="tips-icon">💡</div>
        <h3>搜索提示</h3>
        <ul>
          <li>输入关键词后按回车键或点击搜索按钮</li>
          <li>多个关键词用空格分隔，例如：<strong>Vue 3 组合式API</strong></li>
          <li>使用引号可以进行精确搜索，例如：<strong>"组合式API"</strong></li>
          <li>使用高级选项可以进行更精确的筛选</li>
        </ul>
        
        <h3 class="popular-title">热门搜索</h3>
        <div class="popular-searches">
          <button 
            v-for="(term, index) in popularSearches" 
            :key="index" 
            class="popular-term"
            @click="keyword = term; search()"
          >
            {{ term }}
          </button>
        </div>
      </div>

      <!-- 分页控件 -->
      <div class="pagination" v-if="hasSearched && !isLoading && totalPages > 1">
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

// 搜索状态
const isLoading = ref(false)
const keyword = ref('')
const lastKeyword = ref('')
const hasSearched = ref(false)
const showAdvanced = ref(false)
const articles = ref([])
const totalItems = ref(0)
const totalPages = ref(1)
const currentPage = ref(1)
const pageSize = 10

// 高级筛选选项
const filters = ref({
  categoryId: '',
  tagId: '',
  timeRange: '',
  sort: 'relevance'
})

// 分类和标签数据
const categories = ref([])
const tags = ref([])

// 热门搜索
const popularSearches = [
  'Vue 3',
  'Spring Boot',
  '全栈开发',
  'TypeScript',
  'Redis',
  '前端框架',
  '后端架构'
]

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

// 切换高级选项显示
const toggleAdvanced = () => {
  showAdvanced.value = !showAdvanced.value
}

// 执行搜索
const search = async () => {
  if (!keyword.value.trim() && !hasAdvancedFilters()) {
    return
  }
  
  lastKeyword.value = keyword.value
  hasSearched.value = true
  currentPage.value = 1
  
  // 更新路由
  router.push({
    path: '/search',
    query: buildQueryParams()
  })
  
  await fetchSearchResults()
}

// 检查是否有高级筛选条件
const hasAdvancedFilters = () => {
  return Object.values(filters.value).some(value => value !== '')
}

// 构建查询参数
const buildQueryParams = () => {
  const params = { page: currentPage.value }
  
  if (keyword.value.trim()) {
    params['q'] = keyword.value.trim()
  }
  
  Object.entries(filters.value).forEach(([key, value]) => {
    if (value) {
      params[key] = value
    }
  })
  
  return params
}

// 搜索结果
const fetchSearchResults = async () => {
  isLoading.value = true
  
  try {
    // 在实际应用中，这里应该调用搜索API
    // 这里使用模拟数据
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // 如果有关键词，过滤模拟文章数据
    const params = {
      page: currentPage.value,
      size: pageSize,
      keyword: lastKeyword.value,
      ...filters.value
    }
    
    const result = await articleStore.fetchArticles(params)
    if (result) {
      articles.value = result.content
      totalItems.value = result.totalElements
      totalPages.value = result.totalPages
    }
  } catch (error) {
    console.error('搜索失败', error)
  } finally {
    isLoading.value = false
  }
}

// 切换页码
const changePage = (page) => {
  if (page < 1 || page > totalPages.value) return
  
  currentPage.value = page
  
  // 更新路由
  const query = { ...route.query, page }
  router.push({ path: '/search', query })
}

// 从URL参数中加载搜索条件
const loadSearchParamsFromUrl = () => {
  const query = route.query
  
  // 关键词
  if (query.q) {
    keyword.value = query.q as string
    lastKeyword.value = keyword.value
    hasSearched.value = true
  }
  
  // 页码
  if (query.page) {
    currentPage.value = parseInt(query.page as string)
  }
  
  // 高级筛选
  if (query.categoryId) filters.value.categoryId = query.categoryId as string
  if (query.tagId) filters.value.tagId = query.tagId as string
  if (query.timeRange) filters.value.timeRange = query.timeRange as string
  if (query.sort) filters.value.sort = query.sort as string
  
  // 如果有搜索条件，立即执行搜索
  if (hasSearched.value) {
    fetchSearchResults()
  }
}

// 加载分类和标签
const loadCategoriesAndTags = async () => {
  try {
    const categoriesResult = await articleStore.fetchCategories()
    categories.value = categoriesResult
    
    const tagsResult = await articleStore.fetchTags()
    tags.value = tagsResult
  } catch (error) {
    console.error('获取分类和标签失败', error)
  }
}

// 监听路由变化
watch(
  () => route.query,
  () => {
    loadSearchParamsFromUrl()
  }
)

onMounted(() => {
  loadCategoriesAndTags()
  loadSearchParamsFromUrl()
})
</script>

<style scoped>
.search-page {
  min-height: 70vh;
}

/* 搜索头部 */
.search-header {
  background-color: white;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  margin-bottom: 30px;
}

.search-title {
  font-size: 2rem;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
}

.search-box {
  display: flex;
  max-width: 700px;
  margin: 0 auto 20px;
}

.search-input {
  flex-grow: 1;
  padding: 12px 15px;
  border: 2px solid #ddd;
  border-right: none;
  border-radius: 8px 0 0 8px;
  font-size: 1.1rem;
  outline: none;
  transition: border-color 0.3s;
}

.search-input:focus {
  border-color: #3498db;
}

.search-btn {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 0 25px;
  border-radius: 0 8px 8px 0;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.search-btn:hover {
  background-color: #2980b9;
}

/* 高级选项 */
.advanced-options {
  max-width: 700px;
  margin: 0 auto;
}

.toggle-advanced {
  text-align: center;
  color: #3498db;
  cursor: pointer;
  padding: 5px;
  font-size: 0.9rem;
}

.toggle-advanced:hover {
  text-decoration: underline;
}

.advanced-filters {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #eee;
}

.filter-group {
  display: flex;
  flex-direction: column;
}

.filter-group label {
  margin-bottom: 5px;
  font-size: 0.9rem;
  color: #666;
}

.filter-group select {
  padding: 8px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
}

/* 搜索结果 */
.search-results {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.search-info {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.loading-indicator {
  text-align: center;
  padding: 20px;
  color: #666;
}

.results-count {
  color: #666;
}

.no-results {
  text-align: center;
  padding: 30px;
}

.no-results-icon {
  font-size: 3rem;
  display: block;
  margin-bottom: 15px;
}

.suggestions {
  margin-top: 20px;
  font-weight: bold;
}

.no-results ul {
  text-align: left;
  max-width: 300px;
  margin: 10px auto;
  color: #666;
}

.no-results li {
  margin-bottom: 8px;
}

/* 搜索提示 */
.search-tips {
  background-color: white;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  text-align: center;
}

.tips-icon {
  font-size: 3rem;
  margin-bottom: 15px;
}

.search-tips h3 {
  margin-bottom: 15px;
  color: #333;
}

.search-tips ul {
  list-style-type: none;
  padding: 0;
  margin: 0 0 30px;
  text-align: left;
  max-width: 600px;
  margin: 0 auto 30px;
}

.search-tips li {
  margin-bottom: 10px;
  padding-left: 20px;
  position: relative;
  color: #666;
}

.search-tips li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: #3498db;
}

.popular-title {
  margin-top: 30px;
}

.popular-searches {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin-top: 15px;
}

.popular-term {
  background-color: #f5f7fa;
  border: none;
  padding: 8px 15px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s;
}

.popular-term:hover {
  background-color: #e0e0e0;
  color: #3498db;
}

/* 文章列表 */
.article-list {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

/* 分页控件 */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 40px;
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

@media (max-width: 768px) {
  .advanced-filters {
    grid-template-columns: 1fr;
  }
}
</style> 