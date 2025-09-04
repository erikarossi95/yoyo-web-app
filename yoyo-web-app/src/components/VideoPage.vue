<template>
  <div class="video-page" v-if="video">
    <div class="main-content">
      <!-- Video Player -->
      <div class="video-player">
        <div class="video-wrapper">
          <iframe
            :src="embedUrl"
            title="YouTube video"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>

      <!-- Video Info -->
      <div class="video-info">
        <h1 class="video-title">{{ video.title }}</h1>
        <div class="video-meta">
          <div class="author-info">
            <i class="bi bi-person-circle"></i>
            <span>{{ video.author }}</span>
          </div>
        </div>

        <!-- Actions -->
        <div class="video-actions">
          <div class="like-group">
            <button class="action-btn" :class="{ active: liked }" @click="toggleLike">
              <i class="bi bi-hand-thumbs-up"></i>
              {{ likes }}
            </button>
            <button class="action-btn" :class="{ active: disliked }" @click="toggleDislike">
              <i class="bi bi-hand-thumbs-down"></i>
              {{ dislikes }}
            </button>
          </div>
          
          <div class="share-group">
            <a :href="shareUrls.facebook" target="_blank" class="share-btn">
              <i class="bi bi-facebook"></i>
            </a>
            <a :href="shareUrls.twitter" target="_blank" class="share-btn">
              <i class="bi bi-twitter"></i>
            </a>
          </div>
        </div>
      </div>

      <!-- Comments -->
      <div class="comments-section">
        <h3>Commenti ({{ comments.length }})</h3>
        
        <div class="comments-list" v-if="comments.length">
          <div v-for="comment in comments" :key="comment.timestamp" class="comment">
            <div class="comment-header">
              <i class="bi bi-person-circle"></i>
              <strong>{{ comment.username }}</strong>
              <small>{{ comment.timestamp }}</small>
            </div>
            <p>{{ comment.text }}</p>
          </div>
        </div>
        
        <div v-else class="no-comments">
          <i class="bi bi-chat-dots"></i>
          <p>Nessun commento. Scrivi il primo!</p>
        </div>

        <form @submit.prevent="addComment" class="comment-form">
          <input v-model="newUsername" class="form-control mb-3" placeholder="Nome..." required />
          <div class="input-group">
            <input v-model="newComment" class="form-control" placeholder="Commento..." required />
            <button class="btn btn-primary" type="submit">Invia</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Related Videos -->
    <aside class="related-section">
      <h3 class="related-title">Video Correlati</h3>
      <div class="related-grid">
        <router-link 
          v-for="relatedVideo in relatedVideos.slice(0, 6)" 
          :key="relatedVideo.youtubeId"
          :to="`/video/${relatedVideo.youtubeId}`"
          class="related-card"
        >
          <div class="related-thumb">
            <img :src="`https://img.youtube.com/vi/${relatedVideo.youtubeId}/mqdefault.jpg`" :alt="relatedVideo.title" />
            <div class="related-play">
              <i class="bi bi-play-fill"></i>
            </div>
          </div>
          <div class="related-info">
            <h5>{{ relatedVideo.title }}</h5>
            <span>{{ relatedVideo.author }}</span>
          </div>
        </router-link>
      </div>
    </aside>
  </div>

  <div v-else-if="!isLoading" class="error-state">
    <i class="bi bi-exclamation-triangle"></i>
    <h3>Video non trovato</h3>
    <router-link to="/" class="btn btn-primary">Torna alla Home</router-link>
  </div>
</template>

<script setup>
import { computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useVideos } from '@/composables/useVideos'
import { useComments } from '@/composables/useComments'
import { useLikes } from '@/composables/useLikes'

const route = useRoute()
const { videos, isLoading, fetchVideos, getVideoById, getRelatedVideos } = useVideos()
const { comments, newUsername, newComment, addComment, clearComments } = useComments()
const { likes, dislikes, liked, disliked, toggleLike, toggleDislike, resetLikes } = useLikes()

