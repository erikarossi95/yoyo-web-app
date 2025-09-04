<template>
  <router-link :to="`/video/${video.youtubeId}`" class="video-card">
    <div class="image-container">
      <img 
        :src="getThumbnailUrl(video.youtubeId)" 
        class="video-image" 
        :alt="video.title"
        loading="lazy"
      />
      <div class="play-overlay">
        <div class="play-btn">
          <i class="bi bi-play-fill"></i>
        </div>
      </div>
    </div>
    
    <div class="card-content">
      <h5 class="video-title">{{ video.title }}</h5>
      <div class="video-author">
        <i class="bi bi-person-circle author-icon"></i>
        <span>{{ video.author }}</span>
      </div>
    </div>
  </router-link>
</template>

<script setup>
defineProps({
  video: {
    type: Object,
    required: true,
  },
})

const getThumbnailUrl = (youtubeId) => {
  return `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`
}
</script>

<style scoped>
.video-card {
  display: block;
  background: var(--surface);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 15px var(--shadow);
  color: inherit;
  text-decoration: none;
  border: 1px solid rgba(134, 60, 184, 0.08);
}

.video-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 30px rgba(134, 60, 184, 0.15);
  color: inherit;
  text-decoration: none;
}

.image-container {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%;
  overflow: hidden;
}

.video-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.video-card:hover .video-image {
  transform: scale(1.05);
}

.play-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0);
  transition: background 0.3s ease;
}

.video-card:hover .play-overlay {
  background: rgba(0, 0, 0, 0.3);
}

.play-btn {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary), var(--primary-light));
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  transform: scale(0);
  transition: transform 0.3s ease;
  box-shadow: 0 4px 15px rgba(134, 60, 184, 0.4);
}

.video-card:hover .play-btn {
  transform: scale(1);
}

.play-btn i {
  margin-left: 2px;
}

.card-content {
  padding: 1.2rem;
}

.video-title {
  font-size: 0.95rem;
  font-weight: 600;
  line-height: 1.4;
  margin-bottom: 0.8rem;
  color: var(--text-primary);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 2.6rem;
}

.video-author {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  font-size: 0.85rem;
  font-weight: 500;
}

.author-icon {
  font-size: 1.1rem;
  color: var(--primary);
}

@media (max-width: 768px) {
  .play-btn {
    width: 45px;
    height: 45px;
    font-size: 18px;
  }
  .video-title {
    font-size: 0.9rem;
  }
}
</style>