<template>
  <div class="tag-card">
    <h3 class="widget-title">
      <span class="widget-icon">🏷️</span>
      标签
    </h3>
    
    <div class="tag-cloud">
      <router-link
        v-for="tag in tags"
        :key="tag.id"
        :to="`/tag/${tag.id}`"
        class="tag-item"
        :style="tagStyle(tag.articleCount)"
      >
        {{ tag.name }}
      </router-link>
      
      <div v-if="loading" class="loading-tags">
        <el-skeleton :rows="3" animated />
      </div>
      
      <div v-if="!loading && tags.length === 0" class="empty-tags">
        暂无标签
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useArticleStore } from '../../stores/article'

const articleStore = useArticleStore()
const tags = ref([])
const loading = ref(true)

// 获取标签列表
const getTags = async () => {
  try {
    loading.value = true
    const result = await articleStore.fetchTags()
    tags.value = result || []
  } catch (error) {
    console.error('获取标签失败', error)
  } finally {
    loading.value = false
  }
}

// 根据文章数量计算标签样式
const tagStyle = (count: number) => {
  // 找出最大文章数
  const maxCount = Math.max(...tags.value.map(t => t.articleCount), 1)
  
  // 计算字体大小比例 (12px ~ 20px)
  const minFontSize = 12
  const maxFontSize = 20
  const fontSize = minFontSize + (count / maxCount) * (maxFontSize - minFontSize)
  
  // 计算透明度 (0.7 ~ 1)
  const opacity = 0.7 + (count / maxCount) * 0.3
  
  return {
    fontSize: `${fontSize}px`,
    opacity
  }
}

onMounted(() => {
  getTags()
})
</script>

<style lang="scss" scoped>
.tag-card {
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

.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  
  .tag-item {
    display: inline-block;
    padding: 5px 12px;
    background-color: var(--light-gray);
    border-radius: 20px;
    color: var(--dark-gray);
    text-decoration: none;
    transition: all 0.3s;
    
    &:hover {
      background-color: var(--primary-color);
      color: white;
      transform: translateY(-2px);
      box-shadow: 0 2px 8px rgba(52, 152, 219, 0.3);
    }
  }
}

.loading-tags, .empty-tags {
  width: 100%;
  margin-top: 10px;
  color: var(--dark-gray);
  font-size: 0.9rem;
  text-align: center;
}
</style> 