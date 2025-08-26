<template>
  <div class="dashboard-page">
    <!-- 欢迎区域 -->
    <div class="welcome-section">
      <div class="welcome-content">
        <div class="welcome-text">
          <h1>欢迎回来，{{ userStore.userName }}！</h1>
          <p>这是您的个人仪表盘，查看最新数据和活动概览</p>
        </div>
        <div class="welcome-actions">
          <button class="btn btn-primary" @click="refreshData">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M1 4v6h6" stroke="currentColor" stroke-width="2"/>
              <path d="m1 10 2.41-2.41A8 8 0 1 1 7 3h5" stroke="currentColor" stroke-width="2"/>
            </svg>
            刷新数据
          </button>
          <button class="btn btn-secondary" @click="exportData">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" stroke-width="2"/>
              <polyline points="7,10 12,15 17,10" stroke="currentColor" stroke-width="2"/>
              <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" stroke-width="2"/>
            </svg>
            导出数据
          </button>
        </div>
      </div>
    </div>

    <!-- 统计卡片网格 -->
    <div class="stats-grid">
      <div v-for="stat in statsData" :key="stat.id" class="stat-card" :class="stat.trend">
        <div class="stat-header">
          <div class="stat-icon" :style="{ backgroundColor: stat.iconBg, color: stat.iconColor }">
            <svg viewBox="0 0 24 24" fill="none">
              <path :d="stat.icon" stroke="currentColor" stroke-width="2"/>
            </svg>
          </div>
          <div class="stat-trend">
            <svg v-if="stat.change > 0" viewBox="0 0 24 24" fill="none" class="trend-up">
              <polyline points="22,7 13.5,15.5 8.5,10.5 2,17" stroke="currentColor" stroke-width="2"/>
              <polyline points="16,7 22,7 22,13" stroke="currentColor" stroke-width="2"/>
            </svg>
            <svg v-else viewBox="0 0 24 24" fill="none" class="trend-down">
              <polyline points="22,17 13.5,8.5 8.5,13.5 2,7" stroke="currentColor" stroke-width="2"/>
              <polyline points="16,17 22,17 22,11" stroke="currentColor" stroke-width="2"/>
            </svg>
            <span>{{ Math.abs(stat.change) }}%</span>
          </div>
        </div>
        <div class="stat-content">
          <div class="stat-value">{{ stat.value }}</div>
          <div class="stat-label">{{ stat.label }}</div>
          <div class="stat-description">{{ stat.description }}</div>
        </div>
      </div>
    </div>

    <!-- 图表和活动区域 -->
    <div class="dashboard-grid">
      <!-- 活动图表 */
      <div class="chart-card">
        <div class="card-header">
          <h3>活动趋势</h3>
          <div class="chart-controls">
            <select v-model="chartPeriod" @change="updateChart">
              <option value="7">近7天</option>
              <option value="30">近30天</option>
              <option value="90">近90天</option>
            </select>
          </div>
        </div>
        <div class="chart-content">
          <div class="chart-placeholder">
            <svg viewBox="0 0 400 200" class="activity-chart">
              <defs>
                <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:0.3" />
                  <stop offset="100%" style="stop-color:#3b82f6;stop-opacity:0" />
                </linearGradient>
              </defs>
              <polyline 
                :points="chartPoints" 
                fill="none" 
                stroke="#3b82f6" 
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <polygon 
                :points="chartAreaPoints" 
                fill="url(#chartGradient)"
              />
              <circle 
                v-for="(point, index) in chartData" 
                :key="index"
                :cx="point.x" 
                :cy="point.y" 
                r="4" 
                fill="#3b82f6"
                class="chart-point"
              />
            </svg>
          </div>
          <div class="chart-legend">
            <div class="legend-item">
              <span class="legend-color" style="background: #3b82f6;"></span>
              <span>日活跃用户</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 最近活动 -->
      <div class="activity-card">
        <div class="card-header">
          <h3>最近活动</h3>
          <button class="btn btn-sm btn-secondary">查看全部</button>
        </div>
        <div class="activity-list">
          <div v-for="activity in recentActivities" :key="activity.id" class="activity-item">
            <div class="activity-avatar">
              <img :src="activity.avatar" :alt="activity.user" />
            </div>
            <div class="activity-content">
              <div class="activity-text">
                <strong>{{ activity.user }}</strong> {{ activity.action }}
              </div>
              <div class="activity-time">{{ activity.time }}</div>
            </div>
            <div class="activity-type" :class="activity.type">
              <svg viewBox="0 0 24 24" fill="none">
                <path :d="activity.icon" stroke="currentColor" stroke-width="2"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- 任务进度 -->
      <div class="progress-card">
        <div class="card-header">
          <h3>项目进度</h3>
          <div class="progress-summary">
            {{ completedTasks }}/{{ totalTasks }} 已完成
          </div>
        </div>
        <div class="progress-list">
          <div v-for="project in projects" :key="project.id" class="progress-item">
            <div class="progress-info">
              <div class="progress-name">{{ project.name }}</div>
              <div class="progress-meta">
                <span class="progress-percent">{{ project.progress }}%</span>
                <span class="progress-due">{{ project.dueDate }}</span>
              </div>
            </div>
            <div class="progress-bar">
              <div 
                class="progress-fill" 
                :style="{ 
                  width: project.progress + '%',
                  backgroundColor: project.color 
                }"
              ></div>
            </div>
            <div class="progress-team">
              <div 
                v-for="member in project.team.slice(0, 3)" 
                :key="member.id"
                class="team-avatar"
              >
                <img :src="member.avatar" :alt="member.name" />
              </div>
              <div v-if="project.team.length > 3" class="team-more">
                +{{ project.team.length - 3 }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 系统状态 -->
      <div class="status-card">
        <div class="card-header">
          <h3>系统状态</h3>
          <div class="status-indicator healthy">
            <span class="status-dot"></span>
            运行正常
          </div>
        </div>
        <div class="status-list">
          <div v-for="service in systemStatus" :key="service.id" class="status-item">
            <div class="service-info">
              <div class="service-name">{{ service.name }}</div>
              <div class="service-description">{{ service.description }}</div>
            </div>
            <div class="service-metrics">
              <div class="metric">
                <span class="metric-label">CPU</span>
                <div class="metric-bar">
                  <div 
                    class="metric-fill" 
                    :style="{ width: service.cpu + '%' }"
                    :class="{ 
                      'high': service.cpu > 80, 
                      'medium': service.cpu > 60 && service.cpu <= 80 
                    }"
                  ></div>
                </div>
                <span class="metric-value">{{ service.cpu }}%</span>
              </div>
              <div class="metric">
                <span class="metric-label">内存</span>
                <div class="metric-bar">
                  <div 
                    class="metric-fill" 
                    :style="{ width: service.memory + '%' }"
                    :class="{ 
                      'high': service.memory > 80, 
                      'medium': service.memory > 60 && service.memory <= 80 
                    }"
                  ></div>
                </div>
                <span class="metric-value">{{ service.memory }}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { useAppStore } from '@/stores/app'

