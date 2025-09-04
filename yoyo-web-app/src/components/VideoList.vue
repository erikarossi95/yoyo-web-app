<template>
  <div class="video-grid">
    <VideoCard 
      v-for="video in videos" 
      :key="video.youtubeId"
      :video="video"
      class="video-grid-item"
    />
  </div>
</template>

<script setup>
import VideoCard from './VideoCard.vue'

defineProps({
  videos: {
    type: Array,
    required: true,
  },
})
</script>

<style scoped>
.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  padding: 0.5rem;
}

@media (max-width: 768px) {
  .video-grid {
    grid-template-columns: 1fr;
    gap: 1.2rem;
    padding: 0.3rem;
  }
}

@media (max-width: 480px) {
  .video-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
</style>