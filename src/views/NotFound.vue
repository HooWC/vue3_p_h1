<template>
  <div class="not-found-page">
    <div class="not-found-content">
      <!-- 404 插图 -->
      <div class="illustration">
        <div class="error-number">
          <span class="digit">4</span>
          <span class="digit">0</span>
          <span class="digit">4</span>
        </div>
        
        <div class="floating-objects">
          <div class="floating-object obj-1">
            <svg viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
              <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" stroke-width="2"/>
              <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" stroke-width="2"/>
            </svg>
          </div>
          
          <div class="floating-object obj-2">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke="currentColor" stroke-width="2"/>
              <line x1="12" y1="9" x2="12" y2="13" stroke="currentColor" stroke-width="2"/>
              <line x1="12" y1="17" x2="12.01" y2="17" stroke="currentColor" stroke-width="2"/>
            </svg>
          </div>
          
          <div class="floating-object obj-3">
            <svg viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
              <line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" stroke-width="2"/>
              <line x1="12" y1="16" x2="12.01" y2="16" stroke="currentColor" stroke-width="2"/>
            </svg>
          </div>
          
          <div class="floating-object obj-4">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" stroke-width="2"/>
              <polyline points="9,22 9,12 15,12 15,22" stroke="currentColor" stroke-width="2"/>
            </svg>
          </div>
          
          <div class="floating-object obj-5">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" stroke="currentColor" stroke-width="2"/>
            </svg>
          </div>
          
          <div class="floating-object obj-6">
            <svg viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="7" height="7" stroke="currentColor" stroke-width="2"/>
              <rect x="14" y="3" width="7" height="7" stroke="currentColor" stroke-width="2"/>
              <rect x="14" y="14" width="7" height="7" stroke="currentColor" stroke-width="2"/>
              <rect x="3" y="14" width="7" height="7" stroke="currentColor" stroke-width="2"/>
            </svg>
          </div>
        </div>
      </div>
      
      <!-- 错误信息 -->
      <div class="error-info">
        <h1 class="error-title">页面未找到</h1>
        <p class="error-description">
          抱歉，您访问的页面不存在或已被移除。
          <br>
          请检查网址是否正确，或返回首页重新开始。
        </p>
        
        <!-- 建议操作 */
        <div class="error-suggestions">
          <h3>您可以尝试：</h3>
          <ul class="suggestions-list">
            <li>
              <svg viewBox="0 0 24 24" fill="none">
                <polyline points="1,4 1,10 7,10" stroke="currentColor" stroke-width="2"/>
                <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" stroke="currentColor" stroke-width="2"/>
              </svg>
              刷新页面重新加载
            </li>
            <li>
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" stroke-width="2"/>
                <polyline points="9,22 9,12 15,12 15,22" stroke="currentColor" stroke-width="2"/>
              </svg>
              返回首页重新导航
            </li>
            <li>
              <svg viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2"/>
                <path d="m21 21-4.35-4.35" stroke="currentColor" stroke-width="2"/>
              </svg>
              使用搜索功能查找内容
            </li>
            <li>
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" stroke-width="2"/>
                <polyline points="22,6 12,13 2,6" stroke="currentColor" stroke-width="2"/>
              </svg>
              联系我们获取帮助
            </li>
          </ul>
        </div>
        
        <!-- 操作按钮 -->
        <div class="error-actions">
          <router-link to="/" class="btn btn-primary">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" stroke-width="2"/>
              <polyline points="9,22 9,12 15,12 15,22" stroke="currentColor" stroke-width="2"/>
            </svg>
            返回首页
          </router-link>
          
          <button @click="goBack" class="btn btn-secondary">
            <svg viewBox="0 0 24 24" fill="none">
              <polyline points="15,18 9,12 15,6" stroke="currentColor" stroke-width="2"/>
            </svg>
            返回上页
          </button>
          
          <button @click="reportError" class="btn btn-outline">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke="currentColor" stroke-width="2"/>
              <line x1="12" y1="9" x2="12" y2="13" stroke="currentColor" stroke-width="2"/>
              <line x1="12" y1="17" x2="12.01" y2="17" stroke="currentColor" stroke-width="2"/>
            </svg>
            报告问题
          </button>
        </div>
        
        <!-- 热门页面推荐 -->
        <div class="popular-pages">
          <h3>热门页面</h3>
          <div class="pages-grid">
            <router-link to="/users" class="page-card">
              <div class="page-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="2"/>
                  <circle cx="8.5" cy="7" r="4" stroke="currentColor" stroke-width="2"/>
                  <line x1="20" y1="8" x2="20" y2="14" stroke="currentColor" stroke-width="2"/>
                  <line x1="23" y1="11" x2="17" y2="11" stroke="currentColor" stroke-width="2"/>
                </svg>
              </div>
              <div class="page-info">
                <h4>用户管理</h4>
                <p>查看和管理系统用户</p>
              </div>
            </router-link>
            
            <router-link to="/dashboard" class="page-card">
              <div class="page-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="3" width="7" height="7" stroke="currentColor" stroke-width="2"/>
                  <rect x="14" y="3" width="7" height="7" stroke="currentColor" stroke-width="2"/>
                  <rect x="14" y="14" width="7" height="7" stroke="currentColor" stroke-width="2"/>
                  <rect x="3" y="14" width="7" height="7" stroke="currentColor" stroke-width="2"/>
                </svg>
              </div>
              <div class="page-info">
                <h4>仪表盘</h4>
                <p>查看系统数据概览</p>
              </div>
            </router-link>
            
            <router-link to="/about" class="page-card">
              <div class="page-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                  <line x1="12" y1="16" x2="12" y2="12" stroke="currentColor" stroke-width="2"/>
                  <line x1="12" y1="8" x2="12.01" y2="8" stroke="currentColor" stroke-width="2"/>
                </svg>
              </div>
              <div class="page-info">
                <h4>关于我们</h4>
                <p>了解项目信息和团队</p>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app'

