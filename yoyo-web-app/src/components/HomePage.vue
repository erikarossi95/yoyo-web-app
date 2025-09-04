<template>
  <div class="homepage">
    <!-- Loading state -->
    <div v-if="isLoading" class="text-center mt-5">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Caricamento...</span>
      </div>
      <p class="mt-3">Caricamento video...</p>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="alert alert-danger text-center mt-4">
      {{ error }}
    </div>

    <!-- Video list -->
    <div v-else class="row">
      <div class="col-12">
        <p v-if="route.query.q" class="mb-3">
          Risultati per: <strong>"{{ route.query.q }}"</strong> 
          ({{ filteredVideos.length }} video{{ filteredVideos.length !== 1 ? 's' : '' }})
        </p>
        
        <p v-if="filteredVideos.length === 0 && route.query.q" class="text-muted text-center mt-5">
          Nessun video trovato per "{{ route.query.q }}"
        </p>
        
        <VideoList v-else :videos="filteredVideos" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import VideoList from './VideoList.vue'
import { useVideos } from '@/composables/useVideos'

const route = useRoute()
const { videos, isLoading, error, fetchVideos, searchVideos } = useVideos()

// Computed per video filtrati
const filteredVideos = computed(() => {
  const query = route.query.q
  return searchVideos(query)
})

// Fetch iniziale dei video
onMounted(async () => {
  await fetchVideos()
})

// Watch per cambiamenti nella query di ricerca
watch(() => route.query.q, () => {
  
}, { immediate: true })
</script>

<style scoped>
.homepage {
  min-height: 400px;
}

.spinner-border {
  width: 3rem;
  height: 3rem;
}
</style>