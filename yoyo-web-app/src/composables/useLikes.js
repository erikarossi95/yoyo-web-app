import { ref } from 'vue'

export function useLikes() {
  const likes = ref(0)
  const dislikes = ref(0)
  const liked = ref(false)
  const disliked = ref(false)

  const toggleLike = () => {
    if (liked.value) {
      // Remove like
      likes.value--
      liked.value = false
    } else {
      // Add like
      likes.value++
      liked.value = true
      
      // Remove dislike if exists
      if (disliked.value) {
        dislikes.value--
        disliked.value = false
      }
    }
  }

  const toggleDislike = () => {
    if (disliked.value) {
      // Remove dislike
      dislikes.value--
      disliked.value = false
    } else {
      // Add dislike
      dislikes.value++
      disliked.value = true
      
      // Remove like if exists
      if (liked.value) {
        likes.value--
        liked.value = false
      }
    }
  }

  const resetLikes = () => {
    likes.value = 0
    dislikes.value = 0
    liked.value = false
    disliked.value = false
  }

  return {
    likes,
    dislikes,
    liked,
    disliked,
    toggleLike,
    toggleDislike,
    resetLikes
  }
}