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
  address: {
    country: Country;
    state: State;
    city: City;
  };
  isToRead: boolean;
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
      mobileNo: '9874012365',
      gender: 'female',
      address: {
        country: { countryName: 'India', countryId: 1 },
        state: { stateName: 'Gujarat', stateId: 101, countryId: 1 },
        city: {
          cityName: 'Ahemdabad',
          cityId: 202,
          stateId: 101,
          countryId: 1,
        },
      },
      isToRead: true,
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
      isToRead: [false, Validators.pattern('true')],
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
  onSubmit(): void {
    if (this.profileForm.invalid) {
      this.submitted = true;
      return;
    } else {
      let address: Address;
      address = this.profileForm.value.address;
      const coumtryName: Country | undefined = this.countries.find(
        (country) => country.countryId === +address.country
      );
      const stateName: State | undefined = this.states.find(
        (state) =>
          state.stateId === +address.state &&
          state.countryId === +address.country
      );
      const cityName = this.cities.find(
        (city) =>
          city.cityId === +address.city && city.stateId === +address.state
      );
      // this.profileForm.value.address = {
      //   country: coumtryName,
      //   state: stateName,
      //   city: cityName,
      // };
      if (this.editId) {
        this.usersDetails[this.dataId] = {
          id: this.editId,
          ...this.profileForm.value,
          address: {
            country: coumtryName,
            state: stateName,
            city: cityName,
          },
        };
        this.editId = 0;
        this.toggle = false;
        this.profileForm.reset();
      } else {
        let data = {
          id: this.usersDetails.length + 1,
          ...this.profileForm.value,
          address: {
            country: coumtryName,
            state: stateName,
            city: cityName,
          },
        };
        this.usersDetails.push(data);
      }
    }
    this.profileForm.reset();
    this.submitted = false;
  }
  handleEdit(data: UsersDetails, index: number) {
    console.log(this.usersDetails);
    let address = {
      country: data.address.country.countryId,
      state: data.address.state.stateId,
      city: data.address.city.cityId,
    };
    this.selectCountry(0, data.address.country.countryId);
    this.selectState(0, data.address.state.stateId);
    // let date = this.usersDetails[0].birthDate
    // let bDate = date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate()
    // console.log(bDate);
    this.profileForm.patchValue(data);
    // this.profileForm.controls['birthDate'].patchValue(bDate)
    this.profileForm.controls['address'].patchValue(address);
    console.log(this.profileForm.value);
    this.editId = data.id;
    this.toggle = true;
    this.dataId = index;
  }
  handleDelete(index: number) {
    this.usersDetails.splice(index, 1);
  }
  selectCountry(e: any, id: number) {
    if (e) {
      this.countryId = e.target.value;
    } else {
      this.countryId = id;
    }
  }
  selectState(e: any, id: number) {
    if (e) {
      this.stateId = e.target.value;
    } else {
      this.stateId = id;
    }
  }
}
