<template>
  <div class="users-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <div class="header-left">
          <h1 class="page-title">用户管理</h1>
          <p class="page-description">管理系统用户信息，查看用户详情和状态</p>
        </div>
        <div class="header-actions">
          <button class="btn btn-primary" @click="refreshUsers">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M1 4v6h6" stroke="currentColor" stroke-width="2"/>
              <path d="m1 10 2.41-2.41A8 8 0 1 1 7 3h5" stroke="currentColor" stroke-width="2"/>
            </svg>
            刷新数据
          </button>
        </div>
      </div>
    </div>

    <!-- 过滤器 -->
    <div class="filters-section">
      <div class="filters-grid">
        <div class="filter-item">
          <label for="search">搜索用户</label>
          <div class="search-box">
            <svg class="search-icon" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2"/>
              <path d="m21 21-4.35-4.35" stroke="currentColor" stroke-width="2"/>
            </svg>
            <input 
              id="search"
              type="text" 
              placeholder="按姓名、邮箱搜索..." 
              v-model="searchQuery"
            />
          </div>
        </div>
        
        <div class="filter-item">
          <label for="status">用户状态</label>
          <select id="status" v-model="statusFilter">
            <option value="">全部状态</option>
            <option value="active">活跃用户</option>
            <option value="inactive">非活跃用户</option>
          </select>
        </div>
        
        <div class="filter-item">
          <label for="sort">排序方式</label>
          <select id="sort" v-model="sortBy">
            <option value="name">按姓名</option>
            <option value="email">按邮箱</option>
            <option value="lastLogin">按登录时间</option>
          </select>
        </div>
      </div>
    </div>

    <!-- 用户统计 -->
    <div class="stats-cards">
      <div class="stat-card">
        <div class="stat-icon" style="background: #dbeafe; color: #3b82f6;">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="2"/>
            <circle cx="8.5" cy="7" r="4" stroke="currentColor" stroke-width="2"/>
            <line x1="20" y1="8" x2="20" y2="14" stroke="currentColor" stroke-width="2"/>
            <line x1="23" y1="11" x2="17" y2="11" stroke="currentColor" stroke-width="2"/>
          </svg>
        </div>
        <div class="stat-content">
          <div class="stat-value">{{ userStore.userCount }}</div>
          <div class="stat-label">用户总数</div>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon" style="background: #dcfce7; color: #16a34a;">
          <svg viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
            <path d="M8 14s1.5 2 4 2 4-2 4-2" stroke="currentColor" stroke-width="2"/>
            <line x1="9" y1="9" x2="9.01" y2="9" stroke="currentColor" stroke-width="2"/>
            <line x1="15" y1="9" x2="15.01" y2="9" stroke="currentColor" stroke-width="2"/>
          </svg>
        </div>
        <div class="stat-content">
          <div class="stat-value">{{ userStore.activeUsers.length }}</div>
          <div class="stat-label">活跃用户</div>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon" style="background: #fef3c7; color: #d97706;">
          <svg viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
            <path d="M12 6v6l4 2" stroke="currentColor" stroke-width="2"/>
          </svg>
        </div>
        <div class="stat-content">
          <div class="stat-value">{{ userStore.userCount - userStore.activeUsers.length }}</div>
          <div class="stat-label">非活跃用户</div>
        </div>
      </div>
    </div>

    <!-- 加载状态 -->
    <div v-if="userStore.loading" class="loading-state">
      <div class="loading-spinner">
        <div class="spinner"></div>
      </div>
      <p>加载用户数据中...</p>
    </div>

    <!-- 错误状态 -->
    <div v-else-if="userStore.error" class="error-state">
      <div class="error-icon">
        <svg viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
          <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" stroke-width="2"/>
          <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" stroke-width="2"/>
        </svg>
      </div>
      <h3>加载失败</h3>
      <p>{{ userStore.error }}</p>
      <button class="btn btn-primary" @click="refreshUsers">重试</button>
    </div>

    <!-- 用户列表 -->
    <div v-else-if="filteredUsers.length > 0" class="users-grid">
      <UserCard 
        v-for="user in paginatedUsers" 
        :key="user.id"
        :user="user"
        @click="goToUserDetail(user.id)"
      />
    </div>

    <!-- 空状态 -->
    <div v-else class="empty-state">
      <div class="empty-icon">
        <svg viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
          <line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" stroke-width="2"/>
          <line x1="12" y1="16" x2="12.01" y2="16" stroke="currentColor" stroke-width="2"/>
        </svg>
      </div>
      <h3>暂无用户数据</h3>
      <p>{{ searchQuery ? '没有找到匹配的用户' : '点击刷新按钮获取用户数据' }}</p>
      <button class="btn btn-primary" @click="refreshUsers">获取数据</button>
    </div>

    <!-- 分页 -->
    <div v-if="totalPages > 1" class="pagination">
      <button 
        class="pagination-btn"
        :disabled="currentPage === 1"
        @click="currentPage--"
      >
        <svg viewBox="0 0 24 24" fill="none">
          <polyline points="15,18 9,12 15,6" stroke="currentColor" stroke-width="2"/>
        </svg>
        上一页
      </button>
      
      <div class="page-numbers">
        <button 
          v-for="page in visiblePages" 
          :key="page"
          class="page-number"
          :class="{ active: page === currentPage }"
          @click="currentPage = page"
        >
          {{ page }}
        </button>
      </div>
      
      <button 
        class="pagination-btn"
        :disabled="currentPage === totalPages"
        @click="currentPage++"
      >
        下一页
        <svg viewBox="0 0 24 24" fill="none">
          <polyline points="9,18 15,12 9,6" stroke="currentColor" stroke-width="2"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useAppStore } from '@/stores/app'
