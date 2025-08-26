<template>
  <div class="home-page">
    <!-- 英雄区域 -->
    <section class="hero-section">
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">
            欢迎使用
            <span class="gradient-text">Vue3 现代化应用</span>
          </h1>
          <p class="hero-description">
            基于 Vue 3 + Vite + Pinia + Vue Router 构建的现代化单页应用。
            使用 Composition API、TypeScript 支持和响应式设计。
          </p>
          <div class="hero-actions">
            <router-link to="/users" class="btn btn-primary">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="2"/>
                <circle cx="8.5" cy="7" r="4" stroke="currentColor" stroke-width="2"/>
                <line x1="20" y1="8" x2="20" y2="14" stroke="currentColor" stroke-width="2"/>
                <line x1="23" y1="11" x2="17" y2="11" stroke="currentColor" stroke-width="2"/>
              </svg>
              用户管理
            </router-link>
            <router-link to="/about" class="btn btn-secondary">
              了解更多
            </router-link>
          </div>
        </div>
        <div class="hero-image">
          <div class="floating-cards">
            <div class="card card-1">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="currentColor" stroke-width="2"/>
                <path d="M12 22V12" stroke="currentColor" stroke-width="2"/>
                <path d="M2 7L12 12L22 7" stroke="currentColor" stroke-width="2"/>
              </svg>
              <span>Vue 3</span>
            </div>
            <div class="card card-2">
              <svg viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="7" height="7" stroke="currentColor" stroke-width="2"/>
                <rect x="14" y="3" width="7" height="7" stroke="currentColor" stroke-width="2"/>
                <rect x="14" y="14" width="7" height="7" stroke="currentColor" stroke-width="2"/>
                <rect x="3" y="14" width="7" height="7" stroke="currentColor" stroke-width="2"/>
              </svg>
              <span>Pinia</span>
            </div>
            <div class="card card-3">
              <svg viewBox="0 0 24 24" fill="none">
                <polyline points="22,12 18,12 15,21 9,3 6,12 2,12" stroke="currentColor" stroke-width="2"/>
              </svg>
              <span>Vite</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 功能特性 -->
    <section class="features-section">
      <div class="section-header">
        <h2>核心特性</h2>
        <p>现代化的前端技术栈，提供最佳的开发体验</p>
      </div>
      
      <div class="features-grid">
        <div v-for="feature in features" :key="feature.title" class="feature-card">
          <div class="feature-icon" :style="{ backgroundColor: feature.color }">
            <svg viewBox="0 0 24 24" fill="none">
              <path :d="feature.icon" stroke="white" stroke-width="2"/>
            </svg>
          </div>
          <h3 class="feature-title">{{ feature.title }}</h3>
          <p class="feature-description">{{ feature.description }}</p>
        </div>
      </div>
    </section>

    <!-- 统计数据 -->
    <section class="stats-section">
      <div class="stats-grid">
        <div v-for="stat in stats" :key="stat.label" class="stat-card">
          <div class="stat-value">{{ stat.value }}</div>
          <div class="stat-label">{{ stat.label }}</div>
        </div>
      </div>
    </section>

    <!-- 快速开始 -->
    <section class="quick-start-section">
      <div class="section-header">
        <h2>快速开始</h2>
        <p>通过以下步骤快速体验应用功能</p>
      </div>
      
      <div class="steps-container">
        <div v-for="(step, index) in quickStartSteps" :key="index" class="step-card">
          <div class="step-number">{{ index + 1 }}</div>
          <div class="step-content">
            <h3>{{ step.title }}</h3>
            <p>{{ step.description }}</p>
            <router-link v-if="step.link" :to="step.link" class="step-link">
              {{ step.linkText }}
              <svg viewBox="0 0 24 24" fill="none">
                <line x1="7" y1="17" x2="17" y2="7" stroke="currentColor" stroke-width="2"/>
                <polyline points="7,7 17,7 17,17" stroke="currentColor" stroke-width="2"/>
              </svg>
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const features = ref([
  {
    title: 'Vue 3 Composition API',
    description: '使用最新的 Composition API 编写更简洁、可维护的代码',
    icon: 'M12 2L2 7V17L12 22L22 17V7L12 2Z M12 22V12 M2 7L12 12L22 7',
    color: '#4ade80'
  },
  {
    title: 'Pinia 状态管理',
    description: '轻量级、类型安全的状态管理解决方案',
    icon: 'M3 3H7V7H3zM14 3H18V7H14zM14 14H18V18H14zM3 14H7V18H3z',
    color: '#f59e0b'
  },
  {
    title: 'Vue Router',
    description: '官方路由管理器，支持嵌套路由和路由守卫',
    icon: 'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z',
    color: '#3b82f6'
  },
  {
    title: '响应式设计',
    description: '完美适配桌面端和移动端设备',
    icon: 'M4 3H20A1 1 0 0 1 21 4V20A1 1 0 0 1 20 21H4A1 1 0 0 1 3 20V4A1 1 0 0 1 4 3z M9 9V15 M9 15H15 M15 9V15',
    color: '#8b5cf6'
  },
  {
    title: 'Axios 集成',
    description: '内置 HTTP 客户端，支持拦截器和请求/响应转换',
    icon: 'M13 2L3 14H12L11 22L21 10H12L13 2z',
    color: '#ef4444'
  },
  {
    title: '暗色主题',
    description: '支持明暗主题切换，提供更好的用户体验',
    icon: 'M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z',
    color: '#06b6d4'
  }
])

