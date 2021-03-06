import { BaseEnvironment } from "src/app/shared/models/base-environments";
import { BaseEnvironmentIMPL } from "./base-environment-impl";

export const environment: BaseEnvironment = {
  ...BaseEnvironmentIMPL,
  production: true,
  app: {
    title: 'SGIS',
    version: `${BaseEnvironmentIMPL.app.version}`,
    env: 'production'
  },
  services: {
    authentication: {
      path: 'http://localhost:3000/',
    },
  },
};
