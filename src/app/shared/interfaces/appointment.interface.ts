export interface Appointment {
  id: string;
  customerName: string;
  vehicleInfo: {
    model: string;
    plate: string;
    year: number;
  };
  serviceType: 'MANTENCION' | 'CAMBIO_BATERIA' | 'CAMBIO_ACEITE' | 'REPARACION';
  status: 'INGRESADO' | 'CONFIRMADO' | 'NO_INGRESADO' | 'REAGENDADO';
  date: Date;
  time: string;
  description: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  estimatedDuration: number; // in hours
}

export interface Quote {
  id: string;
  appointmentId?: string;
  customerName: string;
  vehicleInfo: {
    model: string;
    plate: string;
  };
  items: QuoteItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'DRAFT' | 'SENT' | 'APPROVED' | 'REJECTED';
  createdDate: Date;
  validUntil: Date;
  notes?: string;
}

export interface QuoteItem {
  id: string;
  type: 'PRODUCT' | 'SERVICE';
  sku?: string;
  name: string;
  description: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  total: number;
}

export interface Product {
  sku: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  brand: string;
} 