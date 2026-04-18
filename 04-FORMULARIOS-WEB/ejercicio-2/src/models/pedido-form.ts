import type { LineaProducto } from "./linea-producto";
import type { MetodoPago } from "./metodo-pago";

export interface PedidoForm {
  nombreCompleto: string;
  correo: string;
  metodoPago: MetodoPago | "";
  productos: LineaProducto[];
}
