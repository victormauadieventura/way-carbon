import { BaseEnvironment } from "src/app/shared/models/base-environments";
import { BaseEnvironmentIMPL } from "./base-environment-impl";

export const environment: BaseEnvironment = {
  ...BaseEnvironmentIMPL,
  production: false,
  app: {
    title: 'SGIS - Development',
    version: `Development - ${BaseEnvironmentIMPL.app.version}`,
    env: 'development',
  },
};
