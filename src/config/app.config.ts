export const APP_CONFIG = 'APP_CONFIG';

export interface AppConfig {
  maxCats: number;
  defaultBreed: string;
}

export const appConfig: AppConfig = {
  maxCats: 5,
  defaultBreed: 'Mixed',
};
