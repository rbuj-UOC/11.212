export interface MeteoStationState {
  codi?: number;
  dataInici?: string;
  dataFi?: string | null;
}

export interface MeteoStation {
  codi?: string;
  nom?: string;
  tipus?: string;
  emplacament?: string;
  altitud?: number;
  coordenades?: {
    latitud?: number;
    longitud?: number;
  };
  municipi?: {
    codi?: string;
    nom?: string;
  };
  comarca?: {
    codi?: number;
    nom?: string;
  };
  provincia?: {
    codi?: number;
    nom?: string;
  };
  xarxa?: {
    codi?: number;
    nom?: string;
  };
  estats?: MeteoStationState[];
}
