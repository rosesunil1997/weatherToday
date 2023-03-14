import { Component, OnInit } from '@angular/core';
import { CityData } from '../models/cityData.model';
import { WeatherData } from '../models/weatherData.model';
import { WeatherServiceService } from '../services/weather-service.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit{

  cityName = new FormControl('');

  constructor(
    //inject required services in constructor
    private weatherService : WeatherServiceService
  ){}

  cityData? : CityData;
  weatherData? : WeatherData;

  ngOnInit(): void {  
  }

  onCityEnter(){
    console.log(this.cityName);
    if(this.cityName.value){
      this.weatherService.getCityData(this.cityName.value)
    //use subscribe method to subscribe to this method
    .subscribe({
      next:(response)=>{
        this.cityData = response.results[0];   
        console.log(this.cityData);
        if(this.cityData){
          this.weatherService.getWeatherData(this.cityData)
          .subscribe({
            next:(result=>{
              console.log(result); 
              this.weatherData = result;           
            })
          }) 
        }         
      }    
    }) 
    }
    
  }
}
