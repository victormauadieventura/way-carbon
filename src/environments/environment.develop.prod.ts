import { BaseEnvironment } from "src/app/shared/models/base-environments";
import { BaseEnvironmentIMPL } from "./base-environment-impl";
import { environment as environmentDev } from './environment.develop';

export const environment: BaseEnvironment = {
  ...BaseEnvironmentIMPL,
  ...environmentDev,
  production: true,
};
