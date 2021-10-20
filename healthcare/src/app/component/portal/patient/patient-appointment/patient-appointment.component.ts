import { Component, OnInit, ViewChild } from '@angular/core';
import { FullCalendarComponent,CalendarOptions} from '@fullcalendar/angular';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {MatDialog} from '@angular/material/dialog';
import { ModalPopUpComponent } from './modal-pop-up/modal-pop-up.component';


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

  constructor(public dialog: MatDialog) {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: FoodNode) => !!node.children && node.children.length > 0;
  ngOnInit(): void {
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
      { title: 'event 1', date: '2021-10-20' },
      { title: 'event 2', date: '2021-10-21' }
    ]
  };
  // calendarOptions: CalendarOptions = {
  //   initialView: 'dayGridMonth',
  //   eventClick:function(arg){
  //   alert(arg.event.title)
  //   alert(arg.event.start)
  //   },
  //   events: [
  //   { title: 'event 1', date: '2021-10-20'},
  //   { title: 'event 1', date: '2021-10-21'},

  //   ]
  //   };

  handleDateClick(arg) {
    const dialogRef = this.dialog.open(ModalPopUpComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    }
  toggleWeekends() {
    this.calendarOptions.weekends = !this.calendarOptions.weekends // toggle the boolean!
  }
  openEvent(){
    const dialogRef = this.dialog.open(ModalPopUpComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