const stats = computed(() => [
  {
    value: userStore.userCount.toString().padStart(2, '0'),
    label: '用户总数'
  },
  {
    value: userStore.activeUsers.length.toString().padStart(2, '0'),
    label: '活跃用户'
  },
  {
    value: '06',
    label: '核心功能'
  },
  {
    value: '100%',
    label: '响应式'
  }
])

const quickStartSteps = [
  {
    title: '浏览用户管理',
    description: '查看用户列表，了解数据展示和交互功能',
    link: '/users',
    linkText: '查看用户'
  },
  {
    title: '体验状态管理',
    description: '尝试登录功能，感受 Pinia 状态管理的便利',
    link: '/dashboard',
    linkText: '访问仪表盘'
  },
  {
    title: '切换主题',
    description: '点击右上角主题按钮，体验明暗主题切换',
    linkText: '了解更多'
  }
]
</script>

<style scoped>
.home-page {
  min-height: 100vh;
}

/* 英雄区域 */
.hero-section {
  padding: 4rem 0 6rem;
  background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 70% 80%, rgba(16, 185, 129, 0.1) 0%, transparent 50%);
  pointer-events: none;
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 1;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  color: var(--text-primary);
}

.gradient-text {
  background: linear-gradient(135deg, var(--primary-color), #10b981);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-description {
  font-size: 1.25rem;
  color: var(--text-secondary);
  margin-bottom: 2.5rem;
  line-height: 1.6;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  border-radius: var(--radius-lg);
  font-weight: 600;
  text-decoration: none;
  transition: var(--transition);
  border: none;
  cursor: pointer;
  font-size: 1rem;
}

.btn svg {
  width: 20px;
  height: 20px;
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
  border: 2px solid var(--border-color);
}

.btn-secondary:hover {
  background: var(--bg-primary);
  border-color: var(--primary-color);
  color: var(--primary-color);
  transform: translateY(-2px);
}

/* 浮动卡片 */
.hero-image {
  position: relative;
  height: 400px;
}

.floating-cards {
  position: relative;
  width: 100%;
  height: 100%;
}

.card {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 2rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  backdrop-filter: blur(10px);
  animation: float 6s ease-in-out infinite;
}

.card svg {
  width: 40px;
  height: 40px;
  color: var(--primary-color);
}

.card span {
  font-weight: 600;
  color: var(--text-primary);
}

.card-1 {
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.card-2 {
  top: 50%;
  right: 10%;
  animation-delay: 2s;
}

.card-3 {
  bottom: 20%;
  left: 30%;
  animation-delay: 4s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

/* 功能特性 */
.features-section {
  padding: 6rem 0;
  background: var(--bg-primary);
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.section-header h2 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.section-header p {
  font-size: 1.125rem;
  color: var(--text-secondary);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

.feature-card {
  padding: 2rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-xl);
  text-align: center;
  transition: var(--transition);
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
  border-color: var(--primary-color);
}

.feature-icon {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
}

.feature-icon svg {
  width: 32px;
  height: 32px;
}

.feature-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.feature-description {
  color: var(--text-secondary);
  line-height: 1.6;
}

/* 统计数据 */
.stats-section {
  padding: 4rem 0;
  background: var(--bg-secondary);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.stat-card {
  text-align: center;
  padding: 2rem;
  background: var(--bg-primary);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
}

.stat-value {
  font-size: 3rem;
  font-weight: 800;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* 快速开始 */
.quick-start-section {
  padding: 6rem 0;
  background: var(--bg-primary);
}

.steps-container {
  display: grid;
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 2rem;
}

.step-card {
  display: flex;
  gap: 2rem;
  padding: 2rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-xl);
  transition: var(--transition);
}

.step-card:hover {
  transform: translateX(10px);
  border-color: var(--primary-color);
}

.step-number {
  width: 48px;
  height: 48px;
  background: var(--primary-color);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.25rem;
  flex-shrink: 0;
}

.step-content h3 {
  margin-bottom: 0.5rem;
  color: var(--text-primary);
  font-weight: 600;
}

.step-content p {
  color: var(--text-secondary);
  margin-bottom: 1rem;
  line-height: 1.6;
}

.step-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 600;
  transition: var(--transition);
}

.step-link:hover {
  color: var(--primary-color-dark);
}

.step-link svg {
  width: 16px;
  height: 16px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-image {
    height: 300px;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .step-card {
    flex-direction: column;
    text-align: center;
  }
}
</style>
