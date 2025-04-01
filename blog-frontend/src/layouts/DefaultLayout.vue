<template>
  <div class="layout-default">
    <header class="layout-header">
      <div class="container">
        <div class="nav-container">
          <a href="/" class="logo">
            <span class="logo-icon">📝</span>
            <span class="logo-text">我的博客</span>
          </a>
          
          <ul class="nav-links">
            <li><a href="/"><span class="nav-icon">🏠</span> 首页</a></li>
            <li><a href="/category"><span class="nav-icon">📚</span> 分类</a></li>
            <li><a href="/tag"><span class="nav-icon">🏷️</span> 标签</a></li>
            <li><a href="/about"><span class="nav-icon">👤</span> 关于我</a></li>
            <li><a href="/search"><span class="nav-icon">🔍</span> 搜索</a></li>
          </ul>
        </div>
      </div>
    </header>
    
    <main class="main-content">
      <div class="container">
        <router-view />
      </div>
    </main>
    
    <footer class="layout-footer">
      <div class="container">
        <p>© {{ new Date().getFullYear() }} 我的博客 | 由 ❤️ 和 ☕ 驱动</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.layout-default {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.layout-header {
  background-color: white;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 100;
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
}

.logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #3498db;
  font-weight: bold;
  font-size: 1.3rem;
}

.logo-icon {
  margin-right: 8px;
  font-size: 1.5rem;
}

.nav-links {
  display: flex;
  list-style: none;
}

.nav-links li {
  margin-left: 20px;
}

.nav-links a {
  display: flex;
  align-items: center;
  color: #333;
  text-decoration: none;
  font-weight: 500;
}

.nav-links a:hover {
  color: #3498db;
}

.nav-icon {
  margin-right: 5px;
}

.main-content {
  flex-grow: 1;
  margin-top: 70px;
  padding: 30px 0;
}

.layout-footer {
  background-color: white;
  box-shadow: 0 -2px 5px rgba(0,0,0,0.05);
  padding: 20px 0;
  text-align: center;
  color: #555;
}

@media (max-width: 768px) {
  .nav-links {
    display: none;
  }
}
</style> 