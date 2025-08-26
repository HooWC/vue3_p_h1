<template>
  <nav class="breadcrumb" v-if="breadcrumbs.length > 1">
    <ol class="breadcrumb-list">
      <li 
        v-for="(item, index) in breadcrumbs" 
        :key="index"
        class="breadcrumb-item"
        :class="{ active: index === breadcrumbs.length - 1 }"
      >
        <router-link 
          v-if="index < breadcrumbs.length - 1" 
          :to="item.path"
          class="breadcrumb-link"
        >
          <svg v-if="index === 0" class="home-icon" viewBox="0 0 24 24" fill="none">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" stroke-width="2"/>
            <polyline points="9,22 9,12 15,12 15,22" stroke="currentColor" stroke-width="2"/>
          </svg>
          <span>{{ item.title }}</span>
        </router-link>
        <span v-else class="breadcrumb-current">
          {{ item.title }}
        </span>
        
        <svg 
          v-if="index < breadcrumbs.length - 1" 
          class="separator" 
          viewBox="0 0 24 24" 
          fill="none"
        >
          <polyline points="9,18 15,12 9,6" stroke="currentColor" stroke-width="2"/>
        </svg>
      </li>
    </ol>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const breadcrumbs = computed(() => {
  const matched = route.matched.filter(item => item.meta && item.meta.title)
  
  const crumbs = [
    { title: '首页', path: '/' }
  ]
  
  matched.forEach(item => {
    if (item.path !== '/') {
      crumbs.push({
        title: item.meta.title,
        path: item.path
      })
    }
  })
  
  // 如果当前路由有参数，添加动态面包屑
  if (route.params.id && route.name === 'UserDetail') {
    crumbs.push({
      title: `用户 #${route.params.id}`,
      path: route.path
    })
  }
  
  return crumbs
})
</script>

<style scoped>
.breadcrumb {
  margin-bottom: 1.5rem;
}

.breadcrumb-list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
  list-style: none;
  gap: 0.5rem;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.breadcrumb-link {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 6px 12px;
  color: var(--text-secondary);
  text-decoration: none;
  border-radius: 8px;
  font-size: 0.875rem;
  transition: all 0.3s ease;
}

.breadcrumb-link:hover {
  color: var(--primary-color);
  background: var(--primary-color-light);
}

.breadcrumb-current {
  padding: 6px 12px;
  color: var(--text-primary);
  font-size: 0.875rem;
  font-weight: 600;
}

.home-icon {
  width: 16px;
  height: 16px;
}

.separator {
  width: 16px;
  height: 16px;
  color: var(--text-secondary);
  flex-shrink: 0;
}

.breadcrumb-item.active .breadcrumb-current {
  background: var(--bg-secondary);
  border-radius: 8px;
}

@media (max-width: 768px) {
  .breadcrumb-link span {
    display: none;
  }
  
  .breadcrumb-current {
    font-size: 0.8rem;
  }
}
</style>