const userStore = useUserStore()
const appStore = useAppStore()

const chartPeriod = ref('7')
const chartData = ref([])

// 统计数据
const statsData = ref([
  {
    id: 1,
    label: '总用户数',
    value: '2,543',
    description: '本月新增 +12%',
    change: 12,
    icon: 'M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M12.5 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0z',
    iconBg: '#dbeafe',
    iconColor: '#3b82f6'
  },
  {
    id: 2,
    label: '活跃用户',
    value: '1,789',
    description: '比上周 +8%',
    change: 8,
    icon: 'M22 12h-4l-3 9L9 3l-3 9H2',
    iconBg: '#dcfce7',
    iconColor: '#16a34a'
  },
  {
    id: 3,
    label: '总收入',
    value: '¥45,678',
    description: '比上月 +15%',
    change: 15,
    icon: 'M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6',
    iconBg: '#fef3c7',
    iconColor: '#d97706'
  },
  {
    id: 4,
    label: '转化率',
    value: '24.8%',
    description: '比上周 -2%',
    change: -2,
    icon: 'M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z',
    iconBg: '#f3e8ff',
    iconColor: '#8b5cf6'
  }
])

// 最近活动
const recentActivities = ref([
  {
    id: 1,
    user: '张三',
    action: '创建了新的项目',
    time: '5分钟前',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhang',
    type: 'create',
    icon: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13l-4-4-4 4 M12 17V9'
  },
  {
    id: 2,
    user: '李四',
    action: '完成了用户界面设计',
    time: '1小时前',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=li',
    type: 'complete',
    icon: 'M22 11.08V12a10 10 0 1 1-5.93-9.14 M22 4L12 14.01l-3-3'
  },
  {
    id: 3,
    user: '王五',
    action: '上传了新的文档',
    time: '2小时前',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=wang',
    type: 'upload',
    icon: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M7 10l5-5 5 5 M12 15V5'
  },
  {
    id: 4,
    user: '赵六',
    action: '评论了项目进度',
    time: '3小时前',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhao',
    type: 'comment',
    icon: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'
  }
])

