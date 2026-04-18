<script setup lang="ts">
import { ErrorMessage, Field, FieldArray, useForm } from "vee-validate";
import type { GenericObject, SubmissionHandler } from "vee-validate";
import type { MetodoPago } from "../models/metodo-pago";
import type { PedidoForm } from "../models/pedido-form";
import * as yup from "yup";

const schema = yup.object({
  nombreCompleto: yup
    .string()
    .required("El nombre completo es obligatorio.")
    .min(3, "El nombre debe tener al menos 3 caracteres.")
    .max(100, "El nombre no puede superar los 100 caracteres."),
  correo: yup
    .string()
    .required("El correo electrónico es obligatorio.")
    .email("Introduce un correo electrónico válido."),
  metodoPago: yup
    .mixed<MetodoPago>()
    .oneOf(["Tarjeta", "Transferencia", "Bizum"], "Selecciona un método de pago válido.")
    .required("El método de pago es obligatorio."),
  productos: yup
    .array()
    .of(
      yup.object({
        nombreProducto: yup
          .string()
          .required("El nombre del producto es obligatorio.")
          .min(3, "El nombre del producto debe tener al menos 3 caracteres.")
          .max(100, "El nombre del producto no puede superar los 100 caracteres."),
        cantidad: yup
          .number()
          .typeError("La cantidad debe ser un valor numérico.")
          .required("La cantidad es obligatoria.")
          .moreThan(0, "La cantidad debe ser mayor que 0."),
        precio: yup
          .number()
          .typeError("El precio debe ser un valor numérico.")
          .required("El precio es obligatorio.")
          .moreThan(0, "El precio debe ser mayor que 0."),
      }),
    )
    .min(1, "Debe existir al menos una línea de producto."),
});

const initialValues: PedidoForm = {
  nombreCompleto: "",
  correo: "",
  metodoPago: "",
  productos: [{ nombreProducto: "", cantidad: "", precio: "" }],
};

const { handleSubmit, meta, isSubmitting } = useForm({
  validationSchema: schema,
  initialValues,
});

const toNumber = (value: number | string): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const roundMoney = (value: number): number => Number(value.toFixed(2));

const onSubmit: SubmissionHandler<GenericObject> = (values): void => {
  const pedido = values as PedidoForm;

  const productosConTotal = pedido.productos.map((producto) => {
    const totalProducto = roundMoney(toNumber(producto.cantidad) * toNumber(producto.precio));

    return {
      ...producto,
      cantidad: toNumber(producto.cantidad),
      precio: toNumber(producto.precio),
      totalProducto,
    };
  });

  const totalPedido = roundMoney(
    productosConTotal.reduce((acumulado, producto) => acumulado + producto.totalProducto, 0),
  );

  console.log("Pedido enviado:", {
    ...pedido,
    productos: productosConTotal,
    totalPedido,
  });
};

const submitForm = handleSubmit(onSubmit);
</script>

<template>
  <main class="bg-body-tertiary min-vh-100 py-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-lg-10 col-xl-9">
          <h1 class="h3 mb-4">Gestión de pedidos</h1>
          <div class="card shadow-sm border-0">
            <div class="card-body p-4 p-md-5">
              <form @submit="submitForm">
                <section class="mb-4">
                  <h2 class="h5 mb-3">Datos del cliente</h2>
                  <div class="row g-3">
                    <div class="col-12">
                      <label for="nombreCompleto" class="form-label">Nombre completo</label>
                      <Field
                        id="nombreCompleto"
                        name="nombreCompleto"
                        type="text"
                        class="form-control"
                        placeholder="Nombre completo del cliente"
                      />
                      <ErrorMessage name="nombreCompleto" class="text-danger small mt-1 d-block" />
                    </div>

                    <div class="col-12 col-md-6">
                      <label for="correo" class="form-label">Correo electrónico</label>
                      <Field
                        id="correo"
                        name="correo"
                        type="email"
                        class="form-control"
                        placeholder="correo@ejemplo.es"
                      />
                      <ErrorMessage name="correo" class="text-danger small mt-1 d-block" />
                    </div>

                    <div class="col-12 col-md-6">
                      <label for="metodoPago" class="form-label">Método de pago</label>
                      <Field id="metodoPago" name="metodoPago" as="select" class="form-select">
                        <option value="">Selecciona una opción</option>
                        <option value="Tarjeta">Tarjeta</option>
                        <option value="Transferencia">Transferencia</option>
                        <option value="Bizum">Bizum</option>
                      </Field>
                      <ErrorMessage name="metodoPago" class="text-danger small mt-1 d-block" />
                    </div>
                  </div>
                </section>

                <FieldArray name="productos" v-slot="{ fields, push, remove }">
                  <section class="mb-4">
                    <div class="card bg-light border-0">
                      <div class="card-body p-3">
                        <h2 class="h5 mb-2">Líneas de productos</h2>
                        <button
                          type="button"
                          class="btn btn-outline-primary btn-sm mb-3"
                          @click="push({ nombreProducto: '', cantidad: '', precio: '' })"
                        >
                          Añadir producto
                        </button>

                        <div
                          v-for="(field, index) in fields"
                          :key="field.key"
                          class="border rounded-3 p-3 mb-3 bg-body"
                        >
                          <div class="row g-3 align-items-start">
                            <div class="col-12 col-md-5">
                              <label :for="`nombre-producto-${index}`" class="form-label">
                                Nombre del producto
                              </label>
                              <Field
                                :id="`nombre-producto-${index}`"
                                :name="`productos[${index}].nombreProducto`"
                                type="text"
                                class="form-control"
                                placeholder="Nombre del producto"
                              />
                              <ErrorMessage
                                :name="`productos[${index}].nombreProducto`"
                                class="text-danger small mt-1 d-block"
                              />
                            </div>

                            <div class="col-6 col-md-2">
                              <label :for="`cantidad-${index}`" class="form-label">Cantidad</label>
                              <Field
                                :id="`cantidad-${index}`"
                                :name="`productos[${index}].cantidad`"
                                type="number"
                                min="0"
                                step="1"
                                class="form-control"
                              />
                              <ErrorMessage
                                :name="`productos[${index}].cantidad`"
                                class="text-danger small mt-1 d-block"
                              />
                            </div>

                            <div class="col-6 col-md-3">
                              <label :for="`precio-${index}`" class="form-label">Precio (€)</label>
                              <Field
                                :id="`precio-${index}`"
                                :name="`productos[${index}].precio`"
                                type="number"
                                min="0"
                                step="0.01"
                                class="form-control"
                              />
                              <ErrorMessage
                                :name="`productos[${index}].precio`"
                                class="text-danger small mt-1 d-block"
                              />
                            </div>

                            <div class="col-12 col-md-2 d-grid">
                              <div class="form-label d-none d-md-block" aria-hidden="true">
                                &nbsp;
                              </div>
                              <button
                                type="button"
                                class="btn btn-outline-danger"
                                :disabled="fields.length === 1"
                                @click="remove(index)"
                              >
                                Eliminar
                              </button>
                            </div>
                          </div>
                        </div>

                        <ErrorMessage name="productos" class="text-danger small d-block" />
                      </div>
                    </div>
                  </section>
                </FieldArray>

                <div class="d-grid d-md-flex justify-content-md-end">
                  <button
                    type="submit"
                    class="btn btn-primary px-4"
                    :disabled="!meta.valid || isSubmitting"
                  >
                    Enviar pedido
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