const router = useRouter()
const appStore = useAppStore()

const goBack = () => {
  if (window.history.length > 1) {
    router.go(-1)
  } else {
    router.push('/')
  }
}

const reportError = () => {
  appStore.addNotification({
    type: 'info',
    title: '问题已记录',
    message: '感谢您的反馈，我们会尽快处理这个问题！'
  })
}
</script>

<style scoped>
.not-found-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
  position: relative;
  overflow: hidden;
}

.not-found-page::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.1) 0%, transparent 50%);
  pointer-events: none;
}

.not-found-content {
  max-width: 1200px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 1;
}

/* 插图区域 */
.illustration {
  position: relative;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.error-number {
  display: flex;
  gap: 1rem;
  position: relative;
  z-index: 2;
}

.digit {
  font-size: 8rem;
  font-weight: 900;
  color: var(--primary-color);
  text-shadow: 0 0 30px rgba(59, 130, 246, 0.3);
  animation: pulse 2s ease-in-out infinite;
}

.digit:nth-child(2) {
  animation-delay: 0.3s;
  color: var(--error-color);
}

.digit:nth-child(3) {
  animation-delay: 0.6s;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.8; }
}

.floating-objects {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.floating-object {
  position: absolute;
  width: 60px;
  height: 60px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-md);
  animation: float 6s ease-in-out infinite;
  opacity: 0.7;
}

.floating-object svg {
  width: 30px;
  height: 30px;
  color: var(--text-secondary);
}

.obj-1 {
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.obj-2 {
  top: 20%;
  right: 15%;
  animation-delay: 1s;
}

.obj-3 {
  bottom: 30%;
  left: 20%;
  animation-delay: 2s;
}

.obj-4 {
  bottom: 15%;
  right: 25%;
  animation-delay: 3s;
}

.obj-5 {
  top: 50%;
  left: 5%;
  animation-delay: 4s;
}

.obj-6 {
  top: 60%;
  right: 5%;
  animation-delay: 5s;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  25% { transform: translateY(-20px) rotate(2deg); }
  50% { transform: translateY(-10px) rotate(-1deg); }
  75% { transform: translateY(-15px) rotate(1deg); }
}

/* 错误信息 */
.error-info {
  padding: 2rem;
}

.error-title {
  font-size: 3rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 1rem;
  line-height: 1.1;
}

.error-description {
  font-size: 1.25rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 3rem;
}

.error-suggestions {
  margin-bottom: 3rem;
}

.error-suggestions h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.suggestions-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.suggestions-list li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 0;
  color: var(--text-secondary);
  border-bottom: 1px solid var(--border-color);
}

.suggestions-list li:last-child {
  border-bottom: none;
}

.suggestions-list li svg {
  width: 18px;
  height: 18px;
  color: var(--primary-color);
  flex-shrink: 0;
}

.error-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 3rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 12px 20px;
  border-radius: var(--radius-md);
  font-weight: 500;
  text-decoration: none;
  transition: var(--transition);
  border: none;
  cursor: pointer;
  font-size: 14px;
}

.btn svg {
  width: 18px;
  height: 18px;
}

.btn-primary {
  background: var(--primary-color);
  color: white;
}

.btn-primary:hover {
  background: var(--primary-color-dark);
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
}

.btn-secondary {
  background: var(--bg-secondary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
}

.btn-secondary:hover {
  background: var(--bg-primary);
  border-color: var(--primary-color);
  color: var(--primary-color);
  transform: translateY(-2px);
}

.btn-outline {
  background: transparent;
  color: var(--text-secondary);
  border: 1px solid var(--border-color);
}

.btn-outline:hover {
  background: var(--bg-secondary);
  border-color: var(--error-color);
  color: var(--error-color);
  transform: translateY(-2px);
}

.popular-pages h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
}

.pages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.page-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  text-decoration: none;
  transition: var(--transition);
}

.page-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  border-color: var(--primary-color);
}

.page-icon {
  width: 40px;
  height: 40px;
  background: var(--primary-color-light);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.page-icon svg {
  width: 20px;
  height: 20px;
  color: var(--primary-color);
}

.page-info h4 {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
}

.page-info p {
  font-size: 0.75rem;
  color: var(--text-secondary);
  margin: 0;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .not-found-content {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
  
  .illustration {
    height: 300px;
  }
  
  .error-number .digit {
    font-size: 6rem;
  }
}

@media (max-width: 768px) {
  .not-found-page {
    padding: 1rem;
  }
  
  .error-title {
    font-size: 2rem;
  }
  
  .error-description {
    font-size: 1rem;
  }
  
  .error-number .digit {
    font-size: 4rem;
  }
  
  .error-actions {
    flex-direction: column;
  }
  
  .pages-grid {
    grid-template-columns: 1fr;
  }
  
  .floating-object {
    width: 40px;
    height: 40px;
  }
  
  .floating-object svg {
    width: 20px;
    height: 20px;
  }
}

@media (max-width: 480px) {
  .error-number {
    gap: 0.5rem;
  }
  
  .error-number .digit {
    font-size: 3rem;
  }
  
  .illustration {
    height: 200px;
  }
}
</style>
