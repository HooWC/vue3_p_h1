<template>
  <Teleport to="body">
    <div class="notifications-container">
      <TransitionGroup name="notification" tag="div">
        <div
          v-for="notification in visibleNotifications"
          :key="notification.id"
          class="notification"
          :class="[notification.type]"
        >
          <div class="notification-icon">
            <svg v-if="notification.type === 'success'" viewBox="0 0 24 24" fill="none">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" stroke-width="2"/>
              <polyline points="22,4 12,14.01 9,11.01" stroke="currentColor" stroke-width="2"/>
            </svg>
            <svg v-else-if="notification.type === 'error'" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
              <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" stroke-width="2"/>
              <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" stroke-width="2"/>
            </svg>
            <svg v-else-if="notification.type === 'warning'" viewBox="0 0 24 24" fill="none">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke="currentColor" stroke-width="2"/>
              <line x1="12" y1="9" x2="12" y2="13" stroke="currentColor" stroke-width="2"/>
              <line x1="12" y1="17" x2="12.01" y2="17" stroke="currentColor" stroke-width="2"/>
            </svg>
            <svg v-else viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
              <line x1="12" y1="16" x2="12" y2="12" stroke="currentColor" stroke-width="2"/>
              <line x1="12" y1="8" x2="12.01" y2="8" stroke="currentColor" stroke-width="2"/>
            </svg>
          </div>
          
          <div class="notification-content">
            <div class="notification-title">{{ notification.title }}</div>
            <div class="notification-message">{{ notification.message }}</div>
          </div>
          
          <button 
            class="notification-close"
            @click="removeNotification(notification.id)"
          >
            <svg viewBox="0 0 24 24" fill="none">
              <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" stroke-width="2"/>
              <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" stroke-width="2"/>
            </svg>
          </button>
          
          <div 
            class="notification-progress"
            :style="{ animationDuration: `${NOTIFICATION_DURATION}ms` }"
          ></div>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup>
import { computed, onMounted, onUnmounted } from 'vue'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()

const NOTIFICATION_DURATION = 5000 // 5秒后自动消失

const visibleNotifications = computed(() => appStore.notifications.slice(0, 5))

let autoRemoveTimers = new Map()

const removeNotification = (id) => {
  const notification = appStore.notifications.find(n => n.id === id)
  if (notification) {
    appStore.markNotificationRead(id)
    // 延迟移除以显示动画
    setTimeout(() => {
      const index = appStore.notifications.findIndex(n => n.id === id)
      if (index > -1) {
        appStore.notifications.splice(index, 1)
      }
    }, 300)
  }
  
  if (autoRemoveTimers.has(id)) {
    clearTimeout(autoRemoveTimers.get(id))
    autoRemoveTimers.delete(id)
  }
}

const setupAutoRemove = (notification) => {
  const timer = setTimeout(() => {
    removeNotification(notification.id)
  }, NOTIFICATION_DURATION)
  
  autoRemoveTimers.set(notification.id, timer)
}

// 监听新通知
const unwatchNotifications = appStore.$subscribe((mutation, state) => {
  if (mutation.type === 'direct' && mutation.events?.some(e => e.key === 'notifications')) {
    const newNotifications = state.notifications.filter(n => 
      !autoRemoveTimers.has(n.id) && !n.read
    )
    
    newNotifications.forEach(setupAutoRemove)
  }
})

onMounted(() => {
  // 为现有通知设置自动移除
  appStore.notifications.forEach(notification => {
    if (!notification.read) {
      setupAutoRemove(notification)
    }
  })
})

onUnmounted(() => {
  unwatchNotifications()
  autoRemoveTimers.forEach(timer => clearTimeout(timer))
  autoRemoveTimers.clear()
})
</script>

<style scoped>
.notifications-container {
  position: fixed;
  top: 90px;
  right: 20px;
  z-index: 1001;
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 400px;
  width: 100%;
}

.notification {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  overflow: hidden;
}

.notification.success {
  border-left-color: var(--success-color);
  border-left-width: 4px;
}

.notification.error {
  border-left-color: var(--error-color);
  border-left-width: 4px;
}

.notification.warning {
  border-left-color: var(--warning-color);
  border-left-width: 4px;
}

.notification.info {
  border-left-color: var(--info-color);
  border-left-width: 4px;
}

.notification-icon {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  margin-top: 2px;
}

.notification.success .notification-icon {
  color: var(--success-color);
}

.notification.error .notification-icon {
  color: var(--error-color);
}

.notification.warning .notification-icon {
  color: var(--warning-color);
}

.notification.info .notification-icon {
  color: var(--info-color);
}

.notification-icon svg {
  width: 100%;
  height: 100%;
}

.notification-content {
  flex: 1;
  min-width: 0;
}

.notification-title {
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 4px;
  font-size: 14px;
}

.notification-message {
  color: var(--text-secondary);
  font-size: 13px;
  line-height: 1.4;
}

.notification-close {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  background: none;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  color: var(--text-secondary);
  transition: all 0.3s ease;
  margin-top: 2px;
}

.notification-close:hover {
  background: var(--bg-primary);
  color: var(--text-primary);
}

.notification-close svg {
  width: 16px;
  height: 16px;
}

.notification-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background: linear-gradient(
    90deg, 
    var(--primary-color), 
    var(--primary-color-light)
  );
  animation: progress linear forwards;
  transform-origin: left;
}

@keyframes progress {
  from {
    transform: scaleX(1);
  }
  to {
    transform: scaleX(0);
  }
}

/* 通知动画 */
.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(100%) scale(0.8);
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(100%) scale(0.8);
}

.notification-move {
  transition: transform 0.3s ease;
}

@media (max-width: 768px) {
  .notifications-container {
    top: 80px;
    right: 10px;
    left: 10px;
    max-width: none;
  }
  
  .notification {
    padding: 12px;
  }
  
  .notification-title {
    font-size: 13px;
  }
  
  .notification-message {
    font-size: 12px;
  }
}
</style>
