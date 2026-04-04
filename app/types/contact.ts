export type ContactRequest = {
  id: number;
  name: string;
  email: string;
  phone: string;
  company?: string;
  message: string;
  status: "NEW" | "READ" | "ARCHIVED";
  createdAt?: string;
};
