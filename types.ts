export enum GiColor {
  WHITE = 'Blanco',
  BLUE = 'Azul',
  BLACK = 'Negro',
}

export enum MatchState {
  SETUP = 'SETUP',
  ACTIVE = 'ACTIVE',
  PAUSED = 'PAUSED',
  FINISHED = 'FINISHED',
}

export interface Competitor {
  id: string;
  name: string;
  giColor: GiColor;
  points: number;
  advantages: number;
  warnings: number;
}

export const DURATION_OPTIONS = [5, 6, 7, 8, 10]; // Minutes

// *** INSTRUCCIÓN PARA EL LOGO ***
// Reemplaza la URL de abajo con la URL real de tu logo.
// Si tienes el archivo localmente, ponlo en la carpeta public/ y usa "/nombre-archivo.png"
export const TOURNAMENT_LOGO = "https://cdn-icons-png.flaticon.com/512/77/77656.png"; // Placeholder de cinturón negro