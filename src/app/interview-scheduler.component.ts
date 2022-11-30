import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-interview-scheduler',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './interview-scheduler.component.html',
  styles: [`
    .left, .right { width: 49%; display: Inline-block; vertical-align: top; }
    input { border-radius: 7px; }
    .width107 { width: 107px; }
  `]
})
export class InterviewSchedulerComponent implements OnInit {

  studentStr!: string;
  startTime: string = "15:00";
  startHours: number = 0;
  startMinutes: number = 0;
  minutes: number = 60;
  studentsA: string[] = [];
  studentsB: string[] = [];
  sessionTimes: string[] = [];
  sessions!: any[];
  roomA: string = "Classroom A";
  roomB: string = "Media room";

  constructor() { }

  genSessionTimes(): void {
    let mins = this.startHours * 60 + this.startMinutes;
    let countStudents = this.studentsA.length;
    let sessionLength = Math.floor(this.minutes / countStudents);
    for(let idx = 0; idx < countStudents; idx++) {
      let min = mins + (idx * sessionLength);
      let hh = Math.floor(min / 60);
      let mm = min - (hh * 60);
      let ampm = "AM";
      if(hh > 12) {
        hh -= 12;
        ampm = "PM";
      }
      let hm = mm > 9 ? `${hh}:${mm} ${ampm}` : `${hh}:0${mm} ${ampm}`;
      
      this.sessionTimes.push(hm);
    }
    console.debug("Session times:", this.sessionTimes);
  }

  parseStartTime(): void {
    let hhmm = this.startTime.split(":");
    this.startHours = +hhmm[0];
    this.startMinutes = +hhmm[1];
  }

  parseStudentNames() {
    let arr = this.studentStr.split(",");
    for(let s of arr) {
      this.studentsA.push(s.trim());
      this.studentsB.push(s.trim());
    }
    // rotate studentsB two places
    for(let i = 0; i < 2; i++) {
      let student = this.studentsB.shift();
      this.studentsB.push(student!);
    }
    console.debug("Students:", this.studentsA, this.studentsB);
  }

  clear(): void {
    this.studentsA = [];
    this.studentsB = [];
    this.sessionTimes = []
  }

  render(): void {
    this.sessions = [];
    for(let idx = 0; idx < this.studentsA.length; idx++) {
      let session = { 
        time: this.sessionTimes[idx],
        studentA: this.studentsA[idx],
        studentB: this.studentsB[idx]
      }
      this.sessions.push(session);
    }
  }
  
  generate(): void {
    this.clear();
    this.parseStudentNames();
    this.parseStartTime();
    this.genSessionTimes();
    this.render();
    console.debug(this.sessions);
  }

  ngOnInit(): void {
  }

}
