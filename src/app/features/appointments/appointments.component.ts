import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="appointments-container">
      <h1>Agendamientos</h1>
      <p>Gestión de citas y agendamientos de servicios automotrices</p>
      <div class="coming-soon">
        <h2>Lista de Agendamientos</h2>
        <p>Aquí aparecerán todos los agendamientos creados</p> 
      </div>
    </div>
  `,
  styles: [`
    .appointments-container {
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
    }
  `]
})
export class AppointmentsComponent {
} 