import UserCard from '@/components/cards/UserCard.vue'

const router = useRouter()
const userStore = useUserStore()
const appStore = useAppStore()

const searchQuery = ref('')
const statusFilter = ref('')
const sortBy = ref('name')
const currentPage = ref(1)
const itemsPerPage = 9

// 计算属性
const filteredUsers = computed(() => {
  let users = [...userStore.users]
  
  // 搜索过滤
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    users = users.filter(user => 
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.username.toLowerCase().includes(query)
    )
  }
  
  // 状态过滤
  if (statusFilter.value === 'active') {
    users = users.filter(user => user.active)
  } else if (statusFilter.value === 'inactive') {
    users = users.filter(user => !user.active)
  }
  
  // 排序
  users.sort((a, b) => {
    switch (sortBy.value) {
      case 'name':
        return a.name.localeCompare(b.name)
      case 'email':
        return a.email.localeCompare(b.email)
      case 'lastLogin':
        return new Date(b.lastLogin) - new Date(a.lastLogin)
      default:
        return 0
    }
  })
  
  return users
})

const totalPages = computed(() => Math.ceil(filteredUsers.value.length / itemsPerPage))

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredUsers.value.slice(start, end)
})

const visiblePages = computed(() => {
  const pages = []
  const total = totalPages.value
  const current = currentPage.value
  
  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    if (current <= 4) {
      for (let i = 1; i <= 5; i++) {
        pages.push(i)
      }
      pages.push('...', total)
    } else if (current >= total - 3) {
      pages.push(1, '...')
      for (let i = total - 4; i <= total; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1, '...')
      for (let i = current - 1; i <= current + 1; i++) {
        pages.push(i)
      }
      pages.push('...', total)
    }
  }
  
  return pages
})

// 方法
const refreshUsers = async () => {
  await userStore.fetchUsers()
  appStore.addNotification({
    type: 'success',
    title: '数据已刷新',
    message: `成功加载 ${userStore.userCount} 个用户`
  })
}

const goToUserDetail = (userId) => {
  router.push(`/users/${userId}`)
}

// 监听搜索和过滤变化，重置分页
watch([searchQuery, statusFilter], () => {
  currentPage.value = 1
})

// 初始化
onMounted(() => {
  if (userStore.users.length === 0) {
    refreshUsers()
  }
})
</script>

<style scoped>
.users-page {
  space-y: 2rem;
}

/* 页面头部 */
.page-header {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 2rem;
  margin-bottom: 2rem;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.page-description {
  color: var(--text-secondary);
  font-size: 1rem;
}

.header-actions {
  flex-shrink: 0;
}

/* 过滤器 */
.filters-section {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.filters-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 1.5rem;
  align-items: end;
}

.filter-item label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--text-primary);
  font-size: 0.875rem;
}

.search-box {
  position: relative;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  color: var(--text-secondary);
}

.search-box input {
  width: 100%;
  padding: 12px 12px 12px 40px;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  background: var(--bg-primary);
  color: var(--text-primary);
  font-size: 14px;
  transition: var(--transition);
}

.search-box input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px var(--primary-color-light);
}

select {
  width: 100%;
  padding: 12px;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  background: var(--bg-primary);
  color: var(--text-primary);
  font-size: 14px;
  transition: var(--transition);
}

select:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px var(--primary-color-light);
}

/* 统计卡片 */
.stats-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  transition: var(--transition);
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-icon svg {
  width: 24px;
  height: 24px;
}

.stat-value {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

/* 用户网格 */
.users-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

/* 状态组件 */
.loading-state,
.error-state,
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  margin-bottom: 2rem;
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

.error-icon,
.empty-icon {
  width: 64px;
  height: 64px;
  color: var(--text-secondary);
  margin-bottom: 1rem;
}

.error-state h3,
.empty-state h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.error-state p,
.empty-state p,
.loading-state p {
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

/* 分页 */
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 2rem 0;
}

.pagination-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 10px 16px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  font-size: 14px;
  cursor: pointer;
  transition: var(--transition);
}

.pagination-btn:hover:not(:disabled) {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-btn svg {
  width: 16px;
  height: 16px;
}

.page-numbers {
  display: flex;
  gap: 0.5rem;
}

.page-number {
  width: 40px;
  height: 40px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
}

.page-number:hover {
  background: var(--primary-color-light);
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.page-number.active {
  background: var(--primary-color);
  border-color: var(--primary-color);
  color: white;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    align-items: stretch;
  }
  
  .filters-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-cards {
    grid-template-columns: 1fr;
  }
  
  .users-grid {
    grid-template-columns: 1fr;
  }
  
  .pagination {
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  
  .page-numbers {
    order: -1;
    width: 100%;
    justify-content: center;
  }
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
  transform: translateY(-1px);
}
</style>
