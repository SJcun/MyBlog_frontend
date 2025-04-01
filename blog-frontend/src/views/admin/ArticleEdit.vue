<template>
  <div class="article-edit">
    <div class="page-header">
      <h1>{{ isEdit ? '编辑文章' : '写文章' }}</h1>
    </div>
    
    <div class="edit-form">
      <div class="form-group">
        <label for="title">标题</label>
        <input id="title" type="text" v-model="article.title" placeholder="请输入文章标题">
      </div>
      
      <div class="form-row">
        <div class="form-group">
          <label for="category">分类</label>
          <select id="category" v-model="article.categoryId">
            <option value="">请选择分类</option>
            <option value="1">技术</option>
            <option value="2">教程</option>
            <option value="3">心得</option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="status">状态</label>
          <select id="status" v-model="article.status">
            <option value="published">发布</option>
            <option value="draft">草稿</option>
          </select>
        </div>
      </div>
      
      <div class="form-group">
        <label for="tags">标签</label>
        <div class="tags-input">
          <div v-for="(tag, index) in article.tags" :key="index" class="tag-item">
            {{ tag }}
            <span class="remove-tag" @click="removeTag(index)">×</span>
          </div>
          <input 
            type="text" 
            v-model="tagInput" 
            @keydown.enter.prevent="addTag"
            placeholder="输入标签后按回车添加"
          >
        </div>
      </div>
      
      <div class="form-group">
        <label for="cover">封面图片</label>
        <div class="cover-upload">
          <div class="cover-preview" v-if="article.coverImage">
            <img :src="article.coverImage" alt="封面图片">
            <button class="remove-cover" @click="removeCover">删除</button>
          </div>
          <button class="upload-btn" v-else>上传图片</button>
        </div>
      </div>
      
      <div class="form-group">
        <label for="summary">摘要</label>
        <textarea id="summary" v-model="article.summary" rows="3" placeholder="请输入文章摘要"></textarea>
      </div>
      
      <div class="form-group">
        <label for="content">内容</label>
        <div class="editor-container">
          <textarea id="content" v-model="article.content" rows="15" placeholder="请输入文章内容"></textarea>
        </div>
      </div>
      
      <div class="form-actions">
        <button class="cancel-btn" @click="cancel">取消</button>
        <button class="save-btn" @click="saveAsDraft">保存草稿</button>
        <button class="publish-btn" @click="publish">发布文章</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// 判断是编辑还是新建
const isEdit = computed(() => !!route.params.id)

// 文章数据
const article = ref({
  id: '',
  title: '',
  categoryId: '',
  status: 'published',
  tags: [],
  coverImage: '',
  summary: '',
  content: ''
})

// 标签输入
const tagInput = ref('')

// 添加标签
const addTag = () => {
  if (tagInput.value && !article.value.tags.includes(tagInput.value)) {
    article.value.tags.push(tagInput.value)
    tagInput.value = ''
  }
}

// 删除标签
const removeTag = (index: number) => {
  article.value.tags.splice(index, 1)
}

// 删除封面
const removeCover = () => {
  article.value.coverImage = ''
}

// 保存草稿
const saveAsDraft = () => {
  article.value.status = 'draft'
  saveArticle()
}

// 发布文章
const publish = () => {
  article.value.status = 'published'
  saveArticle()
}

// 保存文章
const saveArticle = () => {
  console.log('保存文章:', article.value)
  // 实际应用中应调用API
  router.push('/admin/article')
}

// 取消
const cancel = () => {
  router.go(-1)
}

// 获取文章数据
const getArticle = async (id: string) => {
  console.log('获取文章:', id)
  // 实际应用中应调用API
  // 模拟数据
  article.value = {
    id,
    title: '示例文章标题',
    categoryId: '1',
    status: 'published',
    tags: ['Vue', '前端'],
    coverImage: '',
    summary: '这是文章摘要，简要介绍文章的主要内容和要点。',
    content: '这是文章正文内容，详细阐述文章的核心观点和内容。'
  }
}

onMounted(() => {
  if (isEdit.value) {
    getArticle(route.params.id as string)
  }
})
</script>

<style scoped>
.article-edit {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.page-header {
  margin-bottom: 20px;
}

h1 {
  font-size: 1.8rem;
  color: #333;
}

.edit-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
}

input, select, textarea {
  padding: 10px 12px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  transition: border-color 0.3s;
}

input:focus, select:focus, textarea:focus {
  outline: none;
  border-color: #409eff;
}

.tags-input {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 8px 12px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  transition: border-color 0.3s;
}

.tags-input:focus-within {
  border-color: #409eff;
}

.tags-input input {
  border: none;
  outline: none;
  flex-grow: 1;
  min-width: 100px;
  padding: 4px 0;
}

.tag-item {
  display: flex;
  align-items: center;
  background-color: #ecf5ff;
  color: #409eff;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.9rem;
}

.remove-tag {
  margin-left: 5px;
  cursor: pointer;
  font-weight: bold;
}

.cover-upload {
  display: flex;
  align-items: center;
}

.cover-preview {
  position: relative;
  margin-right: 15px;
}

.cover-preview img {
  width: 200px;
  height: 120px;
  object-fit: cover;
  border-radius: 4px;
}

.remove-cover {
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.upload-btn {
  padding: 10px 20px;
  background-color: #f5f7fa;
  border: 1px dashed #dcdfe6;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.upload-btn:hover {
  border-color: #409eff;
  color: #409eff;
}

.editor-container {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 20px;
}

.cancel-btn, .save-btn, .publish-btn {
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.cancel-btn {
  background-color: white;
  border: 1px solid #dcdfe6;
  color: #606266;
}

.cancel-btn:hover {
  border-color: #c6e2ff;
  color: #409eff;
}

.save-btn {
  background-color: #e6a23c;
  color: white;
  border: none;
}

.save-btn:hover {
  background-color: #d4921a;
}

.publish-btn {
  background-color: #409eff;
  color: white;
  border: none;
}

.publish-btn:hover {
  background-color: #337ecc;
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style> 