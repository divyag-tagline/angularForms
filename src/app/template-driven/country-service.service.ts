import { Injectable } from '@angular/core';
interface Country  {
  countryName : string,
  countryId : number
}
interface State {
  stateName : string,
  stateId : number,
  countryId : number
}
@Injectable({
  providedIn: 'root'
})
export class CountryServiceService {

  constructor() { }
  country :Country[]  = [
    {
      countryName:'India',
      countryId : 1
    },
    {
      countryName:'Canada',
      countryId :2
    }
  ]
  state : State[] = [
      {
        stateName:'Gujarat',
        stateId:101,
        countryId:1
      },
      {
        stateName:'Kerala',
        stateId:102,
        countryId:1
      },
      {
        stateName:'British Colombia',
        stateId:103,
        countryId:2
      },
      {
        stateName:'Ontario',
        stateId:104,
        countryId:2
      }
  ]
  
}
