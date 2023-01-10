import { Component, OnInit, ViewChild } from '@angular/core';
import { flush } from '@angular/core/testing';
import { NgForm } from '@angular/forms';
import { VirtualTimeScheduler } from 'rxjs';
interface Data {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  mobileNo: string;
  gender: string;
  country:string;
  state:string;
  city:string;

}
@Component({
  selector: 'app-template-driven',
  templateUrl: './template-driven.component.html',
  styleUrls: ['./template-driven.component.scss'],
})
export class TemplateDrivenComponent implements OnInit {
  @ViewChild('formdemo') formdemo!: NgForm;
  toggle: boolean = false;
  events!: string;
  dataId!: number;
  details: Data[] = [
    {
      id: 1,
      firstName: 'Divya',
      lastName: 'Gabani',
      email: 'divyagabani@gmail.com',
      mobileNo: '7890123654',
      gender: 'female',
      country:'India',
      state:'Gujarat',
      city:'Surat'
    },
    {
      id: 2,
      firstName: 'Grishama',
      lastName: 'Borda',
      email: 'grishma@gmail.com',
      mobileNo: '9874012365',
      gender: 'female',
      country:'Canada',
      state:'Kerala',
      city:'Ahmedabad'
    },
  ];

  genders = ['male', 'female'];
  country = ['India','Canada'];
  state = ['Gujarat','Kerala'];
  city = ['Surat','Ahmedabad'];
  submitted: boolean = false;
  userData: Data = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    mobileNo: '',
    gender: '',
    country:'',
    state:'',
    city:''
  };
  editData!: Data;
  editId!: number;
  constructor() {}
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
    // !this.toggle ? event.target.innerText = 'update' : event.target.innerText = 'submit'
    if (this.formdemo.form.invalid) {
      this.submitted = true;
      return;
    } else {
      if (this.editId) {
        let values = this.formdemo.form.value;
        console.log('user', this.editId);
        console.log('data');
            this.details[this.dataId] ={ 
              id:this.editId,
              ...this.formdemo.form.value};
            this.toggle = false;
            this.editId = 0;
            // items.firstName=  values.firstName,
            // items.lastName= values.lastName,
            // items.email= values.email,
            // items.mobileNo= values.mobileNo,
            // items.gender=values.gender
          
      } else {
        console.log('submit');

        const data = {
          id: this.details.length + 1,
          ...this.formdemo.form.value,
        };
        this.details.push(data);
      }
    }

    this.formdemo.reset();
    this.submitted = false;
  }
  handleDelete(deletedId: any, index: number) {
    console.log('id', deletedId);
    this.details.splice(index, 1);
    // console.log('detail', this.details);
  }
  handleEdit(data: Data, index: number) {
    console.log("data",data);
    this.formdemo.form.patchValue(data);
    this.submitted = false;
    this.editId = data.id;
    this.dataId = index;
    this.toggle = true;
    this.editData = data;
  }
}
