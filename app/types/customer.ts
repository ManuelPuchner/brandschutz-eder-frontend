export interface Customer {
  id: number;
  address: string;
  city: string;
  postalcode: string;
  country: string;

  name: string;
  phone: string;

  lat: number;
  lon: number;
}

export type CustomerCreate = Omit<Customer, "id" | "lat" | "lon">;
