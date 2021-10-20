import { Component, OnInit, ViewChild } from '@angular/core';
import { FullCalendarComponent,CalendarOptions} from '@fullcalendar/angular';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { AppointmentTable, Users } from 'src/model/tabletypes';
import { PatientAppointmentService } from 'src/app/services/patient-appointment.service';
import { CustomSnackBarService } from 'src/app/services/snackbar.service';
import { Appointments } from 'src/model/Appointment.model';
import { UserService } from 'src/app/services/user.service';

interface FoodNode {
  name: string;
  children?: FoodNode[];
}
const TREE_DATA: FoodNode[] = [
  {
    name: 'Physician',
    children: [
      {name: 'Obstetrician/Gynecologist'},
      {name: 'Cardiologist'},
      {name: 'Oncologist'},
      {name: 'Infectious Disease Physician'},
      {name: 'Gastroenterologist'},
    ]
  }
];
@Component({
  selector: 'app-patient-appointment',
  templateUrl: './patient-appointment.component.html',
  styleUrls: ['./patient-appointment.component.css']
})
export class PatientAppointmentComponent implements OnInit {
  treeControl = new NestedTreeControl<FoodNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<FoodNode>();
  schedule_appoinment= new Appointments();
  user: Users = new Users();
 

  constructor(private PatientAppointmentService:PatientAppointmentService,
    private _snackBar: CustomSnackBarService,
    private _userService: UserService) {
    this.dataSource.data = TREE_DATA;

  }

  hasChild = (_: number, node: FoodNode) => !!node.children && node.children.length > 0;
  ngOnInit(): void {

    console.log("asacha");
    this.user = this._userService.getUserDetails();
    this.PatientAppointmentService
      .getPatientAppoinmentList(this.user.id)
      .subscribe((response) => {
        console.log(response);
      
      })
    
      alert('button click');
  }


  onBookAppointment() {
    alert('button click');
    // let schedule_patientappoinment: AppointmentTable = new AppointmentTable();
  
    // //schedule_appoinment = this.demoForm.value;
    // this.PatientAppointmentService.createAppointment(schedule_patientappoinment)
    //     .subscribe((response) => {
    //       if(response){
    //         this._snackBar.openSnackBar('Data added successfully!');
    //       }
    //     })
  }

   // events: string[] = [];

  // addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
  //   this.events.push(`${type}: ${event.value}`);
  // }
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    // plugins: "calendarPlugins",
    weekends: true,
    dateClick: this.handleDateClick.bind(this), // bind is important!
    events: [
      { title: 'event 1', date: '2021-04-01' },
      { title: 'event 2', date: '2021-04-02' }
    ]
  };

  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr)
  }
  toggleWeekends() {
    this.calendarOptions.weekends = !this.calendarOptions.weekends // toggle the boolean!
  }
}

