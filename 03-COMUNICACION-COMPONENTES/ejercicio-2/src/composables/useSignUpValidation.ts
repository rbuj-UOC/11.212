import { computed, reactive } from 'vue'
import type { UserRegistration } from '@/models/user.interface'

export function useSignUpValidation(form: UserRegistration) {
  const touched = reactive({
    name: false,
    email: false,
    password: false,
  })

  const isNameValid = computed(() => form.name.trim().length >= 2)
  const isEmailValid = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
  const isPasswordValid = computed(() => form.password.length >= 8)

  const nameError = computed(() => {
    if (!touched.name || isNameValid.value) {
      return ''
    }

    return 'El nombre debe tener al menos 2 caracteres.'
  })

  const emailError = computed(() => {
    if (!touched.email || isEmailValid.value) {
      return ''
    }

    return 'Introduce un correo electrónico válido.'
  })

  const passwordError = computed(() => {
    if (!touched.password || isPasswordValid.value) {
      return ''
    }

    return 'La contraseña debe tener al menos 8 caracteres.'
  })

  const errors = computed(() =>
    [nameError.value, emailError.value, passwordError.value].filter(Boolean),
  )

  const isFormValid = computed(
    () => isNameValid.value && isEmailValid.value && isPasswordValid.value,
  )

  function touchField(field: keyof typeof touched) {
    touched[field] = true
  }

  function touchAll() {
    touched.name = true
    touched.email = true
    touched.password = true
  }

  function resetValidation() {
    touched.name = false
    touched.email = false
    touched.password = false
  }

  return {
    errors,
    isFormValid,
    nameError,
    emailError,
    passwordError,
    touchField,
    touchAll,
    resetValidation,
  }
}
