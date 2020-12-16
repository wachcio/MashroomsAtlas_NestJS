import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

export enum MushroomApplication {
  edible = 'edible', //jadalny
  inedible = 'inedible', //niejadalny
  poisonous = 'poisonous', //trujący
  deadlyPoisonous = 'deadlyPoisonous', //śmiertelnie trujący
  conditionallyEdible = 'conditionallyEdible', //warunkowo jadalny
}

export class MushroomDescriptionDto {
  @IsString()
  occurrence: string; //występowanie
  @IsString()
  dimensions: string; //wymiary
  @IsString()
  cap: string; //kapelusz
  @IsString()
  underCap: string; //pod kapeluszem
  @IsString()
  capImprint: string; //odcisk kapelusza
  @IsString()
  stem: string; //trzon
  @IsString()
  flesh: string; //miąższ
  @IsString()
  characteristics: string; //cechy charakterystyczne
  @IsString()
  possibleConfusion: string; //możliwe pomyłki
  @IsString()
  value: string; //wartość (walory smakowe)
  @IsString()
  comments: string; //uwagi
  @IsString()
  frequency: string; //częstotliwość występowania
}

export class MushroomDto {
  @IsString()
  polishName: string; //nazwa polska
  @IsString()
  scientificName: string; //nazwa naukowa
  @IsString()
  anotherNames: string; //inne nazwy
  @IsEnum(MushroomApplication)
  application: MushroomApplication; //zastosowanie
  @IsBoolean()
  isLegallyProtected: boolean; //chroniony prawnie
  @IsBoolean()
  approvedForTrade: boolean; //dopuszczony do handlu
  @ValidateNested({ each: true })
  description: MushroomDescriptionDto; //ID opisu
  @IsNumber()
  @Min(0)
  images: number;
}
