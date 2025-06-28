import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Appointment } from '../../shared/interfaces/appointment.interface';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  currentDate = new Date();
  currentMonth = this.currentDate.getMonth();
  currentYear = this.currentDate.getFullYear();
  
  monthNames = [
    'ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO',
    'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'
  ];
  
  dayNames = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes'];
  
  selectedDate: Date | null = null;
  calendarDays: any[] = [];
  selectedChat: Appointment | null = null;
  showQuickActionsDropdown: boolean = false;
  
  mockAppointments: Appointment[] = [
    {
      id: '1',
      customerName: 'Juan Pérez',
      vehicleInfo: { model: 'Toyota Corolla', plate: 'LPTRR4', year: 2020 },
      serviceType: 'MANTENCION',
      status: 'CONFIRMADO',
      date: new Date(2024, 5, 25), // June 25
      time: '14:00',
      description: 'Mantención programada 20.000 km',
      priority: 'MEDIUM',
      estimatedDuration: 2
    },
    {
      id: '2',
      customerName: 'María González',
      vehicleInfo: { model: 'Honda Civic', plate: 'TPPR52', year: 2019 },
      serviceType: 'CAMBIO_BATERIA',
      status: 'INGRESADO',
      date: new Date(2024, 5, 26),
      time: '10:00',
      description: 'Cambio de batería',
      priority: 'HIGH',
      estimatedDuration: 1
    },
    {
      id: '3',
      customerName: 'Carlos Rodríguez',
      vehicleInfo: { model: 'Ford Focus', plate: 'TTRF54', year: 2021 },
      serviceType: 'CAMBIO_ACEITE',
      status: 'REAGENDADO',
      date: new Date(2024, 5, 28),
      time: '16:00',
      description: 'Cambio de aceite y filtros',
      priority: 'LOW',
      estimatedDuration: 1
    },
    {
      id: '4',
      customerName: 'Ana Silva',
      vehicleInfo: { model: 'Nissan Sentra', plate: 'TRYY54', year: 2018 },
      serviceType: 'CAMBIO_BATERIA',
      status: 'CONFIRMADO',
      date: new Date(2024, 5, 29),
      time: '09:00',
      description: 'Cambio de batería',
      priority: 'MEDIUM',
      estimatedDuration: 1
    },
    {
      id: '5',
      customerName: 'Diego Martínez',
      vehicleInfo: { model: 'Chevrolet Spark', plate: 'VS5185', year: 2022 },
      serviceType: 'CAMBIO_BATERIA',
      status: 'INGRESADO',
      date: new Date(2024, 5, 24),
      time: '11:30',
      description: 'Reemplazo de batería',
      priority: 'HIGH',
      estimatedDuration: 1
    },
    {
      id: '6',
      customerName: 'Sofia López',
      vehicleInfo: { model: 'Mazda 3', plate: 'JFTR30', year: 2017 },
      serviceType: 'REPARACION',
      status: 'REAGENDADO',
      date: new Date(2024, 4, 5),
      time: '15:00',
      description: 'Reparación de sistema eléctrico',
      priority: 'HIGH',
      estimatedDuration: 3
    }
  ];

  recentAppointments: Appointment[] = [];
  todayAppointments: Appointment[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.generateCalendar();
    this.loadRecentAppointments();
    this.loadTodayAppointments();
  }

  generateCalendar() {
    const firstDay = new Date(this.currentYear, this.currentMonth, 1);
    const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
    const startDate = new Date(firstDay);
    
    // Adjust to start on Monday
    const dayOfWeek = (firstDay.getDay() + 6) % 7;
    startDate.setDate(firstDay.getDate() - dayOfWeek);

    this.calendarDays = [];
    for (let i = 0; i < 35; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      
      const appointments = this.getAppointmentsForDate(date);
      
      this.calendarDays.push({
        date: date,
        isCurrentMonth: date.getMonth() === this.currentMonth,
        isToday: this.isToday(date),
        isSelected: this.selectedDate && this.isSameDay(date, this.selectedDate),
        appointments: appointments,
        hasAppointments: appointments.length > 0
      });
    }
  }

  getAppointmentsForDate(date: Date): Appointment[] {
    return this.mockAppointments.filter(apt => 
      this.isSameDay(apt.date, date)
    );
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return this.isSameDay(date, today);
  }

  isSameDay(date1: Date, date2: Date): boolean {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  }

  onDateClick(day: any) {
    this.selectedDate = day.date;
    this.generateCalendar();
  }

  previousMonth() {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.generateCalendar();
  }

  nextMonth() {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.generateCalendar();
  }

  loadRecentAppointments() {
    this.recentAppointments = this.mockAppointments
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, 5);
  }

  loadTodayAppointments() {
    const today = new Date();
    this.todayAppointments = this.mockAppointments.filter(apt => 
      this.isToday(apt.date)
    );
  }

  getStatusColor(status: string): string {
    const colors = {
      'INGRESADO': '#22c55e',
      'CONFIRMADO': '#3b82f6', 
      'NO_INGRESADO': '#ef4444',
      'REAGENDADO': '#f59e0b'
    };
    return colors[status as keyof typeof colors] || '#6b7280';
  }

  getServiceTypeLabel(serviceType: string): string {
    const labels = {
      'MANTENCION': 'Mantención',
      'CAMBIO_BATERIA': 'Cambio de Batería',
      'CAMBIO_ACEITE': 'Cambio de Aceite',
      'REPARACION': 'Reparación'
    };
    return labels[serviceType as keyof typeof labels] || serviceType;
  }

  openChat(appointment: Appointment) {
    this.selectedChat = appointment;
  }

  closeChat() {
    this.selectedChat = null;
  }

  toggleQuickActionsDropdown() {
    this.showQuickActionsDropdown = !this.showQuickActionsDropdown;
  }

  closeQuickActionsDropdown() {
    this.showQuickActionsDropdown = false;
  }

  getCustomerAvatar(customerName: string): string {
    // Generate a deterministic color based on customer name
    const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#43e97b', '#38f9d7', '#ffecd2', '#fcb69f'];
    const index = customerName.charCodeAt(0) % colors.length;
    return colors[index];
  }

  getLastMessage(appointment: Appointment): string {
    const messages = {
      'MANTENCION': 'Estimado/a cliente, hemos recibido su vehículo de forma exitosa.',
      'CAMBIO_BATERIA': 'D S ha completado el cambio de batería',
      'CAMBIO_ACEITE': 'D S ha completado Cambio de Aceite',
      'REPARACION': 'Te has unido al chat'
    };
    return messages[appointment.serviceType as keyof typeof messages] || 'Nuevo mensaje';
  }

  formatMessageTime(date: Date): string {
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays < 7) {
      return date.toLocaleDateString('es-ES', { weekday: 'short' });
    } else {
      return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: '2-digit' });
    }
  }

  getWorkOrderNumber(appointment: Appointment): string {
    return `#${appointment.id.padStart(2, '0')}`;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    const dropdownContainer = target.closest('.attach-menu-container');
    
    if (!dropdownContainer && this.showQuickActionsDropdown) {
      this.showQuickActionsDropdown = false;
    }
  }

  createQuoteFromChat() {
    if (this.selectedChat) {
      // Navigate to quotes/create with customer and vehicle information
      this.router.navigate(['/quotes/create'], {
        queryParams: {
          customerName: this.selectedChat.customerName,
          vehicleModel: this.selectedChat.vehicleInfo.model,
          vehiclePlate: this.selectedChat.vehicleInfo.plate,
          vehicleYear: this.selectedChat.vehicleInfo.year,
          serviceType: this.selectedChat.serviceType,
          appointmentId: this.selectedChat.id
        }
      });
    }
  }
} 