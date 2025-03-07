<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Movie {
  id: number
  title: string
  tagline: string
  vote_average: number
}

const movies = ref<Movie[]>([])

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:3000/api/movies')
    movies.value = (await response.json()).movies.default

  } catch (error) {
    console.error('Error fetching movies:', error)
  }
})
</script>

<template>
  <main class="px-6 py-8">
    <h1 class="text-2xl font-bold mb-6">Movies</h1>
    <table class="border border-slate-300">
      <thead class="bg-slate-100">
        <tr>
          <th>Title</th>
          <th class="hidden sm:table-cell">Tagline</th>
          <th class="hidden lg:table-cell">Rating</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="movie in movies" :key="movie.id" class="border-y border-slate-300">
          <td>
            <div class="flex flex-col gap-2">
              <RouterLink :to="`/movie/${movie.id}`" class="font-semibold hover:text-sky-700">{{ movie.title }}</RouterLink>
              <p class="block lg:hidden text-sm">Rating: {{ movie.vote_average }} / 10</p>
              <p class="block sm:hidden">{{ movie.tagline }}</p>
            </div>
          </td>
          <td class="hidden sm:table-cell">{{ movie.tagline }}</td>
          <td class="text-nowrap hidden lg:table-cell">{{ movie.vote_average }} / 10</td>
        </tr>
      </tbody>
    </table>
  </main>
</template>

<style scoped>
td, th {
  padding-inline: 8px;
  padding-block: 4px;
}
</style>
