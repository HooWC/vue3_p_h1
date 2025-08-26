<template>
  <div class="user-detail-page">
    <!-- 加载状态 -->
    <div v-if="loading" class="loading-state">
      <div class="loading-spinner">
        <div class="spinner"></div>
      </div>
      <p>加载用户详情中...</p>
    </div>

    <!-- 错误状态 -->
    <div v-else-if="error" class="error-state">
      <div class="error-icon">
        <svg viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
          <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" stroke-width="2"/>
          <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" stroke-width="2"/>
        </svg>
      </div>
      <h3>加载失败</h3>
      <p>{{ error }}</p>
      <div class="error-actions">
        <button class="btn btn-primary" @click="loadUserDetail">重试</button>
        <router-link to="/users" class="btn btn-secondary">返回列表</router-link>
      </div>
    </div>

    <!-- 用户详情内容 -->
    <div v-else-if="user" class="user-detail-content">
      <!-- 用户头部信息 -->
      <div class="user-header-card">
        <div class="user-avatar-section">
          <div class="user-avatar">
            <img :src="user.avatar" :alt="user.name" />
            <div class="status-indicator" :class="{ active: user.active }"></div>
          </div>
          <div class="avatar-actions">
            <button class="btn btn-sm btn-secondary">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" stroke="currentColor" stroke-width="2"/>
                <circle cx="12" cy="13" r="4" stroke="currentColor" stroke-width="2"/>
              </svg>
              更换头像
            </button>
          </div>
        </div>
        
        <div class="user-info-section">
          <div class="user-name-status">
            <h1 class="user-name">{{ user.name }}</h1>
            <span class="user-status" :class="{ active: user.active }">
              <span class="status-dot"></span>
              {{ user.active ? '在线' : '离线' }}
            </span>
          </div>
          
          <p class="user-username">@{{ user.username }}</p>
          
          <div class="user-stats">
            <div class="stat-item">
              <span class="stat-value">{{ user.posts || 0 }}</span>
              <span class="stat-label">发布内容</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">{{ user.followers || 0 }}</span>
              <span class="stat-label">关注者</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">{{ Math.floor(Math.random() * 500) + 100 }}</span>
              <span class="stat-label">关注中</span>
            </div>
          </div>
          
          <div class="user-actions">
            <button class="btn btn-primary">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" stroke-width="2"/>
              </svg>
              发送消息
            </button>
            <button class="btn btn-secondary">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="2"/>
                <circle cx="8.5" cy="7" r="4" stroke="currentColor" stroke-width="2"/>
                <line x1="20" y1="8" x2="20" y2="14" stroke="currentColor" stroke-width="2"/>
                <line x1="23" y1="11" x2="17" y2="11" stroke="currentColor" stroke-width="2"/>
              </svg>
              添加好友
            </button>
            <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle" @click="toggleDropdown">
                <svg viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="1" stroke="currentColor" stroke-width="2"/>
                  <circle cx="12" cy="5" r="1" stroke="currentColor" stroke-width="2"/>
                  <circle cx="12" cy="19" r="1" stroke="currentColor" stroke-width="2"/>
                </svg>
              </button>
              <div v-if="showDropdown" class="dropdown-menu">
                <button class="dropdown-item">举报用户</button>
                <button class="dropdown-item">屏蔽用户</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 详细信息卡片 -->
      <div class="detail-cards-grid">
        <!-- 基本信息 -->
        <div class="detail-card">
          <div class="card-header">
            <h3>基本信息</h3>
            <button class="btn btn-sm btn-secondary">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" stroke-width="2"/>
                <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="2"/>
              </svg>
              编辑
            </button>
          </div>
          <div class="card-content">
            <div class="info-grid">
              <div class="info-item">
                <label>邮箱地址</label>
                <div class="info-value">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" stroke-width="2"/>
                    <polyline points="22,6 12,13 2,6" stroke="currentColor" stroke-width="2"/>
                  </svg>
                  <span>{{ user.email }}</span>
                  <button class="copy-btn" @click="copyToClipboard(user.email)">
                    <svg viewBox="0 0 24 24" fill="none">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" stroke="currentColor" stroke-width="2"/>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke="currentColor" stroke-width="2"/>
                    </svg>
                  </button>
                </div>
              </div>
              
              <div class="info-item">
                <label>电话号码</label>
                <div class="info-value">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" stroke-width="2"/>
                  </svg>
                  <span>{{ user.phone }}</span>
                  <button class="copy-btn" @click="copyToClipboard(user.phone)">
                    <svg viewBox="0 0 24 24" fill="none">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" stroke="currentColor" stroke-width="2"/>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke="currentColor" stroke-width="2"/>
                    </svg>
                  </button>
                </div>
              </div>
              
              <div class="info-item">
                <label>网站</label>
                <div class="info-value">
                  <svg viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                    <line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" stroke-width="2"/>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="currentColor" stroke-width="2"/>
                  </svg>
                  <a :href="`http://${user.website}`" target="_blank" class="website-link">{{ user.website }}</a>
                </div>
              </div>
              
              <div class="info-item">
                <label>最后登录</label>
                <div class="info-value">
                  <svg viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                    <polyline points="12,6 12,12 16,14" stroke="currentColor" stroke-width="2"/>
                  </svg>
                  <span>{{ user.lastLogin }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 地址信息 -->
        <div class="detail-card">
          <div class="card-header">
            <h3>地址信息</h3>
          </div>
          <div class="card-content">
            <div class="address-info">
              <div class="address-item">
                <svg viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="2"/>
                  <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z" stroke="currentColor" stroke-width="2"/>
                </svg>
                <div class="address-details">
                  <div class="address-line">{{ user.address.street }}, {{ user.address.suite }}</div>
                  <div class="address-line">{{ user.address.city }}, {{ user.address.zipcode }}</div>
                </div>
              </div>
              <div class="coordinates">
                <span>坐标: {{ user.address.geo.lat }}, {{ user.address.geo.lng }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 公司信息 -->
        <div class="detail-card">
          <div class="card-header">
            <h3>公司信息</h3>
          </div>
          <div class="card-content">
            <div class="company-info">
              <div class="company-item">
                <label>公司名称</label>
                <span>{{ user.company.name }}</span>
              </div>
              <div class="company-item">
                <label>岗位职责</label>
                <span>{{ user.company.catchPhrase }}</span>
              </div>
              <div class="company-item">
                <label>业务范围</label>
                <span>{{ user.company.bs }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 活动统计 -->
        <div class="detail-card">
          <div class="card-header">
            <h3>活动统计</h3>
          </div>
          <div class="card-content">
            <div class="activity-stats">
              <div class="activity-item">
                <div class="activity-icon" style="background: #dbeafe; color: #3b82f6;">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" stroke-width="2"/>
                    <polyline points="14,2 14,8 20,8" stroke="currentColor" stroke-width="2"/>
                    <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" stroke-width="2"/>
                    <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" stroke-width="2"/>
                    <polyline points="10,9 9,9 8,9" stroke="currentColor" stroke-width="2"/>
                  </svg>
                </div>
                <div class="activity-details">
                  <span class="activity-value">{{ user.posts || Math.floor(Math.random() * 50) + 1 }}</span>
                  <span class="activity-label">发布内容</span>
                </div>
              </div>
              
              <div class="activity-item">
                <div class="activity-icon" style="background: #dcfce7; color: #16a34a;">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" stroke-width="2"/>
                  </svg>
                </div>
                <div class="activity-details">
                  <span class="activity-value">{{ Math.floor(Math.random() * 200) + 50 }}</span>
                  <span class="activity-label">获得点赞</span>
                </div>
              </div>
              
              <div class="activity-item">
                <div class="activity-icon" style="background: #fef3c7; color: #d97706;">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" stroke-width="2"/>
                  </svg>
                </div>
                <div class="activity-details">
                  <span class="activity-value">{{ Math.floor(Math.random() * 100) + 10 }}</span>
                  <span class="activity-label">评论回复</span>
                </div>
              </div>
              
              <div class="activity-item">
                <div class="activity-icon" style="background: #f3e8ff; color: #8b5cf6;">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="2"/>
                    <circle cx="8.5" cy="7" r="4" stroke="currentColor" stroke-width="2"/>
                    <line x1="20" y1="8" x2="20" y2="14" stroke="currentColor" stroke-width="2"/>
                    <line x1="23" y1="11" x2="17" y2="11" stroke="currentColor" stroke-width="2"/>
                  </svg>
                </div>
                <div class="activity-details">
                  <span class="activity-value">{{ user.followers || Math.floor(Math.random() * 1000) + 10 }}</span>
                  <span class="activity-label">关注者</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useAppStore } from '@/stores/app'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const appStore = useAppStore()

const user = ref(null)
const loading = ref(false)
const error = ref(null)
const showDropdown = ref(false)

const loadUserDetail = async () => {
  loading.value = true
  error.value = null
  
  try {
    const userData = await userStore.getUserById(route.params.id)
    user.value = userData
  } catch (err) {
    error.value = err.message || '加载用户详情失败'
  } finally {
    loading.value = false
  }
}

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    appStore.addNotification({
      type: 'success',
      title: '复制成功',
      message: `已复制到剪贴板: ${text}`
    })
  } catch (err) {
    appStore.addNotification({
      type: 'error',
      title: '复制失败',
      message: '无法复制到剪贴板'
    })
  }
}

