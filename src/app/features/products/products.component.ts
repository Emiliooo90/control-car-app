import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="products-container">
      <h1>Productos</h1>
      <p>Catálogo de productos y servicios disponibles</p>
      <div class="coming-soon">
        <h2>Catálogo de Productos</h2>
        <p>Aquí se mostrará el inventario completo de productos</p>
        <p class="subtitle">Incluirá repuestos, lubricantes, baterías y más</p>
      </div>
    </div>
  `,
  styles: [`
    .products-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }
    
    h1 {
      font-size: 2.5rem;
      font-weight: 700;
      color: #1f2937;
      margin-bottom: 0.5rem;
    }
    
    p {
      color: #6b7280;
      font-size: 1.1rem;
      margin-bottom: 2rem;
    }
    
    .coming-soon {
      background: white;
      border-radius: 16px;
      padding: 4rem;
      text-align: center;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      
      h2 {
        color: #667eea;
        margin-bottom: 1rem;
      }
      
      .subtitle {
        color: #9ca3af;
        font-size: 0.875rem;
        margin-top: 1rem;
      }
    }
  `]
})
export class ProductsComponent {
} 