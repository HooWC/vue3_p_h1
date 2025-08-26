<template>
  <aside class="app-sidebar" :class="{ open: appStore.sidebarOpen }">
    <div class="sidebar-content">
      <!-- 侧边栏头部 -->
      <div class="sidebar-header">
        <h3>导航菜单</h3>
        <button class="close-btn" @click="appStore.toggleSidebar">
          <svg viewBox="0 0 24 24" fill="none">
            <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" stroke-width="2"/>
            <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" stroke-width="2"/>
          </svg>
        </button>
      </div>
      
      <!-- 导航菜单 -->
      <nav class="sidebar-nav">
        <div class="nav-section">
          <h4 class="nav-section-title">主要功能</h4>
          <router-link 
            v-for="item in mainMenuItems" 
            :key="item.name"
            :to="item.path"
            class="nav-item"
            :class="{ active: $route.name === item.name }"
            @click="handleNavClick"
          >
            <svg class="nav-icon" viewBox="0 0 24 24" fill="none">
              <path :d="item.icon" stroke="currentColor" stroke-width="2"/>
            </svg>
            <span class="nav-text">{{ item.title }}</span>
            <span v-if="item.badge" class="nav-badge">{{ item.badge }}</span>
          </router-link>
        </div>
        
        <div class="nav-section" v-if="userStore.isAuthenticated">
          <h4 class="nav-section-title">管理功能</h4>
          <router-link 
            v-for="item in adminMenuItems" 
            :key="item.name"
            :to="item.path"
            class="nav-item"
            :class="{ active: $route.name === item.name }"
            @click="handleNavClick"
          >
            <svg class="nav-icon" viewBox="0 0 24 24" fill="none">
              <path :d="item.icon" stroke="currentColor" stroke-width="2"/>
            </svg>
            <span class="nav-text">{{ item.title }}</span>
            <span v-if="item.badge" class="nav-badge">{{ item.badge }}</span>
          </router-link>
        </div>
        
        <div class="nav-section">
          <h4 class="nav-section-title">其他</h4>
          <router-link 
            v-for="item in otherMenuItems" 
            :key="item.name"
            :to="item.path"
            class="nav-item"
            :class="{ active: $route.name === item.name }"
            @click="handleNavClick"
          >
            <svg class="nav-icon" viewBox="0 0 24 24" fill="none">
              <path :d="item.icon" stroke="currentColor" stroke-width="2"/>
            </svg>
            <span class="nav-text">{{ item.title }}</span>
          </router-link>
        </div>
      </nav>
      
      <!-- 侧边栏底部 -->
      <div class="sidebar-footer">
        <div class="user-info" v-if="userStore.isAuthenticated">
          <div class="user-avatar">
            <img v-if="userStore.currentUser?.avatar" :src="userStore.currentUser.avatar" :alt="userStore.userName" />
            <svg v-else viewBox="0 0 24 24" fill="none">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="2"/>
              <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2"/>
            </svg>
          </div>
          <div class="user-details">
            <div class="user-name">{{ userStore.userName }}</div>
            <div class="user-status">在线</div>
          </div>
        </div>
        
        <div class="app-version">
          <span>Vue3 应用 v1.0.0</span>
        </div>
      </div>
    </div>
    
    <!-- 遮罩层 -->
    <div 
      class="sidebar-overlay" 
      v-if="appStore.sidebarOpen"
      @click="appStore.toggleSidebar"
    ></div>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { useAppStore } from '@/stores/app'
import { useUserStore } from '@/stores/user'

const appStore = useAppStore()
const userStore = useUserStore()

const mainMenuItems = computed(() => [
  {
    name: 'Home',
    path: '/',
    title: '首页',
    icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10'
  },
  {
    name: 'Dashboard',
    path: '/dashboard',
    title: '仪表盘',
    icon: 'M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z',
    badge: userStore.isAuthenticated ? null : '需登录'
  }
])

const adminMenuItems = computed(() => [
  {
    name: 'Users',
    path: '/users',
    title: '用户管理',
    icon: 'M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M12.5 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0z M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75',
    badge: userStore.userCount > 0 ? userStore.userCount.toString() : null
  }
])

const otherMenuItems = [
  {
    name: 'About',
    path: '/about',
    title: '关于我们',
    icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'
  }
]

const handleNavClick = () => {
  // 在移动端点击导航后关闭侧边栏
  if (window.innerWidth <= 768) {
    appStore.toggleSidebar()
  }
}
</script>

<style scoped>
.app-sidebar {
  position: fixed;
  left: -280px;
  top: 70px;
  width: 280px;
  height: calc(100vh - 70px);
  background: var(--bg-secondary);
  border-right: 1px solid var(--border-color);
  transition: left 0.3s ease;
  z-index: 999;
  overflow: hidden;
}

.app-sidebar.open {
  left: 0;
}

.sidebar-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 1.5rem 1rem;
  border-bottom: 1px solid var(--border-color);
}

.sidebar-header h3 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
}

.close-btn {
  display: none;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: none;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: var(--bg-primary);
}

.close-btn svg {
  width: 18px;
  height: 18px;
  color: var(--text-secondary);
}

.sidebar-nav {
  flex: 1;
  padding: 1rem 0;
}

.nav-section {
  margin-bottom: 2rem;
}

.nav-section-title {
  margin: 0 0 0.75rem 1.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 1.5rem;
  color: var(--text-primary);
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
}

.nav-item:hover {
  background: var(--bg-primary);
  color: var(--primary-color);
}

.nav-item.active {
  background: var(--primary-color-light);
  color: var(--primary-color);
  font-weight: 600;
}

.nav-item.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: var(--primary-color);
}

.nav-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.nav-text {
  flex: 1;
  font-size: 0.9rem;
}

.nav-badge {
  padding: 2px 8px;
  background: var(--primary-color);
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 12px;
  white-space: nowrap;
}

.sidebar-footer {
  padding: 1.5rem;
  border-top: 1px solid var(--border-color);
  margin-top: auto;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 1rem;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  background: var(--primary-color-light);
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-avatar svg {
  width: 24px;
  height: 24px;
  color: var(--primary-color);
}

.user-details {
  flex: 1;
}

.user-name {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 2px;
}

.user-status {
  font-size: 0.75rem;
  color: var(--success-color);
}

.app-version {
  text-align: center;
}

.app-version span {
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.sidebar-overlay {
  position: fixed;
  top: 70px;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 998;
  backdrop-filter: blur(4px);
}

@media (max-width: 768px) {
  .close-btn {
    display: flex;
  }
  
  .app-sidebar {
    width: 100%;
    left: -100%;
  }
  
  .app-sidebar.open {
    left: 0;
  }
}

@media (min-width: 1024px) {
  .sidebar-overlay {
    display: none;
  }
}
</style>
