<template>
  <div class="article-manage">
    <div class="page-header">
      <h1>文章管理</h1>
      <router-link to="/admin/article/edit" class="add-btn">写文章</router-link>
    </div>
    
    <div class="filter-bar">
      <div class="search-box">
        <input type="text" placeholder="搜索文章标题..." v-model="searchKeyword">
        <button class="search-btn">搜索</button>
      </div>
      
      <div class="filter-options">
        <select v-model="categoryFilter">
          <option value="">所有分类</option>
          <option value="1">技术</option>
          <option value="2">教程</option>
          <option value="3">心得</option>
        </select>
        
        <select v-model="statusFilter">
          <option value="">所有状态</option>
          <option value="published">已发布</option>
          <option value="draft">草稿</option>
        </select>
      </div>
    </div>
    
    <div class="article-table">
      <table>
        <thead>
          <tr>
            <th style="width: 50px">ID</th>
            <th>标题</th>
            <th style="width: 120px">分类</th>
            <th style="width: 100px">状态</th>
            <th style="width: 150px">发布时间</th>
            <th style="width: 150px">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="article in articles" :key="article.id">
            <td>{{ article.id }}</td>
            <td class="article-title">{{ article.title }}</td>
            <td>{{ article.category }}</td>
            <td>
              <span class="status-tag" :class="article.status">
                {{ article.status === 'published' ? '已发布' : '草稿' }}
              </span>
            </td>
            <td>{{ article.createTime }}</td>
            <td class="action-buttons">
              <router-link :to="`/admin/article/edit/${article.id}`" class="edit-btn">编辑</router-link>
              <button class="delete-btn" @click="deleteArticle(article.id)">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <div class="pagination">
      <button class="page-btn">上一页</button>
      <span class="page-info">1/3</span>
      <button class="page-btn">下一页</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 搜索和过滤
const searchKeyword = ref('')
const categoryFilter = ref('')
const statusFilter = ref('')

// 模拟文章数据
const articles = [
  { id: 1, title: 'Vue 3 组合式 API 实战指南：打造高效的前端应用', category: '技术', status: 'published', createTime: '2023-05-15' },
  { id: 2, title: 'Spring Boot 3 与 Spring Security：构建安全的后端服务', category: '教程', status: 'published', createTime: '2023-05-10' },
  { id: 3, title: '全栈开发：前后端技术选型与架构设计', category: '心得', status: 'draft', createTime: '2023-05-05' },
  { id: 4, title: 'TypeScript 高级类型与实战技巧', category: '技术', status: 'published', createTime: '2023-04-28' },
  { id: 5, title: 'Redis缓存策略：从入门到精通', category: '教程', status: 'draft', createTime: '2023-04-20' }
]

// 删除文章
const deleteArticle = (id: number) => {
  if (confirm(`确定要删除ID为${id}的文章吗？`)) {
    console.log('删除文章:', id)
    // 实际应用中应调用API
  }
}
</script>

<style scoped>
.article-manage {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

h1 {
  font-size: 1.8rem;
  color: #333;
}

.add-btn {
  background-color: #409eff;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.3s;
}

.add-btn:hover {
  background-color: #337ecc;
}

.filter-bar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 15px;
}

.search-box {
  display: flex;
  width: 300px;
}

.search-box input {
  flex-grow: 1;
  padding: 8px 12px;
  border: 1px solid #dcdfe6;
  border-radius: 4px 0 0 4px;
  outline: none;
}

.search-btn {
  background-color: #409eff;
  color: white;
  padding: 0 15px;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
}

.filter-options {
  display: flex;
  gap: 10px;
}

.filter-options select {
  padding: 8px 12px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  outline: none;
  background-color: white;
}

.article-table {
  margin-bottom: 20px;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #ebeef5;
}

th {
  font-weight: bold;
  color: #606266;
  background-color: #f5f7fa;
}

.article-title {
  max-width: 400px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.status-tag {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 0.85rem;
}

.status-tag.published {
  background-color: #67c23a;
  color: white;
}

.status-tag.draft {
  background-color: #909399;
  color: white;
}

.action-buttons {
  display: flex;
  gap: 10px;
}

.edit-btn, .delete-btn {
  padding: 4px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
}

.edit-btn {
  background-color: #409eff;
  color: white;
  text-decoration: none;
}

.delete-btn {
  background-color: #f56c6c;
  color: white;
  border: none;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
}

.page-btn {
  padding: 8px 15px;
  border: 1px solid #dcdfe6;
  background-color: white;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.page-btn:hover {
  color: #409eff;
  border-color: #c6e2ff;
}

.page-info {
  color: #606266;
}

@media (max-width: 768px) {
  .filter-bar {
    flex-direction: column;
  }
  
  .search-box {
    width: 100%;
  }
  
  .filter-options {
    width: 100%;
  }
  
  .action-buttons {
    flex-direction: column;
    gap: 5px;
  }
}
</style> 