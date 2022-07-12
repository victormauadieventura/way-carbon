import { BaseEnvironment } from "src/app/shared/models/base-environments";
import { BaseEnvironmentIMPL } from "./base-environment-impl";
import { environment as environmentTst } from './environment.tst';

export const environment: BaseEnvironment = {
  ...BaseEnvironmentIMPL,
  ...environmentTst,
  production: true
};
