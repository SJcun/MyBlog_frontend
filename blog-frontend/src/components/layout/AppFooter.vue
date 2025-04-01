<template>
  <footer class="app-footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-logo">
          <span class="footer-logo-icon">📝</span>
          <h2>我的博客</h2>
          <p class="footer-desc">分享技术、知识与生活的个人空间</p>
        </div>
        
        <div class="footer-links">
          <div class="footer-section">
            <h3>快速链接</h3>
            <ul>
              <li v-for="item in quickLinks" :key="item.path">
                <router-link :to="item.path">{{ item.title }}</router-link>
              </li>
            </ul>
          </div>
          
          <div class="footer-section">
            <h3>技术栈</h3>
            <ul>
              <li v-for="(tech, index) in techStack" :key="index">
                <a :href="tech.link" target="_blank">{{ tech.name }}</a>
              </li>
            </ul>
          </div>
          
          <div class="footer-section">
            <h3>联系我</h3>
            <ul class="contact-links">
              <li v-for="(contact, index) in contactInfo" :key="index">
                <a :href="contact.link" target="_blank">
                  <span class="contact-icon">{{ contact.icon }}</span>
                  <span>{{ contact.text }}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <div class="copyright">
          © {{ currentYear }} 我的博客 | 由 ❤️ 和 ☕ 驱动
        </div>
        <div class="powered-by">
          Powered by <a href="https://vuejs.org/" target="_blank">Vue 3</a> + 
          <a href="https://spring.io/projects/spring-boot" target="_blank">Spring Boot 3</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// 快速链接
const quickLinks = [
  { title: '首页', path: '/' },
  { title: '文章归档', path: '/archive' },
  { title: '分类', path: '/category' },
  { title: '标签', path: '/tag' },
  { title: '关于我', path: '/about' }
]

// 技术栈
const techStack = [
  { name: 'Vue 3', link: 'https://vuejs.org/' },
  { name: 'Spring Boot 3', link: 'https://spring.io/projects/spring-boot' },
  { name: 'Element Plus', link: 'https://element-plus.org/' },
  { name: 'MySQL', link: 'https://www.mysql.com/' },
  { name: 'Redis', link: 'https://redis.io/' }
]

// 联系方式
const contactInfo = [
  { icon: '📧', text: 'example@example.com', link: 'mailto:example@example.com' },
  { icon: '📱', text: '关注我的微信公众号', link: '#' },
  { icon: '💻', text: 'GitHub', link: 'https://github.com/' }
]

// 当前年份
const currentYear = computed(() => new Date().getFullYear())
</script>

<style lang="scss" scoped>
.app-footer {
  background-color: white;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
  padding: 60px 0 20px;
  margin-top: 50px;
}

.footer-content {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  margin-bottom: 40px;
}

.footer-logo {
  flex: 1;
  min-width: 250px;
  
  .footer-logo-icon {
    font-size: 2.5rem;
    color: var(--primary-color);
    margin-bottom: 10px;
    display: inline-block;
  }
  
  h2 {
    font-size: 1.8rem;
    margin: 10px 0;
    color: var(--primary-color);
  }
  
  .footer-desc {
    color: var(--dark-gray);
    margin-top: 10px;
    font-size: 0.95rem;
    max-width: 300px;
  }
}

.footer-links {
  flex: 2;
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  
  .footer-section {
    flex: 1;
    min-width: 150px;
    
    h3 {
      font-size: 1.2rem;
      margin-bottom: 15px;
      position: relative;
      padding-bottom: 10px;
      
      &:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 40px;
        height: 3px;
        background-color: var(--primary-color);
      }
    }
    
    ul {
      list-style: none;
      
      li {
        margin-bottom: 10px;
        
        a {
          color: var(--dark-gray);
          text-decoration: none;
          transition: color 0.3s;
          
          &:hover {
            color: var(--primary-color);
          }
        }
      }
    }
    
    .contact-links {
      li a {
        display: flex;
        align-items: center;
        
        .contact-icon {
          margin-right: 8px;
          font-size: 1.2rem;
        }
      }
    }
  }
}

.footer-bottom {
  border-top: 1px solid #eee;
  padding-top: 20px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
  color: var(--dark-gray);
  font-size: 0.9rem;
  
  a {
    color: var(--primary-color);
    text-decoration: none;
  }
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    gap: 30px;
  }
  
  .footer-bottom {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 15px;
  }
}
</style> 