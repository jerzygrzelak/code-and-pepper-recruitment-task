import '@angular/compiler';
import 'zone.js';
import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { SwapiService } from './swapi.service';
import { Person, Starship, SwapiGetResponse } from '../models';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { provideHttpClient } from '@angular/common/http';

describe('SwapiService', () => {
  let service: SwapiService;
  let httpMock: HttpTestingController;

  beforeAll(() => {
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SwapiService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });
    service = TestBed.inject(SwapiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no pending requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch people from the correct API endpoint', () => {
    const mockResponse: SwapiGetResponse<Person> = {
      count: 1,
      next: null,
      previous: null,
      results: [
        {
          name: 'Luke Skywalker',
          mass: 77,
          height: '172',
          birth_year: '19BBY',
          gender: 'male'
        }
      ]
    };

    service.getPeople(1).subscribe((response) => {
      expect(response.results.length).toBe(1);
      expect(response.results[0].name).toBe('Luke Skywalker');
    });

    const req = httpMock.expectOne('https://swapi.dev/api/people/?page=1');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse); // Provide the mock data as the response
  });

  it('should fetch starships from the correct API endpoint', () => {
    const mockResponse: SwapiGetResponse<Starship> = {
      count: 1,
      next: null,
      previous: null,
      results: [
        {
          name: 'Millennium Falcon',
          model: 'YT-1300 light freighter',
          crew: 4,
          passengers: '6',
          manufacturer: 'Corellian Engineering Corporation',
          cost_in_credits: '100000'
        }
      ]
    };

    service.getStarships(1).subscribe((response) => {
      expect(response.results.length).toBe(1);
      expect(response.results[0].name).toBe('Millennium Falcon');
    });

    const req = httpMock.expectOne('https://swapi.dev/api/starships/?page=1');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
