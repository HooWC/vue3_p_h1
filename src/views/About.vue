<template>
  <div class="about-page">
    <!-- 页面头部 -->
    <div class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">关于我们</h1>
        <p class="hero-subtitle">
          我们致力于打造现代化、高性能的 Web 应用，为用户提供最佳的数字体验
        </p>
      </div>
      <div class="hero-illustration">
        <div class="illustration-container">
          <div class="floating-element element-1">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="currentColor" stroke-width="2"/>
              <path d="M12 22V12" stroke="currentColor" stroke-width="2"/>
              <path d="M2 7L12 12L22 7" stroke="currentColor" stroke-width="2"/>
            </svg>
          </div>
          <div class="floating-element element-2">
            <svg viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="7" height="7" stroke="currentColor" stroke-width="2"/>
              <rect x="14" y="3" width="7" height="7" stroke="currentColor" stroke-width="2"/>
              <rect x="14" y="14" width="7" height="7" stroke="currentColor" stroke-width="2"/>
              <rect x="3" y="14" width="7" height="7" stroke="currentColor" stroke-width="2"/>
            </svg>
          </div>
          <div class="floating-element element-3">
            <svg viewBox="0 0 24 24" fill="none">
              <polyline points="22,12 18,12 15,21 9,3 6,12 2,12" stroke="currentColor" stroke-width="2"/>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- 技术栈介绍 -->
    <section class="tech-stack-section">
      <div class="section-header">
        <h2>技术栈</h2>
        <p>我们使用最新的前端技术来构建高质量的应用</p>
      </div>
      
      <div class="tech-grid">
        <div v-for="tech in techStack" :key="tech.name" class="tech-card">
          <div class="tech-icon" :style="{ background: tech.gradient }">
            <svg viewBox="0 0 24 24" fill="none">
              <path :d="tech.icon" stroke="white" stroke-width="2"/>
            </svg>
          </div>
          <div class="tech-content">
            <h3 class="tech-name">{{ tech.name }}</h3>
            <p class="tech-version">{{ tech.version }}</p>
            <p class="tech-description">{{ tech.description }}</p>
            <div class="tech-features">
              <span v-for="feature in tech.features" :key="feature" class="tech-feature">
                {{ feature }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 团队介绍 -->
    <section class="team-section">
      <div class="section-header">
        <h2>开发团队</h2>
        <p>认识我们优秀的开发团队成员</p>
      </div>
      
      <div class="team-grid">
        <div v-for="member in teamMembers" :key="member.id" class="team-card">
          <div class="member-avatar">
            <img :src="member.avatar" :alt="member.name" />
            <div class="member-status" :class="{ online: member.online }"></div>
          </div>
          <div class="member-info">
            <h3 class="member-name">{{ member.name }}</h3>
            <p class="member-role">{{ member.role }}</p>
            <p class="member-description">{{ member.description }}</p>
            <div class="member-skills">
              <span v-for="skill in member.skills" :key="skill" class="skill-tag">
                {{ skill }}
              </span>
            </div>
            <div class="member-social">
              <a 
                v-for="social in member.social" 
                :key="social.platform"
                :href="social.url" 
                class="social-link"
                :title="social.platform"
                target="_blank"
              >
                <svg viewBox="0 0 24 24" fill="none">
                  <path :d="social.icon" stroke="currentColor" stroke-width="2"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 项目统计 -->
    <section class="stats-section">
      <div class="section-header">
        <h2>项目数据</h2>
        <p>用数字说话，展示我们的成果</p>
      </div>
      
      <div class="stats-grid">
        <div v-for="stat in projectStats" :key="stat.id" class="stat-item">
          <div class="stat-icon" :style="{ background: stat.color }">
            <svg viewBox="0 0 24 24" fill="none">
              <path :d="stat.icon" stroke="white" stroke-width="2"/>
            </svg>
          </div>
          <div class="stat-content">
            <div class="stat-number" :data-target="stat.value">{{ animatedStats[stat.id] || 0 }}</div>
            <div class="stat-label">{{ stat.label }}</div>
            <div class="stat-growth">{{ stat.growth }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 时间线 -->
    <section class="timeline-section">
      <div class="section-header">
        <h2>发展历程</h2>
        <p>记录我们的重要里程碑</p>
      </div>
      
      <div class="timeline">
        <div v-for="(milestone, index) in timeline" :key="milestone.id" class="timeline-item">
          <div class="timeline-marker">
            <div class="marker-dot" :class="{ active: index === 0 }"></div>
            <div v-if="index < timeline.length - 1" class="marker-line"></div>
          </div>
          <div class="timeline-content">
            <div class="timeline-date">{{ milestone.date }}</div>
            <h3 class="timeline-title">{{ milestone.title }}</h3>
            <p class="timeline-description">{{ milestone.description }}</p>
            <div v-if="milestone.achievements" class="timeline-achievements">
              <span v-for="achievement in milestone.achievements" :key="achievement" class="achievement-tag">
                {{ achievement }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 联系我们 -->
    <section class="contact-section">
      <div class="contact-content">
        <div class="contact-info">
          <h2>联系我们</h2>
          <p>如果您有任何问题或建议，欢迎随时与我们取得联系</p>
          
          <div class="contact-methods">
            <div class="contact-method">
              <div class="contact-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" stroke-width="2"/>
                  <polyline points="22,6 12,13 2,6" stroke="currentColor" stroke-width="2"/>
                </svg>
              </div>
              <div class="contact-details">
                <h4>邮箱</h4>
                <p>contact@example.com</p>
              </div>
            </div>
            
            <div class="contact-method">
              <div class="contact-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0-6 0" stroke="currentColor" stroke-width="2"/>
                  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 0 1-2.827 0l-4.244-4.243a8 8 0 1 1 11.314 0z" stroke="currentColor" stroke-width="2"/>
                </svg>
              </div>
              <div class="contact-details">
                <h4>地址</h4>
                <p>中国，上海市</p>
              </div>
            </div>
            
            <div class="contact-method">
              <div class="contact-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" stroke-width="2"/>
                </svg>
              </div>
              <div class="contact-details">
                <h4>电话</h4>
                <p>+86 138-0013-8000</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="contact-form">
          <h3>发送消息</h3>
          <form @submit.prevent="submitForm">
            <div class="form-group">
              <label for="name">姓名</label>
              <input type="text" id="name" v-model="form.name" required />
            </div>
            <div class="form-group">
              <label for="email">邮箱</label>
              <input type="email" id="email" v-model="form.email" required />
            </div>
            <div class="form-group">
              <label for="subject">主题</label>
              <input type="text" id="subject" v-model="form.subject" required />
            </div>
            <div class="form-group">
              <label for="message">消息内容</label>
              <textarea id="message" v-model="form.message" rows="4" required></textarea>
            </div>
            <button type="submit" class="btn btn-primary">
              <svg viewBox="0 0 24 24" fill="none">
                <line x1="22" y1="2" x2="11" y2="13" stroke="currentColor" stroke-width="2"/>
                <polygon points="22,2 15,22 11,13 2,9 22,2" stroke="currentColor" stroke-width="2"/>
              </svg>
              发送消息
            </button>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()

const animatedStats = ref({})
const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const techStack = ref([
  {
    name: 'Vue 3',
    version: 'v3.5.18',
    description: '渐进式 JavaScript 框架，提供响应式数据绑定和组合式 API',
    features: ['Composition API', '响应式系统', '组件化', 'TypeScript'],
    icon: 'M12 2L2 7V17L12 22L22 17V7L12 2Z M12 22V12 M2 7L12 12L22 7',
    gradient: 'linear-gradient(135deg, #4FC08D, #42b883)'
  },
  {
    name: 'Vite',
    version: 'v7.0.6',
    description: '下一代前端构建工具，提供极速的开发服务器和构建性能',
    features: ['极速热重载', 'ES模块', '插件生态', '优化构建'],
    icon: 'M22 12L18 12L15 21L9 3L6 12L2 12',
    gradient: 'linear-gradient(135deg, #646CFF, #747bff)'
  },
  {
    name: 'Pinia',
    version: 'v3.0.3',
    description: 'Vue 的状态管理库，提供类型安全的状态管理方案',
    features: ['类型安全', 'DevTools', '轻量级', '模块化'],
    icon: 'M3 3H7V7H3zM14 3H18V7H14zM14 14H18V18H14zM3 14H7V18H3z',
    gradient: 'linear-gradient(135deg, #FFD43B, #ffd93d)'
  },
  {
    name: 'Vue Router',
    version: 'v4.5.1',
    description: 'Vue.js 官方路由管理器，支持嵌套路由和导航守卫',
    features: ['嵌套路由', '导航守卫', '懒加载', '动态路由'],
    icon: 'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z',
    gradient: 'linear-gradient(135deg, #FF6B6B, #ee5a52)'
  },
  {
    name: 'Axios',
    version: 'v1.11.0',
    description: '基于 Promise 的 HTTP 客户端，用于浏览器和 Node.js',
    features: ['请求拦截', '响应转换', '自动JSON', '错误处理'],
    icon: 'M13 2L3 14H12L11 22L21 10H12L13 2z',
    gradient: 'linear-gradient(135deg, #5A67D8, #667eea)'
  },
  {
    name: 'CSS3',
    version: 'Latest',
    description: '现代 CSS 特性，包括 Grid、Flexbox 和 CSS 变量',
    features: ['Grid布局', 'Flexbox', 'CSS变量', '动画效果'],
    icon: 'M4 3H20A1 1 0 0 1 21 4V20A1 1 0 0 1 20 21H4A1 1 0 0 1 3 20V4A1 1 0 0 1 4 3z M9 9V15 M9 15H15 M15 9V15',
    gradient: 'linear-gradient(135deg, #38B2AC, #4FD1C7)'
  }
])

const teamMembers = ref([
  {
    id: 1,
    name: '李明',
    role: '前端架构师',
    description: '专注于前端架构设计和技术选型，拥有8年前端开发经验',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=liming',
    online: true,
    skills: ['Vue.js', 'React', 'TypeScript', '微前端'],
    social: [
      { platform: 'GitHub', url: '#', icon: 'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22' },
      { platform: 'Twitter', url: '#', icon: 'M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z' }
    ]
  },
  {
    id: 2,
    name: '王小红',
    role: 'UI/UX 设计师',
    description: '负责产品界面设计和用户体验优化，追求简洁美观的设计风格',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=wangxiaohong',
    online: false,
    skills: ['Figma', 'Sketch', '交互设计', '用户研究'],
    social: [
      { platform: 'Dribbble', url: '#', icon: 'M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32' },
      { platform: 'Behance', url: '#', icon: 'M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M16 6h4 M20 8V4' }
    ]
  },
  {
    id: 3,
    name: '张伟',
    role: '全栈开发工程师',
    description: '具备前后端开发能力，专注于性能优化和系统架构设计',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhangwei',
    online: true,
    skills: ['Vue.js', 'Node.js', 'Python', 'Docker'],
    social: [
      { platform: 'GitHub', url: '#', icon: 'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22' },
      { platform: 'LinkedIn', url: '#', icon: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z' }
    ]
  }
])

const projectStats = ref([
  { id: 1, value: 50, label: '完成项目', growth: '+12% 本月', icon: 'M22 11.08V12a10 10 0 1 1-5.93-9.14 M22 4L12 14.01l-3-3', color: '#3b82f6' },
  { id: 2, value: 1000, label: '代码提交', growth: '+25% 本周', icon: 'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22', color: '#16a34a' },
  { id: 3, value: 24, label: '团队成员', growth: '+3 新加入', icon: 'M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M12.5 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0z M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75', color: '#d97706' },
  { id: 4, value: 99, label: '客户满意度', growth: '+2% 提升', icon: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z', color: '#8b5cf6' }
])

const timeline = ref([
  {
    id: 1,
    date: '2024年1月',
    title: '项目启动',
    description: '开始Vue3现代化应用的设计和开发工作',
    achievements: ['技术选型', '架构设计', '团队组建']
  },
  {
    id: 2,
    date: '2023年12月',
    title: '技术研究',
    description: '深入研究Vue3生态系统和最新的前端技术趋势',
    achievements: ['Vue3学习', 'Vite配置', 'TypeScript集成']
  },
  {
    id: 3,
    date: '2023年11月',
    title: '需求分析',
    description: '收集用户需求，制定产品功能规划和发展路线图',
    achievements: ['用户调研', '功能规划', '原型设计']
  },
  {
    id: 4,
    date: '2023年10月',
    title: '团队成立',
    description: '组建专业的前端开发团队，确定开发规范和工作流程'
  }
])

// 数字动画
const animateNumbers = () => {
  projectStats.value.forEach(stat => {
    let current = 0
    const target = stat.value
    const increment = target / 50
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        current = target
        clearInterval(timer)
      }
      animatedStats.value[stat.id] = Math.floor(current)
    }, 50)
  })
}

const submitForm = () => {
  appStore.addNotification({
    type: 'success',
    title: '消息已发送',
    message: `感谢 ${form.name} 的留言，我们会尽快回复您！`
  })
  
  // 重置表单
  Object.keys(form).forEach(key => {
    form[key] = ''
  })
}

onMounted(() => {
  animateNumbers()
})
</script>

<style scoped>
.about-page {
  width: 100%;
}

/* 英雄区域 */
.hero-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  padding: 4rem 0;
  margin-bottom: 4rem;
}

.hero-title {
  font-size: 3rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 1rem;
  line-height: 1.1;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

.hero-illustration {
  position: relative;
  height: 300px;
}

.illustration-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.floating-element {
  position: absolute;
  width: 80px;
  height: 80px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-lg);
  animation: float 6s ease-in-out infinite;
}

.floating-element svg {
  width: 40px;
  height: 40px;
  color: var(--primary-color);
}

.element-1 {
  top: 20%;
  left: 20%;
  animation-delay: 0s;
}

.element-2 {
  top: 50%;
  right: 20%;
  animation-delay: 2s;
}

.element-3 {
  bottom: 20%;
  left: 40%;
  animation-delay: 4s;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-20px) rotate(2deg); }
  66% { transform: translateY(-10px) rotate(-2deg); }
}

