<template>
  <div class="dashboard">
    <h1>控制台</h1>
    <p>欢迎使用博客管理系统！</p>
    
    <div class="dashboard-stats">
      <div class="stat-card">
        <div class="stat-icon">📄</div>
        <div class="stat-info">
          <div class="stat-value">12</div>
          <div class="stat-label">文章</div>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon">📚</div>
        <div class="stat-info">
          <div class="stat-value">5</div>
          <div class="stat-label">分类</div>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon">🏷️</div>
        <div class="stat-info">
          <div class="stat-value">18</div>
          <div class="stat-label">标签</div>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon">💬</div>
        <div class="stat-info">
          <div class="stat-value">24</div>
          <div class="stat-label">评论</div>
        </div>
      </div>
    </div>
    
    <div class="dashboard-cards">
      <div class="quick-actions card">
        <h2>快速操作</h2>
        <div class="action-buttons">
          <router-link to="/admin/article/edit" class="action-btn">
            <span>📝</span> 写文章
          </router-link>
          <router-link to="/admin/category" class="action-btn">
            <span>➕</span> 添加分类
          </router-link>
          <router-link to="/admin/tag" class="action-btn">
            <span>🔖</span> 添加标签
          </router-link>
          <router-link to="/admin/profile" class="action-btn">
            <span>👤</span> 个人资料
          </router-link>
        </div>
      </div>
      
      <div class="recent-comments card">
        <h2>最近评论</h2>
        <div class="comment-list">
          <div class="comment-item">
            <div class="comment-author">张三</div>
            <div class="comment-content">这篇文章写得很好，非常有启发性！</div>
            <div class="comment-meta">2023-05-15 15:30 来自《Vue 3 组合式 API 实战指南》</div>
          </div>
          <div class="comment-item">
            <div class="comment-author">李四</div>
            <div class="comment-content">谢谢分享，学到了很多知识。</div>
            <div class="comment-meta">2023-05-14 10:25 来自《Spring Boot 3 与 Spring Security》</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  padding: 10px;
}

h1 {
  margin-bottom: 20px;
  font-size: 1.8rem;
  color: #333;
}

.dashboard-stats {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  align-items: center;
}

.stat-icon {
  font-size: 2.5rem;
  margin-right: 20px;
}

.stat-value {
  font-size: 1.8rem;
  font-weight: bold;
  color: #333;
}

.stat-label {
  color: #606266;
  margin-top: 5px;
}

.dashboard-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 20px;
}

.card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
}

.card h2 {
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
  font-size: 1.3rem;
  color: #333;
}

.action-buttons {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}

.action-btn {
  background-color: #f5f7fa;
  border-radius: 8px;
  padding: 15px 20px;
  color: #606266;
  text-decoration: none;
  display: flex;
  align-items: center;
  transition: all 0.3s;
}

.action-btn:hover {
  background-color: #ecf5ff;
  color: #409eff;
}

.action-btn span {
  font-size: 1.3rem;
  margin-right: 10px;
}

.comment-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.comment-item {
  padding: 15px;
  border-radius: 8px;
  background-color: #f5f7fa;
}

.comment-author {
  font-weight: bold;
  margin-bottom: 5px;
  color: #333;
}

.comment-content {
  margin-bottom: 8px;
  color: #606266;
}

.comment-meta {
  font-size: 0.9rem;
  color: #909399;
}

@media (max-width: 768px) {
  .dashboard-stats {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .dashboard-cards {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .dashboard-stats {
    grid-template-columns: 1fr;
  }
  
  .action-buttons {
    grid-template-columns: 1fr;
  }
}
</style> 