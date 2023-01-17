import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { retry } from 'rxjs';
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
  countryName!: any;
  stateName!: any;
  cityName!: any;
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
  addressDetails: any;
  dataId!: number;
  toggle: boolean = false;
  selectedState: boolean = false;
  stateDetails: any;
  constructor(private addressService: AddressService) {
    this.countries = this.addressService.country;
  }

  ngOnInit(): void {
    this.createProfileForm();
  }
  ngDoCheck(): void {
    if (this.countryId) {
      this.states = this.addressService.getStatesByCountry(this.countryId);
      this.cities = this.addressService.getCityByState(this.stateId);
    }
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
  }

  blockCharacter(e: any) {
    var x = e.which || e.keycode;
    if (x >= 42 && x <= 57) return true;
    else return false;
  }
  onSubmit() {
    if (this.profileForm.invalid) {
      this.submitted = true;
      return;
    } else {
      let address: any;
      address = this.profileForm.value.address;
      this.countryName = this.countries.find(
        (data) => data.countryId == +address.country
      );
      this.stateName = this.states.find(
        (data) => data.stateId == +address.state
      );
      this.cityName = this.cities.find(
        (data) => data.cityId == +address.city
      );
      
      if (this.editId) {
        this.profileForm.value.address = {
          city: this.cityName.cityId,
          state: this.stateName.stateId,
          country: this.countryName.countryId,
        };
        console.log(this.profileForm.value)
        this.usersDetails[this.dataId] = {
          id: this.editId,
          ...this.profileForm.value,
        };
        this.editId = 0;
        this.toggle = false;
        console.log('update');
      } else {
        this.profileForm.value.address = {
          city: this.cityName.cityName,
          state: this.stateName.stateName,
          country: this.countryName.countryName,
        };
        let data = {
          id: this.usersDetails.length + 1,
          ...this.profileForm.value,
        };
        this.usersDetails.push(data);
      }
    }
    this.profileForm.reset();
    this.submitted = false;
  }
  handleEdit(data: UsersDetails, index: number) {
    this.profileForm.patchValue(data);
    this.editForm = data;
    this.editId = data.id;
    this.toggle = true;
    this.dataId = index;
  }
  handleDelete(index: number) {
    this.usersDetails.splice(index, 1);
  }
  selectCountry(e: any) {
    console.log('DDDDD', e.target.value);
    this.countryId = e.target.value;
  }
  selectState(e: any) {
    this.stateId = e.target.value;
  }
}
