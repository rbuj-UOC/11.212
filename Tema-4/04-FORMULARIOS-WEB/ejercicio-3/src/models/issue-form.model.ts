export type CategoryValue = "error-tecnico" | "consulta" | "facturacion" | "";

export interface IncidentFormValues {
  subject: string;
  replyEmail: string;
  category: CategoryValue;
  invoiceNumber: string;
  softwareVersion: string;
  description: string;
}
