<template>
  <div class="not-found">
    <div class="not-found-content">
      <div class="error-code">404</div>
      <h1>页面不存在</h1>
      <p>抱歉，您访问的页面不存在或已被移除</p>
      <router-link to="/" class="back-home">
        <el-button type="primary">返回首页</el-button>
      </router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.not-found {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
}

.not-found-content {
  max-width: 500px;
}

.error-code {
  font-size: 8rem;
  font-weight: 700;
  color: var(--primary-color);
  line-height: 1;
  margin-bottom: 20px;
  opacity: 0.8;
}

h1 {
  font-size: 2rem;
  margin-bottom: 15px;
  color: var(--text-color);
}

p {
  font-size: 1.1rem;
  color: var(--dark-gray);
  margin-bottom: 30px;
}

.back-home {
  display: inline-block;
}
</style> 