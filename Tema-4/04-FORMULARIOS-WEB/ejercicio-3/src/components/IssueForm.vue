<script setup lang="ts">
import { computed, watch } from "vue";
import { ErrorMessage, Field, useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import type { CategoryValue, IncidentFormValues } from "@/models/issue-form.model";

const categories = [
  { value: "error-tecnico", label: "Error Técnico" },
  { value: "consulta", label: "Consulta" },
  { value: "facturacion", label: "Facturación" },
] as const;

const validationSchema = computed(() =>
  toTypedSchema(
    yup.object({
      subject: yup
        .string()
        .required("El asunto es obligatorio")
        .min(5, "El asunto debe tener al menos 5 caracteres")
        .max(100, "El asunto no puede superar los 100 caracteres"),
      replyEmail: yup
        .string()
        .required("El correo electrónico es obligatorio")
        .email("El correo electrónico no tiene un formato valido"),
      category: yup
        .mixed<CategoryValue>()
        .oneOf(["error-tecnico", "consulta", "facturacion"], "Selecciona una categoría valida")
        .required("La categoría es obligatoria"),
      invoiceNumber: yup.string().when("category", ([category], fieldSchema) => {
        if (category === "facturacion") {
          return fieldSchema
            .required("El numero de factura es obligatorio")
            .matches(/^[a-zA-Z0-9]{6}$/, "El numero de factura no es valido");
        }

        return fieldSchema.strip();
      }),
      softwareVersion: yup.string().when("category", ([category], fieldSchema) => {
        if (category === "error-tecnico") {
          return fieldSchema
            .required("La version del programa es obligatoria")
            .matches(/^\d+$/, "La version del programa debe ser un número")
            .min(1, "La version del programa es obligatoria");
        }

        return fieldSchema.strip();
      }),
      description: yup
        .string()
        .required("La descripción detallada es obligatoria")
        .min(20, "La descripción debe tener al menos 20 caracteres"),
    }),
  ),
);

const { errors, meta, values, setFieldValue, handleSubmit } = useForm<IncidentFormValues>({
  validationSchema,
  initialValues: {
    subject: "",
    replyEmail: "",
    category: "",
    invoiceNumber: "",
    softwareVersion: "",
    description: "",
  },
  validateOnMount: true,
});

watch(
  () => values.category,
  (category) => {
    if (category !== "facturacion") {
      setFieldValue("invoiceNumber", "");
    }

    if (category !== "error-tecnico") {
      setFieldValue("softwareVersion", "");
    }
  },
);

const canSubmit = computed(() => meta.value.valid);

function getCategoryLabel(category: CategoryValue): string {
  return categories.find((item) => item.value === category)?.label ?? category;
}

const onSubmit = handleSubmit((validValues) => {
  const category = validValues.category as CategoryValue;

  const payload: Record<string, unknown> = {
    subject: validValues.subject.trim(),
    replyEmail: validValues.replyEmail.trim(),
    category: getCategoryLabel(category),
    description: validValues.description.trim(),
    details: {},
  };

  const details: Record<string, unknown> = {};

  if (category === "facturacion") {
    details.invoiceNumber = validValues.invoiceNumber.trim();
  }

  if (category === "error-tecnico") {
    details.softwareVersion = Number(validValues.softwareVersion);
  }

  payload.details = details;

  console.log("Incidencia payload:", payload);
});
</script>

<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-12 col-lg-9 col-xl-8">
        <div class="card shadow-sm border-0">
          <div class="card-body p-4 p-md-5">
            <h1 class="h2 mb-4">Formulario de incidencias</h1>

            <form novalidate @submit="onSubmit">
              <div class="mb-3">
                <label class="form-label" for="subject">Asunto</label>
                <Field name="subject" v-slot="{ field }">
                  <input
                    id="subject"
                    v-bind="field"
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': errors.subject }"
                    placeholder="Asunto del ticket"
                  />
                </Field>
                <ErrorMessage name="subject" as="div" class="invalid-feedback d-block" />
              </div>

              <div class="mb-3">
                <label class="form-label" for="replyEmail">Correo electrónico</label>
                <Field name="replyEmail" v-slot="{ field }">
                  <input
                    id="replyEmail"
                    v-bind="field"
                    type="email"
                    class="form-control"
                    :class="{ 'is-invalid': errors.replyEmail }"
                    placeholder="correo@email.com"
                  />
                </Field>
                <ErrorMessage name="replyEmail" as="div" class="invalid-feedback d-block" />
              </div>

              <div class="mb-3">
                <label class="form-label" for="category">Categoría de incidencia</label>
                <Field name="category" v-slot="{ field }">
                  <select
                    id="category"
                    v-bind="field"
                    class="form-select"
                    :class="{ 'is-invalid': errors.category }"
                  >
                    <option value="">Selecciona una categoría</option>
                    <option
                      v-for="categoryOption in categories"
                      :key="categoryOption.value"
                      :value="categoryOption.value"
                    >
                      {{ categoryOption.label }}
                    </option>
                  </select>
                </Field>
                <ErrorMessage name="category" as="div" class="invalid-feedback d-block" />
              </div>

              <div v-if="values.category === 'facturacion'" class="mb-3">
                <label class="form-label" for="invoiceNumber">Número de factura</label>
                <Field name="invoiceNumber" v-slot="{ field }">
                  <input
                    id="invoiceNumber"
                    v-bind="field"
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': errors.invoiceNumber }"
                    placeholder="A1B2C3"
                  />
                </Field>
                <ErrorMessage name="invoiceNumber" as="div" class="invalid-feedback d-block" />
              </div>

              <div v-if="values.category === 'error-tecnico'" class="mb-3">
                <label class="form-label" for="softwareVersion">Versión del programa</label>
                <Field name="softwareVersion" v-slot="{ field }">
                  <input
                    id="softwareVersion"
                    v-bind="field"
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': errors.softwareVersion }"
                    placeholder="2"
                  />
                </Field>
                <ErrorMessage name="softwareVersion" as="div" class="invalid-feedback d-block" />
              </div>

              <div class="mb-4">
                <label class="form-label" for="description">Descripción detallada</label>
                <Field name="description" v-slot="{ field }">
                  <textarea
                    id="description"
                    v-bind="field"
                    rows="4"
                    class="form-control"
                    :class="{ 'is-invalid': errors.description }"
                    placeholder="Describe el problema con detalle..."
                  />
                </Field>
                <ErrorMessage name="description" as="div" class="invalid-feedback d-block" />
              </div>

              <button type="submit" class="btn btn-primary w-100" :disabled="!canSubmit">
                Crear incidencia
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