// 项目进度
const projects = ref([
  {
    id: 1,
    name: '网站重构项目',
    progress: 75,
    dueDate: '2024-02-15',
    color: '#3b82f6',
    team: [
      { id: 1, name: '张三', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=p1-1' },
      { id: 2, name: '李四', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=p1-2' },
      { id: 3, name: '王五', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=p1-3' }
    ]
  },
  {
    id: 2,
    name: '移动端开发',
    progress: 45,
    dueDate: '2024-03-01',
    color: '#16a34a',
    team: [
      { id: 4, name: '赵六', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=p2-1' },
      { id: 5, name: '孙七', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=p2-2' }
    ]
  },
  {
    id: 3,
    name: 'API 接口优化',
    progress: 90,
    dueDate: '2024-01-30',
    color: '#d97706',
    team: [
      { id: 6, name: '周八', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=p3-1' },
      { id: 7, name: '吴九', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=p3-2' },
      { id: 8, name: '郑十', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=p3-3' },
      { id: 9, name: '其他', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=p3-4' }
    ]
  }
])

// 系统状态
const systemStatus = ref([
  {
    id: 1,
    name: 'Web 服务器',
    description: 'Nginx 1.20.1',
    cpu: 45,
    memory: 62
  },
  {
    id: 2,
    name: '数据库',
    description: 'MySQL 8.0',
    cpu: 38,
    memory: 71
  },
  {
    id: 3,
    name: 'Redis 缓存',
    description: 'Redis 6.2',
    cpu: 15,
    memory: 34
  }
])

// 计算属性
const completedTasks = computed(() => {
  return projects.value.reduce((sum, project) => {
    return sum + (project.progress === 100 ? 1 : 0)
  }, 0)
})

const totalTasks = computed(() => projects.value.length)

const chartPoints = computed(() => {
  return chartData.value.map(point => `${point.x},${point.y}`).join(' ')
})

const chartAreaPoints = computed(() => {
  if (chartData.value.length === 0) return ''
  const points = chartData.value.map(point => `${point.x},${point.y}`).join(' ')
  const firstX = chartData.value[0].x
  const lastX = chartData.value[chartData.value.length - 1].x
  return `${firstX},200 ${points} ${lastX},200`
})

// 方法
const generateChartData = () => {
  const days = parseInt(chartPeriod.value)
  const data = []
  const width = 400
  const height = 200
  const padding = 20
  
  for (let i = 0; i < days; i++) {
    const x = padding + (i / (days - 1)) * (width - 2 * padding)
    const y = padding + Math.random() * (height - 2 * padding)
    data.push({ x, y, value: Math.floor(Math.random() * 1000) + 500 })
  }
  
  chartData.value = data
}

const updateChart = () => {
  generateChartData()
}

const refreshData = () => {
  generateChartData()
  appStore.addNotification({
    type: 'success',
    title: '数据已刷新',
    message: '仪表盘数据已更新到最新状态'
  })
}

const exportData = () => {
  appStore.addNotification({
    type: 'info',
    title: '导出功能',
    message: '数据导出功能正在开发中，敬请期待！'
  })
}

onMounted(() => {
  generateChartData()
})
</script>

<style scoped>
.dashboard-page {
  max-width: 1400px;
  margin: 0 auto;
}

/* 欢迎区域 */
.welcome-section {
  background: linear-gradient(135deg, var(--primary-color) 0%, #16a34a 100%);
  border-radius: var(--radius-xl);
  padding: 2rem;
  margin-bottom: 2rem;
  color: white;
}

.welcome-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
}

.welcome-text h1 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.welcome-text p {
  opacity: 0.9;
  font-size: 1.125rem;
}

.welcome-actions {
  display: flex;
  gap: 1rem;
  flex-shrink: 0;
}

/* 统计卡片 */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-xl);
  padding: 1.5rem;
  transition: var(--transition);
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.stat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-icon svg {
  width: 24px;
  height: 24px;
}

.stat-trend {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  font-weight: 500;
}

.trend-up {
  width: 16px;
  height: 16px;
  color: var(--success-color);
}

.trend-down {
  width: 16px;
  height: 16px;
  color: var(--error-color);
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
}

.stat-description {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

/* 仪表盘网格 */
.dashboard-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: auto auto;
  gap: 2rem;
}

.chart-card {
  grid-column: 1;
  grid-row: 1;
}

.activity-card {
  grid-column: 2;
  grid-row: 1;
}

.progress-card {
  grid-column: 1;
  grid-row: 2;
}

.status-card {
  grid-column: 2;
  grid-row: 2;
}

/* 卡片样式 */
.chart-card,
.activity-card,
.progress-card,
.status-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-xl);
  overflow: hidden;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid var(--border-color);
  background: var(--bg-primary);
}

.card-header h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

/* 图表 */
.chart-content {
  padding: 1.5rem;
}

.chart-placeholder {
  margin-bottom: 1rem;
}

.activity-chart {
  width: 100%;
  height: 200px;
}

.chart-point {
  transition: r 0.3s ease;
}

.chart-point:hover {
  r: 6;
  cursor: pointer;
}

.chart-legend {
  display: flex;
  gap: 1rem;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 2px;
}

.chart-controls select {
  padding: 6px 12px;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  background: var(--bg-primary);
  color: var(--text-primary);
  font-size: 0.875rem;
}

/* 活动列表 */
.activity-list {
  padding: 1rem 0;
  max-height: 400px;
  overflow-y: auto;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  transition: var(--transition);
}

.activity-item:hover {
  background: var(--bg-primary);
}

.activity-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}

.activity-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.activity-content {
  flex: 1;
  min-width: 0;
}

.activity-text {
  color: var(--text-primary);
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
}

.activity-time {
  color: var(--text-secondary);
  font-size: 0.75rem;
}

.activity-type {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.activity-type.create {
  background: var(--primary-color-light);
  color: var(--primary-color);
}

.activity-type.complete {
  background: #dcfce7;
  color: var(--success-color);
}

.activity-type.upload {
  background: #fef3c7;
  color: var(--warning-color);
}

.activity-type.comment {
  background: #f3e8ff;
  color: #8b5cf6;
}

.activity-type svg {
  width: 16px;
  height: 16px;
}

/* 进度列表 */
.progress-list {
  padding: 1.5rem;
}

.progress-item {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 1rem;
  align-items: center;
  margin-bottom: 2rem;
}

.progress-item:last-child {
  margin-bottom: 0;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.progress-name {
  font-weight: 600;
  color: var(--text-primary);
}

.progress-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.progress-percent {
  font-weight: 600;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: var(--bg-tertiary);
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.5s ease;
}

.progress-team {
  display: flex;
  align-items: center;
  gap: -8px;
}

.team-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid var(--bg-secondary);
  margin-left: -8px;
}

.team-avatar:first-child {
  margin-left: 0;
}

.team-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.team-more {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--bg-tertiary);
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
  margin-left: -8px;
  border: 2px solid var(--bg-secondary);
}

/* 系统状态 */
.status-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
}

.status-indicator.healthy {
  color: var(--success-color);
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: currentColor;
}

.status-list {
  padding: 1.5rem;
}

.status-item {
  margin-bottom: 2rem;
}

.status-item:last-child {
  margin-bottom: 0;
}

.service-info {
  margin-bottom: 1rem;
}

.service-name {
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
}

.service-description {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.service-metrics {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.metric {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.metric-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
  width: 40px;
  flex-shrink: 0;
}

.metric-bar {
  flex: 1;
  height: 6px;
  background: var(--bg-tertiary);
  border-radius: 3px;
  overflow: hidden;
}

.metric-fill {
  height: 100%;
  background: var(--success-color);
  border-radius: 3px;
  transition: width 0.5s ease;
}

.metric-fill.medium {
  background: var(--warning-color);
}

.metric-fill.high {
  background: var(--error-color);
}

.metric-value {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-primary);
  width: 40px;
  text-align: right;
  flex-shrink: 0;
}

/* 按钮样式 */
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

.btn-sm {
  padding: 8px 12px;
  font-size: 13px;
}

.btn-sm svg {
  width: 16px;
  height: 16px;
}

.btn-primary {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.btn-primary:hover {
  background: rgba(255, 255, 255, 0.3);
}

.btn-secondary {
  background: var(--bg-primary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
}

.btn-secondary:hover {
  background: var(--bg-tertiary);
  border-color: var(--primary-color);
  color: var(--primary-color);
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }
  
  .chart-card,
  .activity-card,
  .progress-card,
  .status-card {
    grid-column: 1;
    grid-row: auto;
  }
}

@media (max-width: 768px) {
  .welcome-content {
    flex-direction: column;
    align-items: stretch;
    text-align: center;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .progress-item {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
  
  .progress-team {
    justify-content: flex-start;
    margin-top: 0.5rem;
  }
}
</style>
