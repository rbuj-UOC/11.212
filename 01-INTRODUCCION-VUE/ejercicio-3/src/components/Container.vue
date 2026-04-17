<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Movie } from '../models/movie.interface'

defineOptions({ name: 'MoviesContainer' })

const props = defineProps<{
  movies: Movie[]
}>()

const showInTheaters = ref(false)

const visibleMovies = computed(() =>
  showInTheaters.value ? props.movies.filter((movie) => movie.inTheaters) : props.movies,
)

const totalMovies = computed(() => props.movies.length)

const counterText = computed(() => {
  if (showInTheaters.value) {
    return `Mostrando ${visibleMovies.value.length} películas en cines (de ${totalMovies.value} totales)`
  }

  return `Mostrando un total de ${totalMovies.value} películas`
})

const buttonText = computed(() => (showInTheaters.value ? 'Mostrar todas' : 'En cines'))

const ratingLabel = (rating: number) => '★'.repeat(rating) + '☆'.repeat(Math.max(0, 5 - rating))

const toggleFilter = () => {
  showInTheaters.value = !showInTheaters.value
}
</script>

<template>
  <section class="container pt-2 pt-md-3 pb-4 pb-md-5">
    <div class="catalog-toolbar d-flex flex-column flex-md-row gap-3 align-items-md-center justify-content-between mb-4">
      <button class="btn btn-warning fw-semibold px-4 py-2" @click="toggleFilter">
        {{ buttonText }}
      </button>
      <p class="mb-0 counter-text">{{ counterText }}</p>
    </div>

    <div class="row g-4">
      <article v-for="movie in visibleMovies" :key="movie.id" class="col-12 col-sm-6 col-lg-4">
        <div class="card movie-card h-100 border-0">
          <div class="poster-wrapper">
            <img class="card-img-top poster-image" :src="movie.image" :alt="movie.name" loading="lazy" />
            <span class="badge rounded-pill text-bg-dark movie-year">{{ movie.year }}</span>
          </div>

          <div class="card-body d-flex flex-column">
            <div class="d-flex justify-content-between align-items-start gap-2 mb-2">
              <h2 class="h5 card-title mb-0">{{ movie.name }}</h2>
              <p class="movie-rating mb-0">{{ ratingLabel(movie.rating) }}</p>
            </div>

            <p class="card-text movie-description">{{ movie.description }}</p>

            <div class="d-flex flex-wrap gap-2 mt-auto">
              <span v-for="genre in movie.genres" :key="genre" class="badge text-bg-secondary">
                {{ genre }}
              </span>
            </div>

            <p class="fw-semibold mt-3 mb-0" :class="movie.inTheaters ? 'text-success' : 'text-danger'">
              {{ movie.inTheaters ? 'Disponible en cines' : 'Fuera de cines' }}
            </p>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.movie-card {
  background: rgba(16, 14, 27, 0.88);
  border-radius: 1rem;
  color: #f6f1ff;
  box-shadow: 0 16px 36px rgba(2, 6, 23, 0.7);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.movie-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 22px 44px rgba(2, 6, 23, 0.78);
}

.catalog-toolbar {
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.9rem;
  background: rgba(15, 23, 42, 0.95);
  padding: 1rem 1.1rem;
}

.counter-text {
  color: #e2e8f0;
}

.poster-wrapper {
  position: relative;
  aspect-ratio: 2 / 3;
  overflow: hidden;
  background: #0b0a12;
}

.poster-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.movie-year {
  position: absolute;
  top: 0.85rem;
  right: 0.85rem;
}

.movie-rating {
  color: #ffd88a;
  white-space: nowrap;
}

.movie-description {
  color: #e2e8f0;
  line-height: 1.5;
}
</style>