onMounted(() => {
  loadUserDetail()
})

// 点击外部关闭下拉菜单
document.addEventListener('click', () => {
  showDropdown.value = false
})
</script>

<style scoped>
.user-detail-page {
  max-width: 1200px;
  margin: 0 auto;
}

/* 状态组件样式复用 */
.loading-state,
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
}

.loading-spinner {
  margin-bottom: 1rem;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid var(--border-color);
  border-top: 4px solid var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-icon {
  width: 64px;
  height: 64px;
  color: var(--error-color);
  margin-bottom: 1rem;
}

.error-state h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.error-state p,
.loading-state p {
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

.error-actions {
  display: flex;
  gap: 1rem;
}

/* 用户头部卡片 */
.user-header-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-xl);
  padding: 2rem;
  margin-bottom: 2rem;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 2rem;
  align-items: start;
}

.user-avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.user-avatar {
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid var(--border-color);
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.status-indicator {
  position: absolute;
  bottom: 8px;
  right: 8px;
  width: 24px;
  height: 24px;
  border: 4px solid var(--bg-secondary);
  border-radius: 50%;
  background: var(--text-disabled);
}

.status-indicator.active {
  background: var(--success-color);
}

.user-name-status {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.user-name {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
}

.user-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 4px 12px;
  background: var(--bg-tertiary);
  color: var(--text-disabled);
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 20px;
}

.user-status.active {
  background: var(--success-color);
  color: white;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: currentColor;
}

.user-username {
  color: var(--text-secondary);
  font-size: 1.125rem;
  margin-bottom: 1.5rem;
}

.user-stats {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
}

.stat-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.user-actions {
  display: flex;
  gap: 1rem;
  position: relative;
}

/* 详细信息网格 */
.detail-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
}

