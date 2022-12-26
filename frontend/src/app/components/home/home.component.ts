import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import esLocale from '@fullcalendar/core/locales/es';
import { range } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ReservasAdminService } from 'src/app/services/reservas-admin.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  

  //------------------ Para pintar Fechas ------------------------------------//
  dependencia = {
    _id: '',
    id_unidad: '',
    nombre_unidad: '',
    id_tipo_unidad: '',
    tipo_unidad: ''
  }
  dependencias = [this.dependencia]
  reservas = [{
    _id: '',
    fini: '',
    fend: '',
    namevent: '',
    user: {
      name: '',
      ced: '',
      roles: [],
      dependencia: [this.dependencia],
      email: '',
      telefono: ''
    },
    sitio: '',
    state: '',
    anexo: '',
    createdAt: new Date
  }]
  reservaux = [{
    _id: '',
    fini: '',
    fend: '',
    namevent: '',
    user: {
      name: '',
      ced: '',
      roles: [],
      dependencia: [this.dependencia],
      email: '',
      telefono: ''
    },
    sitio: '',
    state: '',
    anexo: '',
    createdAt: new Date
  }]

  lista: any;

  constructor(private reseserver: ReservasAdminService,
    private authService: AuthService) { }

  ngOnInit(): void {

    this.reseserver.getReservas()
      .subscribe(
        res => {
          this.reservas = res;
          this.reservas.sort((a, b) => {
            return Date.parse(a.createdAt.valueOf().toString()) - Date.parse(b.createdAt.valueOf().toString())
          })
          this.reservaux = this.reservas
          
          this.lista = this.reservaux.map(function (task) {
            return{
              space: task.sitio,
              fini: task.fini,
              fend: task.fend
            }
          })

          console.log(this.lista)

        }
      )
    this.authService.getDependencias().subscribe(
      res => {

        for (let i of Object.values(res)) {
          this.dependencias.push(i);
        }
        // console.log(this.dependencias);

      },
      err => console.log(err)
    );



  }


  //--------------------------------------------------------------------------//

  //---------------------------------------- Calendario ---------------------------------------------//

  eventos = [{ title: 'RESERVADO', start: '2022-12-26 07:00:00', end: '2022-12-26 09:00:00', color: '#C21010' },
  { title: 'RES', start: '2022-12-26 07:00:00', end: '2022-12-26 09:00:00', color: '#C21010' }];

  calendarOptions: CalendarOptions = {
    // locale: esLocale,
    allDaySlot: false,

    slotDuration: '01:00',

    headerToolbar: {
      left: 'timeGridWeek,timeGridDay',
      center: 'title',
      right: 'prev,next today'
    },

    titleFormat: { // will produce something like "Tuesday, September 18, 2018"
      month: 'short',
      year: 'numeric',
      day: 'numeric',
    },

    height: 'auto',

    slotMinTime: '7:00:00',
    slotMaxTime: '20:00:00',

    initialView: 'timeGridWeek', // bind is important!

    events: this.eventos,

    slotLabelFormat: {

      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      meridiem: 'lowercase'
    },

    // eventTimeFormat: { // like '14:30:00'
    //   hour: 'numeric', 
    //   minute: '2-digit',
    // }

    hiddenDays: [0]

  };


}
