import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Person, Starship, SwapiGetResponse} from "../models";

@Injectable({
  providedIn: 'root'
})
export class SwapiService {

  constructor(private http: HttpClient) {
  }

  getPeople(pageNumber: number = 1) {
    return this.http.get<SwapiGetResponse<Person>>(`https://swapi.dev/api/people/?page=${pageNumber}`);
  }

  getStarships(pageNumber: number = 1) {
    return this.http.get<SwapiGetResponse<Starship>>(`https://swapi.dev/api/starships/?page=${pageNumber}`);
  }
}