<template>
  <div id="app">
    <nav class="navbar">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/">
          <img src="/logo.svg" alt="YoYo" height="36" class="me-2">
        </router-link>
        <form class="search-form" @submit.prevent="handleSearch">
          <input
            v-model="searchQuery"
            class="search-input"
            type="search"
            placeholder="Cerca video..."
          />
          <button class="search-btn" type="submit">
            <i class="bi bi-search"></i>
          </button>
        </form>
      </div>
    </nav>

    <main class="container-fluid mt-4">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

const router = useRouter()
const searchQuery = ref('')

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ name: 'home', query: { q: searchQuery.value.trim() } })
  } else {
    router.push({ name: 'home' })
  }
  searchQuery.value = ''
}
</script>

<style>
:root {
  --primary: #863cb8;
  --primary-light: #a855f7;
  --background: #faf8ff;
  --surface: #ffffff;
  --text-primary: #1f2937;
  --text-secondary: #6b7280;
  --border: #e2e8f0;
  --shadow: rgba(134, 60, 184, 0.1);
}

* {
  box-sizing: border-box;
}

#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: linear-gradient(135deg, var(--background), #f1f0ff);
  min-height: 100vh;
}

.navbar {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border);
  padding: 1rem 0;
  box-shadow: 0 2px 10px var(--shadow);
}

.brand-text {
  font-weight: 800;
  font-size: 1.4rem;
  background: linear-gradient(135deg, var(--primary), var(--primary-light));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.search-form {
  position: relative;
  display: flex;
  align-items: center;
}

.search-input {
  border: 2px solid var(--border);
  border-radius: 25px;
  padding: 0.7rem 3.5rem 0.7rem 1.2rem;
  background: var(--surface);
  width: 280px;
  transition: all 0.3s ease;
  outline: none;
}

.search-input:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(134, 60, 184, 0.1);
}

.search-btn {
  position: absolute;
  right: 5px;
  background: linear-gradient(135deg, var(--primary), var(--primary-light));
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s;
}

.search-btn:hover {
  transform: scale(1.05);
}

.card {
  border: none;
  border-radius: 16px;
  box-shadow: 0 4px 20px var(--shadow);
  transition: all 0.3s ease;
  overflow: hidden;
  background: var(--surface);
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(134, 60, 184, 0.15);
}

.btn-primary {
  background: linear-gradient(135deg, var(--primary), var(--primary-light));
  border: none;
  border-radius: 10px;
  padding: 0.7rem 1.5rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 15px rgba(134, 60, 184, 0.3);
}

.btn-outline-secondary {
  border: 2px solid var(--border);
  border-radius: 10px;
  transition: all 0.3s ease;
}

.btn-outline-secondary:hover {
  background: var(--primary);
  border-color: var(--primary);
  color: white;
}

.form-control {
  border-radius: 10px;
  border: 2px solid var(--border);
  transition: border-color 0.3s ease;
}

.form-control:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 0.2rem rgba(134, 60, 184, 0.25);
}

.spinner-border {
  color: var(--primary);
}

@media (max-width: 768px) {
  .search-input {
    width: 200px;
  }
  .brand-text {
    font-size: 1.2rem;
  }
}
</style>