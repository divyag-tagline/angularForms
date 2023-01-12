import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AddressService, City, Country, State } from './address.service';
interface UsersDetails {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: Date;
  mobileNo: string;
  gender: string;
  address: Address;
}
interface Address {
  country: string;
  state: string;
  city: string;
}
@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss'],
})
export class ReactiveFormComponent implements OnInit {
  countries!: Country[];
  states!: State[];
  cities!: City[];
  getStateDetails: any;
  countryId!: number;
  stateId!: number;
  btnDisable: boolean = true;
  genders = [
    {
      name: 'Male',
      value: 'male',
    },
    {
      name: 'Female',
      value: 'female',
    },
  ];
  usersDetails: UsersDetails[] = [
    {
      id: 1,
      firstName: 'divya',
      lastName: 'gabani',
      email: 'divya@gmail.com',
      birthDate: new Date('06-09-2001'),
      mobileNo: '9874563210',
      gender: 'female',
      address: { country: 'India', state: 'Gujarat', city: 'Surat' },
    },
  ];
  submitted = false;
  profileForm!: FormGroup;
  editForm!: UsersDetails;
  editId!: number;
  address!: Address;
  dataId!: number;
  toggle: boolean = false;
  selectedState: boolean = false;
  constructor(private addressService: AddressService) {
    // console.log('country', this.countryId);
    this.countries = this.addressService.country;
  }

  ngOnInit(): void {
    this.createProfileForm();
  }
  ngDoCheck(): void {
    if (this.countryId) {
      console.log('country', this.countryId);
      this.states = this.addressService.getStatesByCountry(this.countryId);
      this.cities = this.addressService.getCityByState(this.stateId);
    }

    console.log(this.states);
  }
  createProfileForm() {
    this.profileForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      birthDate: new FormControl('', [Validators.required]),
      mobileNo: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      address: new FormGroup({
        country: new FormControl('', [Validators.required]),
        state: new FormControl('', [Validators.required]),
        city: new FormControl('', [Validators.required]),
      }),
    });
  }

  get profileFormControl() {
    return this.profileForm.controls;
  }

  get addressControl() {
    return (this.profileFormControl['address'] as FormGroup).controls;
    // return (this.profileForm.controls['address'] as FormGroup).controls
  }

  blockCharacter(e: any) {
    var x = e.which || e.keycode;
    if (x >= 42 && x <= 57) return true;
    else return false;
  }
  onSubmit() {
    console.log(this.profileForm);
    
    if (this.profileForm.invalid) {
      this.submitted = true;
      return;
    } else {
      if (this.editId) {
        console.log(this.editId);
        console.log(this.editForm);
        console.log(this.usersDetails);

        this.usersDetails[this.dataId] = {
          id: this.editId,
          ...this.profileForm.value,
        };
        this.editId = 0;
        this.toggle = false;
        console.log('update');
      } else {
        let data = {
          id: this.usersDetails.length + 1,
          ...this.profileForm.value,
        };
        console.log('data', data);

        this.usersDetails.push(data);
      }
    }
    console.log(this.usersDetails);
    this.profileForm.reset();
    this.submitted = false;
  }
  handleEdit(data: UsersDetails, index: number) {
    // console.log(data.id);
    this.profileForm.patchValue(data);
    this.editForm = data;
    this.editId = data.id;
    this.toggle = true;
    this.dataId = index;

    console.log(this.editId);
    console.log(index);
  }
  handleDelete(index: number) {
    this.usersDetails.splice(index, 1);
  }
  selectCountry(e: any) {
    console.log(e);
    this.countryId = e.target.value;  ``
    this.btnDisable = false;
  }
  selectState(e: any) {
    this.stateId = e.target.value;
  }
}
