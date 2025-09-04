import { ref } from 'vue'
import axios from 'axios'

const API_URL = 'https://ott-fogliata.github.io/vuejs-s2i-repository/yoyo.json'

const videos = ref([])
const isLoading = ref(false)
const error = ref(null)

export function useVideos() {
  const fetchVideos = async () => {
    
    if (videos.value.length > 0) return videos.value
    
    isLoading.value = true
    error.value = null
    
    try {
      const response = await axios.get(API_URL)
      videos.value = response.data
      return response.data
    } catch (err) {
      error.value = 'Errore nel recupero dei video'
      console.error('Errore API:', err)
      return []
    } finally {
      isLoading.value = false
    }
  }

  const getVideoById = (youtubeId) => {
    return videos.value.find(video => video.youtubeId === youtubeId)
  }

  const getRelatedVideos = (currentId) => {
    return videos.value.filter(video => video.youtubeId !== currentId)
  }

  const searchVideos = (query) => {
    if (!query) return videos.value
    
    const searchTerm = query.toLowerCase()
    return videos.value.filter(video =>
      video.title.toLowerCase().includes(searchTerm) ||
      video.author.toLowerCase().includes(searchTerm)
    )
  }

  return {
    videos,
    isLoading,
    error,
    fetchVideos,
    getVideoById,
    getRelatedVideos,
    searchVideos
  }
}