import { Injectable } from '@angular/core';
export interface Country{
  countryName: string,
  countryId:number
}
export interface State{
  stateName:string,
  stateId:number,
  countryId:number
}
export interface City{
  cityName : string,
  cityId:number,
  stateId:number
  countryId:number
}
@Injectable({
  providedIn: 'root',
})
export class AddressService {
  country: Country[] = [
    {
      countryName: 'India',
      countryId: 1,
    },
    {
      countryName: 'Canada',
      countryId: 2,
    },
  ];
  state: State[] = [
    {
      stateName: 'Gujarat',
      stateId: 101,
      countryId: 1,
    },
    {
      stateName: 'Kerala',
      stateId: 102,
      countryId: 1,
    },
    {
      stateName: 'British Colombia',
      stateId: 103,
      countryId: 2,
    },
    {
      stateName: 'Ontario',
      stateId: 104,
      countryId: 2,
    },
  ];
  city: City[] = [
    {
      cityName: 'Surat',
      cityId: 201,
      stateId: 101,
      countryId: 1
    },
    {
      cityName: 'Ahemdabad',
      cityId: 202,
      stateId: 101,
      countryId: 1
    },
    {
      cityName: 'Kochi',
      cityId: 203,
      stateId: 102,
      countryId: 1
    },
    {
      cityName: 'Kottayam',
      cityId: 204,
      stateId: 102,
      countryId: 1
    },
    {
      cityName: 'Vadodara',
      cityId: 201,
      stateId: 103,
      countryId: 2
    },
    {
      cityName: 'Amreli',
      cityId: 202,
      stateId: 104,
      countryId: 2
    },
  ];
  constructor() {}

  getStatesByCountry(countryId: number) {
    return this.state.filter((data)=>data.countryId === +countryId);
  }
  getCityByState(stateId:number){
    return this.city.filter((data)=>data.stateId === +stateId);
  }
}
