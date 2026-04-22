export interface AlertProps {
  message: string;
  type?: "success" | "warning" | "error";
  duration?: number;
}