/* 通用区域样式 */
section {
  margin-bottom: 6rem;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-header h2 {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.section-header p {
  font-size: 1.125rem;
  color: var(--text-secondary);
  max-width: 800px;
  margin: 0 auto;
}

/* 技术栈 */
.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.tech-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-xl);
  padding: 2rem;
  transition: var(--transition);
}

.tech-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
  border-color: var(--primary-color);
}

.tech-icon {
  width: 64px;
  height: 64px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.tech-icon svg {
  width: 32px;
  height: 32px;
}

.tech-name {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.tech-version {
  color: var(--text-secondary);
  font-size: 0.875rem;
  margin-bottom: 1rem;
  font-weight: 500;
}

.tech-description {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.tech-features {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-feature {
  padding: 4px 12px;
  background: var(--primary-color-light);
  color: var(--primary-color);
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 16px;
}

/* 团队 */
.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.team-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-xl);
  padding: 2rem;
  text-align: center;
  transition: var(--transition);
}

.team-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.member-avatar {
  position: relative;
  width: 100px;
  height: 100px;
  margin: 0 auto 1.5rem;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid var(--border-color);
}

.member-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.member-status {
  position: absolute;
  bottom: 8px;
  right: 8px;
  width: 20px;
  height: 20px;
  border: 3px solid var(--bg-secondary);
  border-radius: 50%;
  background: var(--text-disabled);
}

.member-status.online {
  background: var(--success-color);
}

.member-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.member-role {
  color: var(--primary-color);
  font-weight: 500;
  margin-bottom: 1rem;
}

.member-description {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.member-skills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.skill-tag {
  padding: 4px 8px;
  background: var(--bg-tertiary);
  color: var(--text-secondary);
  font-size: 0.75rem;
  border-radius: 8px;
}

.member-social {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.social-link {
  width: 36px;
  height: 36px;
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  transition: var(--transition);
}

.social-link:hover {
  background: var(--primary-color);
  border-color: var(--primary-color);
  color: white;
  transform: translateY(-2px);
}

.social-link svg {
  width: 18px;
  height: 18px;
}

/* 统计 */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.stat-item {
  text-align: center;
  padding: 2rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-xl);
  transition: var(--transition);
}

.stat-item:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.stat-icon {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
}

.stat-icon svg {
  width: 32px;
  height: 32px;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 1rem;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
}

.stat-growth {
  font-size: 0.875rem;
  color: var(--success-color);
  font-weight: 500;
}

/* 时间线 */
.timeline {
  max-width: 1000px;
  margin: 0 auto;
}

.timeline-item {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 2rem;
  margin-bottom: 3rem;
}

.timeline-marker {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.marker-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--border-color);
  border: 4px solid var(--bg-primary);
  position: relative;
  z-index: 1;
}

.marker-dot.active {
  background: var(--primary-color);
}

.marker-line {
  width: 2px;
  height: 60px;
  background: var(--border-color);
  margin-top: 1rem;
}

.timeline-content {
  padding-bottom: 2rem;
}

.timeline-date {
  color: var(--primary-color);
  font-weight: 600;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
}

.timeline-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.75rem;
}

.timeline-description {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.timeline-achievements {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.achievement-tag {
  padding: 4px 12px;
  background: var(--success-color);
  color: white;
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: 12px;
}

/* 联系我们 */
.contact-section {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-xl);
  padding: 3rem;
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
}

.contact-info h2 {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.contact-info p {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 2rem;
}

.contact-methods {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.contact-method {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.contact-icon {
  width: 48px;
  height: 48px;
  background: var(--primary-color-light);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.contact-icon svg {
  width: 24px;
  height: 24px;
  color: var(--primary-color);
}

.contact-details h4 {
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
}

.contact-details p {
  color: var(--text-secondary);
  margin: 0;
}

.contact-form h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--text-primary);
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  background: var(--bg-primary);
  color: var(--text-primary);
  font-size: 14px;
  transition: var(--transition);
  resize: vertical;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px var(--primary-color-light);
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 12px 24px;
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
  transform: translateY(-1px);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .hero-section {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .tech-grid,
  .team-grid,
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .contact-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .timeline-item {
    grid-template-columns: auto 1fr;
    gap: 1rem;
  }
  
  .timeline-achievements {
    justify-content: flex-start;
  }
  
  .member-skills {
    justify-content: flex-start;
  }
}
</style>
