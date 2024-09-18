import { Exclude, Expose, Transform } from 'class-transformer';

export class Person {
  @Expose()
  public name: string;
  @Expose()
  @Transform(({value}) => value === 'unknown' ? 0 : parseInt(value, 10), {toClassOnly: true})
  public mass: number;
  @Expose()
  public height: string;
  @Expose()
  public birth_year: string;
  @Expose()
  public gender: string;
  @Exclude()
  public hair_color: string;
  @Exclude()
  public skin_color: string;
  @Exclude()
  public eye_color: string;
  @Exclude()
  public homeworld: string;
  @Exclude()
  public films: string[];
  @Exclude()
  public species: string[];
  @Exclude()
  public vehicles: string[];
  @Exclude()
  public starships: string[];
  @Exclude()
  public created: string;
  @Exclude()
  public edited: string;
  @Exclude()
  public url: string;
}
