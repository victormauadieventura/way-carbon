import { BaseEnvironment } from 'src/app/shared/models/base-environments';
import { BaseEnvironmentIMPL } from './base-environment-impl';

export const environment: BaseEnvironment = {
  ...BaseEnvironmentIMPL,
  production: false,
};
