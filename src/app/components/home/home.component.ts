import { Component, OnInit } from '@angular/core';

export interface Forms {
  name: string;
  creator: string;
  date: Date;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  unfilledForms: Forms[] = [
    {
      name: 'Survey 1',
      creator: 'anon',
      date: new Date('1/1/16'),
    },
    {
      name: 'Survey 2',
      creator: 'anon',
      date: new Date('1/17/16'),
    }
  ];

  filledForms: Forms[] = [];

  openForm() {

  }

}
