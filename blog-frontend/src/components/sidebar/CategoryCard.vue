<template>
  <div class="category-card">
    <h3 class="widget-title">
      <span class="widget-icon">📚</span>
      分类
    </h3>
    
    <ul class="category-list">
      <li v-for="category in categories" :key="category.id">
        <router-link :to="`/category/${category.id}`" class="category-item">
          <span class="category-name">{{ category.name }}</span>
          <span class="category-count">{{ category.articleCount }}</span>
        </router-link>
      </li>
      <div v-if="loading" class="loading-categories">
        <el-skeleton :rows="5" animated />
      </div>
      <div v-if="!loading && categories.length === 0" class="empty-categories">
        暂无分类
      </div>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useArticleStore } from '../../stores/article'

const articleStore = useArticleStore()
const categories = ref([])
const loading = ref(true)

// 获取分类列表
const getCategories = async () => {
  try {
    loading.value = true
    const result = await articleStore.fetchCategories()
    categories.value = result || []
  } catch (error) {
    console.error('获取分类失败', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getCategories()
})
</script>

<style lang="scss" scoped>
.category-card {
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

.category-list {
  list-style: none;
  
  li {
    margin-bottom: 10px;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  .category-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
    border-radius: 4px;
    text-decoration: none;
    color: var(--text-color);
    transition: all 0.3s;
    
    &:hover {
      color: var(--primary-color);
      padding-left: 5px;
    }
    
    .category-count {
      background-color: var(--light-gray);
      border-radius: 20px;
      padding: 2px 10px;
      font-size: 0.8rem;
      color: var(--dark-gray);
      transition: background-color 0.3s, color 0.3s;
    }
    
    &:hover .category-count {
      background-color: var(--primary-color);
      color: white;
    }
  }
}

.loading-categories, .empty-categories {
  margin-top: 15px;
  color: var(--dark-gray);
  font-size: 0.9rem;
  text-align: center;
}
</style> 