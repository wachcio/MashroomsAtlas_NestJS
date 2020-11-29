enum MushroomApplication {
  edible, //jadalny
  inedible, //niejadalny
  poisonous, //trujący
  conditionallyEdible, //warunkowo jadalny
}

export interface MushroomDescription {
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

export interface Mushroom {
  polishName: string; //nazwa polska
  scientificName: string; //nazwa naukowa
  anotherNames: string; //inne nazwy
  application: MushroomApplication; //zastosowanie
  isLegallyProtected: boolean; //chroniony prawnie
  approvedForTrade: boolean; //dopuszczony do handlu
  images: string[]; //zdjęcia
  description: MushroomDescription; //opis
}

export type MushroomList = Mushroom[];