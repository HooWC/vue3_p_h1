<template>
  <div class="app-layout" :class="{ 'dark-theme': appStore.isDarkTheme }">
    <!-- 顶部导航栏 -->
    <AppHeader />
    
    <!-- 侧边栏 -->
    <AppSidebar />
    
    <!-- 主内容区域 -->
    <main class="main-content" :class="{ 'sidebar-open': appStore.sidebarOpen }">
      <div class="content-wrapper">
        <!-- 面包屑导航 -->
        <AppBreadcrumb />
        
        <!-- 页面内容 -->
        <div class="page-content">
          <Transition name="page" mode="out-in">
            <router-view />
          </Transition>
        </div>
      </div>
    </main>
    
    <!-- 通知组件 -->
    <AppNotifications />
    
    <!-- 加载指示器 -->
    <AppLoading v-if="appStore.pageLoading" />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAppStore } from '@/stores/app'
import { useUserStore } from '@/stores/user'
import AppHeader from './AppHeader.vue'
import AppSidebar from './AppSidebar.vue'
import AppBreadcrumb from './AppBreadcrumb.vue'
import AppNotifications from './AppNotifications.vue'
import AppLoading from '../ui/AppLoading.vue'

const appStore = useAppStore()
const userStore = useUserStore()

onMounted(() => {
  // 初始化应用
  appStore.initTheme()
  userStore.initCurrentUser()
  
  // 添加欢迎通知
  if (!userStore.isAuthenticated) {
    appStore.addNotification({
      type: 'info',
      title: '欢迎使用',
      message: '这是一个现代化的 Vue3 应用示例'
    })
  }
})
</script>

<style scoped>
.app-layout {
  min-height: 100vh;
  background: var(--bg-primary);
  color: var(--text-primary);
  transition: all 0.3s ease;
}

.main-content {
  margin-left: 0;
  margin-top: 70px;
  min-height: calc(100vh - 70px);
  transition: margin-left 0.3s ease;
}

.main-content.sidebar-open {
  margin-left: 280px;
}

.content-wrapper {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.page-content {
  margin-top: 1rem;
}

/* 页面过渡动画 */
.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

@media (max-width: 768px) {
  .main-content {
    margin-left: 0 !important;
  }
  
  .content-wrapper {
    padding: 1rem;
  }
}
</style>
