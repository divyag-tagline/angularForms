import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
interface Data {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  mobileNo: string;
  gender: string;
}
@Component({
  selector: 'app-template-driven',
  templateUrl: './template-driven.component.html',
  styleUrls: ['./template-driven.component.scss'],
})
export class TemplateDrivenComponent implements OnInit {
  @ViewChild('formdemo') formdemo!: NgForm;
  // data !: data;
  details: Data[] = [
    {
      id: 1,
      firstName: 'Divya',
      lastName: 'Gabani',
      email: 'divyagabani@gmail.com',
      mobileNo: '7890123654',
      gender: 'female',
    },
    {
      id: 2,
      firstName: 'Grishama',
      lastName: 'Borda',
      email: 'grishma@gmail.com',
      mobileNo: '9874012365',
      gender: 'female',
    },
  ];

  genders = ['male', 'female'];

  userData: Data = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    mobileNo: '',
    gender: '',
  };
  constructor() {}

  submitted = false;
  ngOnInit(): void {}
  // handleSubmit(): void{
  //     console.log(this.name);
  // }
  blockCharacter(e: any) {
    // console.log("block character",value);
    var x = e.which || e.keycode;
    if (x >= 42 && x <= 57) return true;
    else return false;
  }

  onSubmit() {
    if (this.formdemo.form.invalid) {
      return;
    }
    const data = {
      id: this.details.length + 1,
      ...this.formdemo.form.value,
    };
    this.details.push(data);
    this.formdemo.reset();
  }
}
