import { ref } from 'vue'

export function useComments() {
  const comments = ref([])
  const newUsername = ref('')
  const newComment = ref('')

  const addComment = () => {
    if (newComment.value.trim() && newUsername.value.trim()) {
      const comment = {
        username: newUsername.value.trim(),
        text: newComment.value.trim(),
        timestamp: new Date().toLocaleString()
      }
      
      comments.value.unshift(comment) 
      
      newUsername.value = ''
      newComment.value = ''
    }
  }

  const clearComments = () => {
    comments.value = []
  }

  return {
    comments,
    newUsername,
    newComment,
    addComment,
    clearComments
  }
}