<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

interface Movie {
  id: number
  title: string
  original_title: string
  tagline: string
  overview: string
  release_date: string
  runtime: number
  status: string
  vote_average: number
  vote_count: number
}

const movie = ref<Movie | null>(null)
const route = useRoute()
const router = useRouter()

onMounted(async () => {
  try {
    const response = await fetch(`http://localhost:3000/api/movies/${route.params.id}`)
    movie.value = (await response.json()).movie
  } catch (error) {
    console.error('Error fetching movie:', error)
  }
})

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString()
}

const goBack = () => {
  router.push('/')
}
</script>

<template>
  <main v-if="movie" class="max-w-4xl mx-auto p-8">
    <button 
      class="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md mb-8 text-base cursor-pointer transition-colors"
      @click="goBack"
    >
      &larr; Back to Movies
    </button>
    
    <h1 class="text-3xl font-bold">{{ movie.title }}</h1>
    <h2 
      v-if="movie.original_title !== movie.title"
      class="text-xl text-gray-600 font-normal mt-2"
    >
      ({{ movie.original_title }})
    </h2>
    
    <p class="italic text-gray-600 my-4">{{ movie.tagline }}</p>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div class="flex flex-col gap-2">
        <strong>Release Date:</strong>
        <span>{{ formatDate(movie.release_date) }}</span>
      </div>
      
      <div class="flex flex-col gap-2">
        <strong>Runtime:</strong>
        <span>{{ movie.runtime }} minutes</span>
      </div>
      
      <div class="flex flex-col gap-2">
        <strong>Status:</strong>
        <span>{{ movie.status }}</span>
      </div>
      
      <div class="flex flex-col gap-2">
        <strong>Rating:</strong>
        <span>{{ movie.vote_average }}/10 ({{ movie.vote_count }} votes)</span>
      </div>
    </div>
    
    <div class="bg-gray-100 p-6 rounded-lg">
      <h3 class="text-xl font-semibold mt-0 mb-4">Overview</h3>
      <p>{{ movie.overview }}</p>
    </div>
  </main>
  <div v-else class="text-center p-8">
    Loading...
  </div>
</template>

