export const APP_CONFIG = 'APP_CONFIG';

export type Environment = 'dev' | 'prod' | 'test';

export interface AppConfig {
  folder: string;
  environment: Environment;
  dbHost: string;
  maxCats: number;
  defaultBreed: string;
}


export const appConfig: AppConfig = {
  folder: './config',
  environment: 'dev',
  dbHost: 'localhost',
  maxCats: 5, //Lo usamos en CatService para el ejemplo
  defaultBreed: 'Mixed',
};

