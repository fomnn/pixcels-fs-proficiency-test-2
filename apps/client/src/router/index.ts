import { createRouter, createWebHistory } from 'vue-router'
import MovieListView from '../views/MovieListView.vue'
import MovieDetailView from '../views/MovieDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'movies',
      component: MovieListView
    },
    {
      path: '/movie/:id',
      name: 'movie-detail',
      component: MovieDetailView
    }
  ]
})

export default router
