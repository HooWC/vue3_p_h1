<template>
  <Teleport to="body">
    <div class="loading-overlay">
      <div class="loading-content">
        <div class="loading-spinner">
          <div class="spinner-ring"></div>
          <div class="spinner-ring"></div>
          <div class="spinner-ring"></div>
          <div class="spinner-ring"></div>
        </div>
        <div class="loading-text">加载中...</div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
// 页面加载指示器组件
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

[data-theme="dark"] .loading-overlay {
  background: rgba(0, 0, 0, 0.8);
}

.loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.loading-spinner {
  position: relative;
  width: 60px;
  height: 60px;
}

.spinner-ring {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 3px solid transparent;
  border-radius: 50%;
  animation: spin 1.5s linear infinite;
}

.spinner-ring:nth-child(1) {
  border-top-color: var(--primary-color);
  animation-delay: 0s;
}

.spinner-ring:nth-child(2) {
  border-right-color: var(--primary-color);
  animation-delay: 0.375s;
}

.spinner-ring:nth-child(3) {
  border-bottom-color: var(--primary-color);
  animation-delay: 0.75s;
}

.spinner-ring:nth-child(4) {
  border-left-color: var(--primary-color);
  animation-delay: 1.125s;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loading-text {
  color: var(--text-primary);
  font-size: 1rem;
  font-weight: 500;
}
</style>
