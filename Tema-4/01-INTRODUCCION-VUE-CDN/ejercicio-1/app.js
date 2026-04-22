const { createApp, ref, computed } = Vue;

const app = createApp({
  template: `
    <div class="row justify-content-center">
      <div class="col-12 col-md-9 col-lg-7">
        <div class="card shadow-sm border-0">
          <div class="card-body p-4">
            <h1 class="h3 mb-3">Mi agenda</h1>
            <p class="text-body-secondary mb-4">
              Total de contactos: <strong>{{ totalContacts }}</strong>
            </p>

            <form class="row g-2 mb-4" @submit.prevent="addContact">
              <div class="col-12 col-sm-8">
                <input
                  v-model="newContact"
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': showValidationError }"
                  placeholder="Escribe el nombre del contacto"
                >
                <div v-if="showValidationError" class="invalid-feedback d-block">
                  Debes introducir un nombre para poder anadirlo.
                </div>
              </div>

              <div class="col-12 col-sm-4 d-grid">
                <button type="submit" class="btn btn-primary">
                  Anadir contacto
                </button>
              </div>
            </form>

            <ul v-if="contacts.length" class="list-group">
              <li
                v-for="contact in contacts"
                :key="contact.id"
                class="list-group-item d-flex align-items-center"
              >
                <span class="badge text-bg-secondary me-3">#{{ contact.id }}</span>
                <span>{{ contact.name }}</span>
              </li>
            </ul>

            <p v-else class="mb-0 text-body-secondary">
              Todavia no hay contactos en la agenda.
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
  setup() {
    const contacts = ref([
      { id: 1, name: "Ana Garcia" },
      { id: 2, name: "Luis Perez" },
      { id: 3, name: "Marta Lopez" },
    ]);
    const newContact = ref("");
    const showValidationError = ref(false);

    const addContact = () => {
      const trimmedContact = newContact.value.trim();

      if (!trimmedContact) {
        showValidationError.value = true;
        return;
      }

      const nextId = contacts.value.length
        ? Math.max(...contacts.value.map((contact) => contact.id)) + 1
        : 1;

      contacts.value.push({ id: nextId, name: trimmedContact });
      newContact.value = "";
      showValidationError.value = false;
    };

    const totalContacts = computed(() => contacts.value.length);

    return {
      contacts,
      newContact,
      showValidationError,
      addContact,
      totalContacts,
    };
  },
});

app.mount("#vueApp");