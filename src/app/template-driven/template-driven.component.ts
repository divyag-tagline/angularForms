import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
interface data {
  name:'',
  email:'',
  age:0
}
@Component({
  selector: 'app-template-driven',
  templateUrl: './template-driven.component.html',
  styleUrls: ['./template-driven.component.scss']
})
export class TemplateDrivenComponent implements OnInit {
  data !:data;
  form:[]=[]
  name !: string;
  email !: string;
  age !: number;
  preference !: string;
  preferences: string[] = ['Cooking', 'Reading', 'Coding'];
  constructor() { }
  genders = ['male', 'female'];
  
  userData = {
    username: '',
    email: '',
    country: '',
    gender: ''
  };
  submitted = false;
  ngOnInit(): void {

  }
  // handleSubmit(): void{
  //     console.log(this.name);
  // }
  onSubmit(form :NgForm,formData : any) {
    console.log('submitted formdata',formData);  
    
    alert('Form submitted successfully');
    
    form.reset();
  }
}
