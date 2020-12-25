import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
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
  @IsNotEmpty()
  occurrence: string; //występowanie
  @IsString()
  @IsNotEmpty()
  dimensions: string; //wymiary
  @IsString()
  @IsNotEmpty()
  cap: string; //kapelusz
  @IsString()
  @IsNotEmpty()
  underCap: string; //pod kapeluszem
  @IsString()
  @IsNotEmpty()
  capImprint: string; //odcisk kapelusza
  @IsString()
  @IsNotEmpty()
  stem: string; //trzon
  @IsString()
  @IsNotEmpty()
  flesh: string; //miąższ
  @IsString()
  @IsNotEmpty()
  characteristics: string; //cechy charakterystyczne
  @IsString()
  @IsNotEmpty()
  possibleConfusion: string; //możliwe pomyłki
  @IsString()
  @IsNotEmpty()
  value: string; //wartość (walory smakowe)
  @IsString()
  @IsNotEmpty()
  comments: string; //uwagi
  @IsString()
  @IsNotEmpty()
  frequency: string; //częstotliwość występowania
}

export class MushroomDto {
  @IsString()
  @IsNotEmpty()
  polishName: string; //nazwa polska
  @IsString()
  @IsNotEmpty()
  scientificName: string; //nazwa naukowa
  @IsString()
  @IsNotEmpty()
  anotherNames: string; //inne nazwy
  @IsEnum(MushroomApplication)
  @IsNotEmpty()
  application: MushroomApplication; //zastosowanie
  @IsBoolean()
  @IsNotEmpty()
  isLegallyProtected: boolean; //chroniony prawnie
  @IsBoolean()
  @IsNotEmpty()
  approvedForTrade: boolean; //dopuszczony do handlu
  @ValidateNested({ each: true })
  @IsNotEmpty()
  description: MushroomDescriptionDto; //ID opisu
  @IsNumber()
  @Min(0)
  images: number;
}
