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
  <section class="catalog">
    <div class="catalog__toolbar">
      <button
        class="catalog__button"
        :class="{ 'catalog__button--active': showInTheaters }"
        @click="toggleFilter"
      >
        {{ buttonText }}
      </button>
      <p class="catalog__counter">{{ counterText }}</p>
    </div>

    <div class="catalog__grid">
      <article v-for="movie in visibleMovies" :key="movie.id" class="movie-card">
        <div class="movie-card__poster-container">
          <img class="movie-card__poster" :src="movie.image" :alt="movie.name" />
          <span class="movie-card__year">{{ movie.year }}</span>
        </div>

        <div class="movie-card__content">
          <div class="movie-card__heading">
            <h2>{{ movie.name }}</h2>
            <p>{{ ratingLabel(movie.rating) }}</p>
          </div>

          <p class="movie-card__description">{{ movie.description }}</p>

          <div class="movie-card__meta">
            <span v-for="genre in movie.genres" :key="genre" class="movie-card__genre">{{
              genre
            }}</span>
          </div>

          <p class="movie-card__status" :class="{ 'movie-card__status--active': movie.inTheaters }">
            {{ movie.inTheaters ? 'Disponible en cines' : 'Fuera de cines' }}
          </p>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.catalog {
  width: min(1100px, calc(100% - 2rem));
  margin: 0 auto;
  padding: 1rem 0 3rem;
}

.catalog__toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  padding: 1rem 1.2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1.25rem;
  background: rgba(12, 10, 20, 0.42);
  backdrop-filter: blur(16px);
}

.catalog__button {
  border: 0;
  border-radius: 999px;
  padding: 0.85rem 1.35rem;
  background: linear-gradient(135deg, #f9b24f 0%, #ff7f6a 100%);
  color: #1d102b;
  font-weight: 700;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  box-shadow: 0 12px 32px rgba(255, 140, 94, 0.22);
}

.catalog__button--active {
  background: linear-gradient(135deg, #fff2c2 0%, #ffd177 100%);
}

.catalog__button:hover {
  transform: translateY(-1px);
}

.catalog__counter {
  margin: 0;
  color: rgba(246, 241, 255, 0.86);
  font-size: 0.98rem;
}

.catalog__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.25rem;
}

@media (max-width: 900px) {
  .catalog__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.movie-card {
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1.5rem;
  background: rgba(16, 14, 27, 0.78);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.26);
}

.movie-card__poster-container {
  position: relative;
  aspect-ratio: 4 / 5;
  overflow: hidden;
}

.movie-card__poster {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.movie-card__year {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.35rem 0.7rem;
  border-radius: 999px;
  background: rgba(11, 9, 18, 0.72);
  color: #fff2c7;
  font-weight: 700;
}

.movie-card__content {
  padding: 1.1rem 1.1rem 1.25rem;
}

.movie-card__heading {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
  justify-content: space-between;
}

.movie-card__heading h2 {
  margin: 0;
  font-size: 1.15rem;
}

.movie-card__heading p,
.movie-card__description,
.movie-card__status {
  margin: 0;
}

.movie-card__heading p {
  color: #ffd88a;
  white-space: nowrap;
}

.movie-card__description {
  margin-top: 0.85rem;
  color: rgba(246, 241, 255, 0.76);
  line-height: 1.55;
}

.movie-card__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}

.movie-card__genre {
  padding: 0.35rem 0.65rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  color: rgba(246, 241, 255, 0.92);
  font-size: 0.82rem;
}

.movie-card__status {
  margin-top: 1rem;
  color: #ffb0a5;
  font-weight: 700;
}

.movie-card__status--active {
  color: #89f1b1;
}

@media (max-width: 640px) {
  .catalog__grid {
    grid-template-columns: 1fr;
  }

  .catalog__toolbar {
    align-items: stretch;
  }

  .catalog__button {
    width: 100%;
  }

  .catalog__counter {
    width: 100%;
  }
}
</style>