const video = computed(() => getVideoById(route.params.youtubeId))
const relatedVideos = computed(() => getRelatedVideos(route.params.youtubeId))
const embedUrl = computed(() => 
  video.value ? `https://www.youtube.com/embed/${video.value.youtubeId}?rel=0&modestbranding=1` : ''
)

const shareUrls = computed(() => ({
  facebook: `https://www.facebook.com/sharer/sharer.php?u=https://www.youtube.com/watch?v=${video.value?.youtubeId}`,
  twitter: `https://twitter.com/intent/tweet?url=https://www.youtube.com/watch?v=${video.value?.youtubeId}`
}))

watch(() => route.params.youtubeId, () => {
  clearComments()
  resetLikes()
})

onMounted(fetchVideos)
</script>

<style scoped>
.video-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 2rem;
}

.video-player {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 25px var(--shadow);
  margin-bottom: 1.5rem;
}

.video-wrapper {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
}

.video-wrapper iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.video-info, .comments-section {
  background: var(--surface);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 15px var(--shadow);
  margin-bottom: 1.5rem;
}

.video-title {
  font-weight: 700;
  font-size: 1.4rem;
  margin-bottom: 1rem;
  line-height: 1.3;
}

.video-meta {
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border);
}

.author-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.author-info i {
  font-size: 1.5rem;
  color: var(--primary);
}

.video-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.like-group {
  display: flex;
  background: var(--background);
  border-radius: 25px;
  padding: 0.2rem;
}

.action-btn {
  border: none;
  background: transparent;
  padding: 0.6rem 1rem;
  border-radius: 20px;
  font-weight: 500;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.action-btn:hover {
  background: var(--primary);
  color: white;
}

.action-btn.active {
  background: var(--primary);
  color: white;
}

.share-group {
  display: flex;
  gap: 0.5rem;
}

.share-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--background);
  color: var(--text-secondary);
  transition: all 0.3s ease;
  text-decoration: none;
}

.share-btn:hover {
  background: var(--primary);
  color: white;
  transform: translateY(-1px);
}

.comments-list {
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 1.5rem;
}

.comment {
  border-bottom: 1px solid var(--border);
  padding-bottom: 1rem;
  margin-bottom: 1rem;
}

.comment-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.comment-header i {
  color: var(--primary);
  font-size: 1.2rem;
}

.comment p {
  margin: 0;
  margin-left: 1.7rem;
}

.no-comments {
  text-align: center;
  padding: 2rem;
  color: var(--text-secondary);
}

.no-comments i {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: var(--primary);
  opacity: 0.5;
}

.related-section {
  background: var(--surface);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 15px var(--shadow);
  height: fit-content;
}

.related-title {
  font-weight: 700;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.related-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.related-card {
  display: flex;
  gap: 0.8rem;
  padding: 0.8rem;
  border-radius: 12px;
  transition: all 0.3s ease;
  text-decoration: none;
  color: inherit;
}

.related-card:hover {
  background: var(--background);
  transform: translateY(-1px);
  text-decoration: none;
  color: inherit;
}

.related-thumb {
  position: relative;
  width: 80px;
  height: 45px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
}

.related-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.related-play {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity 0.3s ease;
  color: white;
  font-size: 1rem;
}

.related-card:hover .related-play {
  opacity: 1;
}

.related-info {
  flex: 1;
  min-width: 0;
}

.related-info h5 {
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 0.2rem;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.related-info span {
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.error-state {
  text-align: center;
  padding: 4rem 2rem;
}

.error-state i {
  font-size: 3rem;
  color: var(--primary);
  margin-bottom: 1rem;
}

@media (max-width: 992px) {
  .video-page {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .related-title {
    display: block !important;
  }
  
  .related-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  }
  
  .related-card {
    flex-direction: column;
    text-align: center;
  }
  
  .related-thumb {
    width: 100%;
    height: 120px;
  }
}

@media (max-width: 768px) {
  .video-page {
    padding: 0.5rem;
  }
  
  .video-actions {
    flex-direction: column;
    gap: 1rem;
  }
  
  .video-title {
    font-size: 1.2rem;
  }
}
</style>