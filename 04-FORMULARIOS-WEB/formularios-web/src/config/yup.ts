import * as yup from 'yup'

yup.setLocale({
  mixed: {
    required: 'El campo es requerido',
  },
  string: {
    email: 'El formato del email no es correcto',
    min: ({ min }) => `Debe tener al menos ${min} caracteres`,
    max: ({ max }) => `No puede tener más de ${max} caracteres`,
  },
})
