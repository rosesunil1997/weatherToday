import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { CityData, GeoCode } from '../models/cityData.model';
import { WeatherData } from '../models/weatherData.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherServiceService {

  constructor(
    private httpClient : HttpClient
  ) { }

  getCityData(cityName:any): Observable<GeoCode>{
    //Mapped the get response to CityData model
    return this.httpClient.get<GeoCode>(environment.geoCodingAPI+`/search`,{
      params: new HttpParams()
      .set('name',cityName)
      .set('count',1)
    })
  }
  getWeatherData(cityData:CityData): Observable<WeatherData>{
    return this.httpClient.get<WeatherData>(environment.weatherAPIBaseUrl+`/forecast`,{
      params: new HttpParams()
      .set('latitude',cityData.latitude)
      .set('longitude',cityData.longitude)
      .set('current_weather',true)
    })
  }
}