.detail-card {
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

.card-content {
  padding: 1.5rem;
}

/* 基本信息 */
.info-grid {
  display: grid;
  gap: 1.5rem;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.info-item label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary);
}

.info-value {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 12px;
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
}

.info-value svg {
  width: 18px;
  height: 18px;
  color: var(--text-secondary);
  flex-shrink: 0;
}

.info-value span {
  flex: 1;
  color: var(--text-primary);
}

.website-link {
  color: var(--primary-color);
  text-decoration: none;
}

.website-link:hover {
  text-decoration: underline;
}

.copy-btn {
  padding: 4px;
  background: none;
  border: none;
  border-radius: var(--radius-sm);
  color: var(--text-secondary);
  cursor: pointer;
  transition: var(--transition);
}

.copy-btn:hover {
  background: var(--bg-tertiary);
  color: var(--primary-color);
}

.copy-btn svg {
  width: 14px;
  height: 14px;
}

/* 地址信息 */
.address-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.address-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.address-item svg {
  width: 20px;
  height: 20px;
  color: var(--primary-color);
  margin-top: 2px;
  flex-shrink: 0;
}

.address-details {
  flex: 1;
}

.address-line {
  color: var(--text-primary);
  margin-bottom: 0.25rem;
}

.coordinates {
  padding: 8px 12px;
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  color: var(--text-secondary);
}

/* 公司信息 */
.company-info {
  display: grid;
  gap: 1rem;
}

.company-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.company-item label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary);
}

.company-item span {
  color: var(--text-primary);
  padding: 8px 0;
}

/* 活动统计 */
.activity-stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
}

.activity-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.activity-icon svg {
  width: 24px;
  height: 24px;
}

.activity-details {
  display: flex;
  flex-direction: column;
}

.activity-value {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
}

.activity-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
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
  background: var(--primary-color);
  color: white;
}

.btn-primary:hover {
  background: var(--primary-color-dark);
  transform: translateY(-1px);
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

/* 下拉菜单 */
.dropdown {
  position: relative;
}

.dropdown-toggle {
  padding: 12px;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 4px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 4px 0;
  min-width: 120px;
  box-shadow: var(--shadow-lg);
  z-index: 100;
}

.dropdown-item {
  display: block;
  width: 100%;
  padding: 8px 12px;
  background: none;
  border: none;
  color: var(--text-primary);
  font-size: 0.875rem;
  cursor: pointer;
  transition: var(--transition);
  text-align: left;
}

.dropdown-item:hover {
  background: var(--bg-primary);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .user-header-card {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 1.5rem;
  }
  
  .user-name-status {
    justify-content: center;
  }
  
  .user-stats {
    justify-content: center;
  }
  
  .user-actions {
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .detail-cards-grid {
    grid-template-columns: 1fr;
  }
  
  .activity-stats {
    grid-template-columns: 1fr;
  }
}
</style>
