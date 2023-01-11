import { Component, OnInit, ViewChild } from '@angular/core';
import { flush } from '@angular/core/testing';
import { NgForm } from '@angular/forms';
interface Data {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  mobileNo: string;
  hobbies?: any;
  hobbiesId?: any;
  gender: string;
  address: Address;
}

interface Address {
  country: string;
  state: string;
  city: string;
}
interface Hobbies {
  id?: number;
  label: string;
  isCheck?: boolean;
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
      hobbies: 'Drawing',
      // { id: 1, label: 'Drawing', isCheck: true },
      // { id: 2, label: 'Cooking', isCheck: true },

      gender: 'female',
      address: { country: 'India', state: 'Gujarat', city: 'Surat' },
    },
    {
      id: 2,
      firstName: 'Grishama',
      lastName: 'Borda',
      email: 'grishma@gmail.com',
      mobileNo: '9874012365',
      hobbies: 'Drawing,Cooking',
      // { id: 1, label: 'Drawing', isCheck: true }

      gender: 'female',
      address: { country: 'Canada', state: 'Kerala', city: 'Ahmedabad' },
    },
  ];
  selectedHobby: any;
  selectedHobbyId: any;
  genders = ['male', 'female'];
  // hobbies = [
  //   { id: 1, label: 'Drawing', selected: false },
  //   { id: 2, label: 'Cooking', selected: false },
  // ];
  hobbies: Hobbies[] = [
    { id: 1, label: 'Drawing', isCheck: false },
    { id: 2, label: 'Cooking', isCheck: false },
    { id: 3, label: 'Tracking', isCheck: false },
  ];
  // hobbies : string[] = ['Drawing','Cooking','Tracking']
  countries = ['India', 'Canada'];
  states = ['Gujarat', 'Kerala'];
  cities = ['Surat', 'Ahmedabad'];
  submitted: boolean = false;
  userData: Data = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    mobileNo: '',
    gender: '',
    hobbies: [],
    address: { country: '', state: '', city: '' },
  };
  editData!: Data;
  checked!: boolean | undefined;
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
  onChangeData() {
    // let selectedValue = e.target.value;
    // console.log(selectedValue);

    // let checked = e.target.checked;
    // console.log(this.checked);

    // if (checked) {
    //   this.selectedHobby.push(selectedValue);
    // } else {
    //   let index = this.selectedHobby.indexOf(selectedValue);
    //   this.selectedHobby.splice(index, 1);
    // }
    console.log('select', this.selectedHobby);
  }
  onSubmit() {
    // !this.toggle ? event.target.innerText = 'update' : event.target.innerText = 'submit'
    console.log("controls",this.formdemo.form.controls);
    
    if (this.formdemo.form.invalid) {
      this.submitted = true;
      return;
    } else {
      if (this.editId) {
        console.log('this.details', this.selectedHobby);
        this.details[this.dataId] = {
          hobbies: this.selectedHobby,
          hobbiesId: this.selectedHobbyId,
          id: this.editId,
          ...this.formdemo.form.value,
        };
        this.toggle = false;
        this.editId = 0;

        // items.firstName=  values.firstName,
        // items.lastName= values.lastName,
        // items.email= values.email,
        // items.mobileNo= values.mobileNo,
        // items.gender=values.gender
      } else {
        console.log('submit', this.formdemo.form.value);
        console.log(this.details);
        this.selectedHobby = this.hobbies
          .filter((x) => x.isCheck)
          .map((x) => x.label)
          .join(',')
          .toString();
        this.selectedHobbyId = this.hobbies
          .filter((x) => x.id)
          .map((x) => x.id)
          .join(',')
          .toString();
        console.log('val', this.selectedHobby);

        const data = {
          id: this.details.length + 1,
          hobbies: this.selectedHobby,
          hobbiesId: this.selectedHobbyId,
          ...this.formdemo.form.value,
        };
        this.details.push(data);
        console.log(this.details);
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
    // console.log('edit', data);
    // let selectedHobbiesId = data.hobbiesId.split(',');
    // for (let i = 0; i < selectedHobbiesId.length; i++) {
    //   this.hobbies
    //     .filter((x) => x.id === +selectedHobbiesId[i])
    //     .map((x) => (x.isCheck = true));
    // }
    // this.formdemo.form.value.hobbies = data.hobbies;
    // this.formdemo.form.value.hobbiesId = data.hobbiesId;
    this.formdemo.form.patchValue(data);
    this.submitted = false;
    this.editId = data.id;
    this.dataId = index;
    this.toggle = true;
    this.editData = data;
  }
  changeData(currentOption: any, allOptions: any) {
    // allOptions.map((data) =>
    //   data.selected ?
    //   this.selectedHobby = currentOption.label : null
    // )
    this.selectedHobby = allOptions;
    console.log('this.details :>> ', this.selectedHobby);
    // console.log('All options changed with ngModel', allOptions);
  }
}
