import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-quotes',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="quotes-container">
      <div class="header">
        <div>
          <h1>Presupuestos</h1>
          <p>Gestión de cotizaciones y presupuestos</p>
        </div>
        <button class="create-btn" routerLink="/quotes/create">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Crear Presupuesto
        </button>
      </div>
      
      <div class="coming-soon">
        <h2>Lista de Presupuestos</h2>
        <p>Aquí aparecerán todos los presupuestos creados</p>
        <p class="subtitle">Por ahora puedes crear un nuevo presupuesto usando el botón de arriba</p>
      </div>
    </div>
  `,
  styles: [`
    .quotes-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }
    
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 2rem;
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
    }
    
    .create-btn {
      background: #667eea;
      color: white;
      border: none;
      border-radius: 8px;
      padding: 0.75rem 1.5rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      text-decoration: none;
      
      &:hover {
        background: #5a67d8;
        transform: translateY(-1px);
      }
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
    
    @media (max-width: 768px) {
      .header {
        flex-direction: column;
        gap: 1rem;
        align-items: stretch;
      }
      
      .create-btn {
        justify-content: center;
      }
    }
  `]
})
export class QuotesComponent {
} 