import { Exclude, Expose, Transform } from 'class-transformer';

export class Starship {
  @Expose()
  public name: string;
  @Expose()
  public model: string;
  @Expose()
  @Transform(({value}) => value === 'unknown' ? 0 : parseInt(value, 10), {toClassOnly: true})
  public crew: number;
  @Expose()
  public manufacturer: string;
  @Expose()
  @Transform(({value}) => value === 'unknown' ? 'n/a' : value, {toClassOnly: true})
  public cost_in_credits: string;
  @Expose()
  public passengers: string;
  @Exclude()
  public length: string;
  @Exclude()
  public max_atmosphering_speed: string;
  @Exclude()
  public cargo_capacity: string;
  @Exclude()
  public consumables: string;
  @Exclude()
  public hyperdrive_rating: string;
  @Exclude()
  public MGLT: string;
  @Exclude()
  public starship_class: string;
  @Exclude()
  public pilots: string[];
  @Exclude()
  public films: string[];
  @Exclude()
  public created: string;
  @Exclude()
  public edited: string;
  @Exclude()
  public url: string;
}
