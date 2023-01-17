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
  address: any;
  isToRead:boolean;
}
interface Address {
  country: Country;
  state: State;
  city: City;
}
@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss'],
})
export class ReactiveFormComponent implements OnInit {
  editDetails!: UsersDetails;
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
      address: {
        country: {
          countryName: 'India',
          countryId: 1,
        },
        state: {
          stateName: 'Gujarat',
          stateId: 101,
          countryId: 1,
        },
        city: {
          cityName: 'Surat',
          cityId: 201,
          stateId: 101,
          countryId: 1,
        },
      },
      isToRead:true
    },
  ];
  submitted = false;
  profileForm!: FormGroup;
  editId!: number;
  address!: Address;
  dataId!: number;
  toggle: boolean = false;
  constructor(
    private addressService: AddressService,
    private formBuilder: FormBuilder
  ) {
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
    this.profileForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthDate: ['', Validators.required],
      mobileNo: ['', Validators.required],
      gender: ['', Validators.required],
      address: this.formBuilder.group({
        country: ['', Validators.required],
        state: ['', Validators.required],
        city: ['', Validators.required],
      }),
      isToRead: [false, Validators.pattern('true')]
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
      let address: Address;
      address = this.profileForm.value.address;
      this.countryName = this.countries.find(
        (data) => data.countryId == +address.country
      );
      this.stateName = this.states.find(
        (data) => data.stateId == +address.state
      );
      this.cityName = this.cities.find((data) => data.cityId == +address.city);
      this.profileForm.value.address = {
        city: this.cityName,
        state: this.stateName,
        country: this.countryName,
      };
      if (this.editId) {
        this.usersDetails[this.dataId] = {
          id: this.editId,
          ...this.profileForm.value,
        };
        this.editId = 0;
        this.toggle = false;
      } else {
        
        let data = {
          id: this.usersDetails.length + 1,
          ...this.profileForm.value,
        };
        this.usersDetails.push(data);
      }
      this.submitted = false;
    }
    this.profileForm.reset();
  }
  handleEdit(data: UsersDetails, index: number) {
    data.address = {
      city: data.address.city.cityId,
      country: data.address.country.countryId,
      state: data.address.state.stateId,
    };
    this.profileForm.patchValue(data);
    this.editDetails = data;
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
