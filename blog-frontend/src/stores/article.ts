import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useArticleStore = defineStore('article', () => {
  // 状态
  const articles = ref([])
  const categories = ref([])
  const tags = ref([])
  const isLoading = ref(false)
  const total = ref(0)

  // 模拟API调用
  async function fetchArticles(params = { page: 1, size: 10 }) {
    try {
      isLoading.value = true
      
      // 模拟API延迟
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // 模拟文章数据
      const mockArticles = [
        {
          id: 1,
          title: 'Vue 3 组合式 API 实战指南：打造高效的前端应用',
          summary: 'Vue 3 带来了组合式 API，它是对 Vue 2 选项式 API 的重大改进。本文将深入探讨组合式 API 的核心概念、使用方法以及实际应用场景，帮助你更好地理解和应用这一强大特性。',
          createTime: '2023-05-15',
          viewCount: 1250,
          commentCount: 28,
          category: { id: 1, name: '技术' },
          tags: [
            { id: 1, name: 'Vue' },
            { id: 2, name: '前端' }
          ]
        },
        {
          id: 2,
          title: 'Spring Boot 3 与 Spring Security：构建安全的后端服务',
          summary: 'Spring Boot 3 和 Spring Security 为构建安全的后端服务提供了强大的支持。本文将介绍如何在 Spring Boot 3 中集成 Spring Security，实现用户认证、授权以及保护 API 安全的最佳实践。',
          createTime: '2023-05-10',
          viewCount: 980,
          commentCount: 15,
          category: { id: 2, name: '教程' },
          tags: [
            { id: 3, name: 'Spring' },
            { id: 4, name: '后端' },
            { id: 5, name: '安全' }
          ]
        },
        {
          id: 3,
          title: '全栈开发：前后端技术选型与架构设计',
          summary: '在构建现代 Web 应用时，选择合适的技术栈和架构设计至关重要。本文分享我在全栈开发中的经验，探讨如何选择前后端技术，以及如何设计可扩展、高性能的应用架构。',
          createTime: '2023-05-05',
          viewCount: 750,
          commentCount: 12,
          category: { id: 3, name: '心得' },
          tags: [
            { id: 6, name: '全栈' },
            { id: 7, name: '架构' }
          ]
        }
      ]
      
      // 模拟分页
      const totalItems = 15
      const totalPages = Math.ceil(totalItems / params.size)
      
      articles.value = mockArticles
      total.value = totalItems
      
      return {
        content: mockArticles,
        totalElements: totalItems,
        totalPages: totalPages,
        size: params.size,
        number: params.page,
        first: params.page === 1,
        last: params.page === totalPages
      }
    } catch (error) {
      console.error('获取文章列表失败', error)
      return null
    } finally {
      isLoading.value = false
    }
  }

  async function fetchArticleById(id: number | string) {
    try {
      isLoading.value = true
      
      // 模拟API延迟
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // 查找对应ID的文章
      const article = articles.value.find(a => a.id == id)
      
      if (!article) {
        throw new Error(`文章不存在: ${id}`)
      }
      
      return article
    } catch (error) {
      console.error(`获取文章${id}失败`, error)
      return null
    } finally {
      isLoading.value = false
    }
  }

  async function fetchCategories() {
    try {
      // 模拟分类数据
      const mockCategories = [
        { id: 1, name: '技术', articleCount: 8 },
        { id: 2, name: '教程', articleCount: 5 },
        { id: 3, name: '心得', articleCount: 3 },
        { id: 4, name: '项目', articleCount: 2 },
        { id: 5, name: '生活', articleCount: 1 }
      ]
      
      categories.value = mockCategories
      return mockCategories
    } catch (error) {
      console.error('获取分类失败', error)
      return []
    }
  }

  async function fetchTags() {
    try {
      // 模拟标签数据
      const mockTags = [
        { id: 1, name: 'Vue', articleCount: 5 },
        { id: 2, name: '前端', articleCount: 8 },
        { id: 3, name: 'Spring', articleCount: 4 },
        { id: 4, name: '后端', articleCount: 6 },
        { id: 5, name: '安全', articleCount: 2 },
        { id: 6, name: '全栈', articleCount: 3 },
        { id: 7, name: '架构', articleCount: 4 }
      ]
      
      tags.value = mockTags
      return mockTags
    } catch (error) {
      console.error('获取标签失败', error)
      return []
    }
  }

  return {
    articles,
    categories,
    tags,
    isLoading,
    total,
    fetchArticles,
    fetchArticleById,
    fetchCategories,
    fetchTags
  }
}) 