<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Note } from '../types/note'

const noteText = ref('')
const notes = ref<Note[]>([])

const totalNotes = computed(() => notes.value.length)

function createTimeStamp(date: Date): string {
  return date.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}

function addNote() {
  const text = noteText.value.trim()

  if (!text) {
    return
  }

  notes.value.unshift({
    text,
    time: createTimeStamp(new Date()),
  })

  noteText.value = ''
}

function deleteNote(index: number) {
  notes.value.splice(index, 1)
}
</script>

<template>
  <article class="card">
    <h2>Notas</h2>

    <div class="actions">
      <textarea v-model="noteText" placeholder="Escribe una nota"></textarea>
      <button type="button" @click="addNote">Añadir</button>
    </div>

    <ul v-if="notes.length" class="notes-list">
      <li v-for="(note, index) in notes" :key="`${note.time}-${index}`" class="note-item">
        <div>
          <p class="note-text">{{ note.text }}</p>
          <small class="note-time">{{ note.time }}</small>
        </div>
        <button type="button" class="delete-btn" @click="deleteNote(index)">Eliminar</button>
      </li>
    </ul>
    <p v-else class="empty-state">Todavía no hay notas.</p>

    <p class="counter">Total de notas: {{ totalNotes }}</p>
  </article>
</template>

<style scoped>
.card {
  background-color: #e0f2fe;
  border-left: 4px solid #0ea5e9;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.08);
  padding: 1rem;
}

h2 {
  color: #334155;
  margin-top: 0;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

textarea {
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  min-height: 90px;
  padding: 0.55rem 0.75rem;
  resize: vertical;
}

button {
  align-self: flex-end;
  background-color: #0ea5e9;
  border: 0;
  border-radius: 8px;
  color: #ffffff;
  cursor: pointer;
  padding: 0.55rem 0.75rem;
}

.notes-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.note-item {
  align-items: start;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  padding: 0.55rem 0;
}

.note-text {
  color: #0f172a;
  margin: 0;
}

.note-time {
  color: #64748b;
}

.delete-btn {
  background-color: #ef4444;
}

.empty-state {
  color: #64748b;
  font-style: italic;
}

.counter {
  border-top: 1px solid #e2e8f0;
  color: #0f172a;
  font-weight: 600;
  margin-bottom: 0;
  margin-top: 0.75rem;
  padding-top: 0.75rem;
}
</style>
