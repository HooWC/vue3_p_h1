<template>
  <div class="user-card" @click="$emit('click')" tabindex="0" @keyup.enter="$emit('click')">
    <!-- 用户头像和状态 -->
    <div class="user-header">
      <div class="user-avatar">
        <img :src="user.avatar" :alt="user.name" />
        <div class="status-indicator" :class="{ active: user.active }"></div>
      </div>
      <div class="user-basic">
        <h3 class="user-name">{{ user.name }}</h3>
        <p class="user-username">@{{ user.username }}</p>
        <span class="user-status" :class="{ active: user.active }">
          {{ user.active ? '活跃' : '离线' }}
        </span>
      </div>
    </div>

    <!-- 用户信息 -->
    <div class="user-info">
      <div class="info-item">
        <svg class="info-icon" viewBox="0 0 24 24" fill="none">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" stroke-width="2"/>
          <polyline points="22,6 12,13 2,6" stroke="currentColor" stroke-width="2"/>
        </svg>
        <span class="info-text">{{ user.email }}</span>
      </div>
      
      <div class="info-item">
        <svg class="info-icon" viewBox="0 0 24 24" fill="none">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" stroke-width="2"/>
        </svg>
        <span class="info-text">{{ user.phone }}</span>
      </div>
      
      <div class="info-item">
        <svg class="info-icon" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="2"/>
          <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z" stroke="currentColor" stroke-width="2"/>
        </svg>
        <span class="info-text">{{ user.address.city }}</span>
      </div>
      
      <div class="info-item">
        <svg class="info-icon" viewBox="0 0 24 24" fill="none">
          <path d="M12 6v6l4 2" stroke="currentColor" stroke-width="2"/>
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
        </svg>
        <span class="info-text">{{ user.lastLogin }}</span>
      </div>
    </div>

    <!-- 用户操作 -->
    <div class="user-actions">
      <button 
        class="action-btn primary"
        @click.stop="viewProfile"
        title="查看详情"
      >
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" stroke-width="2"/>
          <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
        </svg>
        详情
      </button>
      
      <button 
        class="action-btn secondary"
        @click.stop="sendMessage"
        title="发送消息"
      >
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" stroke-width="2"/>
        </svg>
        消息
      </button>
      
      <div class="dropdown" @click.stop>
        <button class="action-btn dropdown-toggle" @click="toggleDropdown">
          <svg viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="1" stroke="currentColor" stroke-width="2"/>
            <circle cx="12" cy="5" r="1" stroke="currentColor" stroke-width="2"/>
            <circle cx="12" cy="19" r="1" stroke="currentColor" stroke-width="2"/>
          </svg>
        </button>
        
        <div v-if="showDropdown" class="dropdown-menu">
          <button class="dropdown-item" @click="editUser">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" stroke-width="2"/>
              <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="2"/>
            </svg>
            编辑
          </button>
          <button class="dropdown-item danger" @click="deleteUser">
            <svg viewBox="0 0 24 24" fill="none">
              <polyline points="3,6 5,6 21,6" stroke="currentColor" stroke-width="2"/>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" stroke-width="2"/>
            </svg>
            删除
          </button>
        </div>
      </div>
    </div>

    <!-- 悬浮效果遮罩 -->
    <div class="card-overlay"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app'

const props = defineProps({
  user: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['click'])

const router = useRouter()
const appStore = useAppStore()

const showDropdown = ref(false)

const viewProfile = () => {
  router.push(`/users/${props.user.id}`)
}

const sendMessage = () => {
  appStore.addNotification({
    type: 'info',
    title: '功能开发中',
    message: `消息功能正在开发中，即将上线！`
  })
}

const editUser = () => {
  appStore.addNotification({
    type: 'info',
    title: '编辑用户',
    message: `编辑用户 ${props.user.name} 的功能正在开发中`
  })
  showDropdown.value = false
}

const deleteUser = () => {
  if (confirm(`确定要删除用户 ${props.user.name} 吗？`)) {
    appStore.addNotification({
      type: 'warning',
      title: '删除确认',
      message: `用户 ${props.user.name} 删除功能正在开发中`
    })
  }
  showDropdown.value = false
}

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

// 点击外部关闭下拉菜单
document.addEventListener('click', () => {
  showDropdown.value = false
})
</script>

<style scoped>
.user-card {
  position: relative;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-xl);
  padding: 1.5rem;
  cursor: pointer;
  transition: var(--transition);
  overflow: hidden;
}

.user-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border-color: var(--primary-color);
}

.user-card:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px var(--primary-color-light);
}

.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(16, 185, 129, 0.05) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.user-card:hover .card-overlay {
  opacity: 1;
}

/* 用户头部 */
.user-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.user-avatar {
  position: relative;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.status-indicator {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 16px;
  height: 16px;
  border: 3px solid var(--bg-secondary);
  border-radius: 50%;
  background: var(--text-disabled);
}

.status-indicator.active {
  background: var(--success-color);
}

.user-basic {
  flex: 1;
  min-width: 0;
}

.user-name {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-username {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
}

.user-status {
  display: inline-block;
  padding: 2px 8px;
  background: var(--bg-tertiary);
  color: var(--text-disabled);
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.user-status.active {
  background: var(--success-color);
  color: white;
}

/* 用户信息 */
.user-info {
  margin-bottom: 1.5rem;
  space-y: 0.75rem;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.info-icon {
  width: 16px;
  height: 16px;
  color: var(--text-secondary);
  flex-shrink: 0;
}

.info-text {
  color: var(--text-secondary);
  font-size: 0.875rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 用户操作 */
.user-actions {
  display: flex;
  gap: 0.5rem;
  position: relative;
  z-index: 10;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 8px 12px;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  background: var(--bg-primary);
  color: var(--text-primary);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
  flex: 1;
  justify-content: center;
}

.action-btn svg {
  width: 16px;
  height: 16px;
}

.action-btn.primary {
  background: var(--primary-color);
  border-color: var(--primary-color);
  color: white;
}

.action-btn.primary:hover {
  background: var(--primary-color-dark);
  transform: translateY(-1px);
}

.action-btn.secondary:hover {
  background: var(--bg-secondary);
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.dropdown {
  position: relative;
}

.dropdown-toggle {
  flex: none !important;
  width: 40px;
  padding: 8px;
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
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 8px 12px;
  background: none;
  border: none;
  color: var(--text-primary);
  font-size: 0.875rem;
  cursor: pointer;
  transition: var(--transition);
}

.dropdown-item:hover {
  background: var(--bg-primary);
}

.dropdown-item.danger {
  color: var(--error-color);
}

.dropdown-item.danger:hover {
  background: var(--error-color);
  color: white;
}

.dropdown-item svg {
  width: 14px;
  height: 14px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .user-card {
    padding: 1rem;
  }
  
  .user-header {
    margin-bottom: 1rem;
  }
  
  .user-info {
    margin-bottom: 1rem;
  }
  
  .action-btn {
    padding: 6px 8px;
    font-size: 0.8rem;
  }
  
  .action-btn span {
    display: none;
  }
}
</style>
