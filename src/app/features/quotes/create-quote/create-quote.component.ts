import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { Quote, QuoteItem, Product } from '../../../shared/interfaces/appointment.interface';

@Component({
  selector: 'app-create-quote',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './create-quote.component.html',
  styleUrl: './create-quote.component.scss'
})
export class CreateQuoteComponent implements OnInit {
  quote: Partial<Quote> = {
    customerName: '',
    vehicleInfo: { model: '', plate: '' },
    items: [],
    subtotal: 0,
    tax: 0,
    total: 0,
    status: 'DRAFT',
    createdDate: new Date(),
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    notes: ''
  };

  showProductBrowser = false;
  selectedProducts: Product[] = [];
  searchTerm = '';
  currentPage = 1;
  itemsPerPage = 10;

  mockProducts: Product[] = [
    { sku: 'ACEIT530', name: 'Lubricante', description: 'Aceite 5w30', price: 21000, stock: 15, category: 'Lubricantes', brand: 'Genérico' },
    { sku: 'GOLI001', name: 'Golilla', description: 'Golilla tampón carter', price: 8000, stock: 25, category: 'Repuestos', brand: 'Genérico' },
    { sku: 'FILTRO001', name: 'Filtro aceite', description: 'Filtro de aceite 5w', price: 21000, stock: 10, category: 'Filtros', brand: 'Genérico' },
    { sku: 'BAT', name: 'BATERIA ISTOP', description: 'BATERIA CON ISTOP', price: 61000, stock: 5, category: 'Baterías', brand: 'Genérico' },
    { sku: 'PLU0001', name: 'Plumillas', description: 'Plumillas Hankook', price: 2300, stock: 30, category: 'Accesorios', brand: 'Genérico' },
    { sku: 'AMPOH11', name: 'AMPOLLETA H11', description: 'AMPOLLETA H11', price: 9900, stock: 20, category: 'Iluminación', brand: 'Genérico' }
  ];

  filteredProducts: Product[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.filteredProducts = this.mockProducts;
    
    // Read query parameters and pre-populate the form
    this.route.queryParams.subscribe(params => {
      if (params['customerName']) {
        this.quote.customerName = params['customerName'];
      }
      
      if (params['vehicleModel'] || params['vehiclePlate']) {
        this.quote.vehicleInfo = {
          model: params['vehicleModel'] || '',
          plate: params['vehiclePlate'] || ''
        };
      }
      
      // Build notes with available information
      let noteParts: string[] = [];
      
      if (params['serviceType']) {
        const serviceTypeLabels: { [key: string]: string } = {
          'MANTENCION': 'Mantención',
          'CAMBIO_BATERIA': 'Cambio de Batería',
          'CAMBIO_ACEITE': 'Cambio de Aceite',
          'REPARACION': 'Reparación'
        };
        
        const serviceLabel = serviceTypeLabels[params['serviceType']] || params['serviceType'];
        noteParts.push(`Presupuesto generado desde cita de: ${serviceLabel}`);
        
        if (params['appointmentId']) {
          noteParts.push(`Cita #${params['appointmentId']}`);
        }
      }
      
      if (params['vehicleYear']) {
        noteParts.push(`Año del vehículo: ${params['vehicleYear']}`);
      }
      
      if (noteParts.length > 0) {
        this.quote.notes = noteParts.join(' | ');
      }
    });
  }

  searchProducts() {
    if (!this.searchTerm.trim()) {
      this.filteredProducts = this.mockProducts;
    } else {
      this.filteredProducts = this.mockProducts.filter(product =>
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    this.currentPage = 1;
  }

  get paginatedProducts(): Product[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredProducts.slice(start, start + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
  }

  openProductBrowser() {
    this.showProductBrowser = true;
    this.searchTerm = '';
    this.filteredProducts = this.mockProducts;
  }

  closeProductBrowser() {
    this.showProductBrowser = false;
    this.selectedProducts = [];
  }

  toggleProductSelection(product: Product) {
    const index = this.selectedProducts.findIndex(p => p.sku === product.sku);
    if (index > -1) {
      this.selectedProducts.splice(index, 1);
    } else {
      this.selectedProducts.push(product);
    }
  }

  isProductSelected(product: Product): boolean {
    return this.selectedProducts.some(p => p.sku === product.sku);
  }

  addSelectedProducts() {
    this.selectedProducts.forEach(product => {
      const existingItem = this.quote.items?.find(item => item.sku === product.sku);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        const newItem: QuoteItem = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          type: 'PRODUCT',
          sku: product.sku,
          name: product.name,
          description: product.description,
          quantity: 1,
          unitPrice: product.price,
          discount: 0,
          total: product.price
        };
        this.quote.items?.push(newItem);
      }
    });

    this.calculateTotals();
    this.closeProductBrowser();
  }

  removeItem(index: number) {
    this.quote.items?.splice(index, 1);
    this.calculateTotals();
  }

  updateItemQuantity(item: QuoteItem) {
    if (item.quantity <= 0) {
      item.quantity = 1;
    }
    this.updateItemTotal(item);
  }

  updateItemTotal(item: QuoteItem) {
    const subtotal = item.quantity * item.unitPrice;
    const discountAmount = (subtotal * item.discount) / 100;
    item.total = subtotal - discountAmount;
    this.calculateTotals();
  }

  calculateTotals() {
    if (!this.quote.items) return;
    
    this.quote.subtotal = this.quote.items.reduce((sum, item) => sum + item.total, 0);
    this.quote.tax = this.quote.subtotal * 0.19; // 19% IVA
    this.quote.total = this.quote.subtotal + this.quote.tax;
  }

  addCustomItem() {
    const customItem: QuoteItem = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      type: 'SERVICE',
      name: 'Servicio personalizado',
      description: 'Descripción del servicio',
      quantity: 1,
      unitPrice: 0,
      discount: 0,
      total: 0
    };
    
    this.quote.items?.push(customItem);
  }

  saveQuote() {
    this.quote.id = Date.now().toString();
    console.log('Quote saved:', this.quote);
    // Here you would typically save to a service
    alert('Presupuesto guardado exitosamente');
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(amount);
  }
} 