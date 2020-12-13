export enum MushroomApplication {
  edible = 'edible', //jadalny
  inedible = 'inedible', //niejadalny
  poisonous = 'poisonous', //trujący
  deadlyPoisonous = 'deadlyPoisonous', //śmiertelnie trujący
  conditionallyEdible = 'conditionallyEdible', //warunkowo jadalny
}

export class MushroomDescriptionDto {
  occurrence: string; //występowanie
  dimensions: string; //wymiary
  cap: string; //kapelusz
  underCap: string; //pod kapeluszem
  capImprint: string; //odcisk kapelusza
  stem: string; //trzon
  flesh: string; //miąższ
  characteristics: string; //cechy charakterystyczne
  possibleConfusion: string; //możliwe pomyłki
  value: string; //wartość (walory smakowe)
  comments: string; //uwagi
  frequency: string; //częstotliwość występowania
}

export class MushroomDto {
  polishName: string; //nazwa polska
  scientificName: string; //nazwa naukowa
  anotherNames: string; //inne nazwy
  application: MushroomApplication; //zastosowanie
  isLegallyProtected: boolean; //chroniony prawnie
  approvedForTrade: boolean; //dopuszczony do handlu
  description: MushroomDescriptionDto; //ID opisu
}
