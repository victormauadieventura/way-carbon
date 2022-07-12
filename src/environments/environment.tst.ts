import { BaseEnvironment } from "src/app/shared/models/base-environments";
import { BaseEnvironmentIMPL } from "./base-environment-impl";

export const environment: BaseEnvironment = {
  ...BaseEnvironmentIMPL,
  production: false,
  app: {
    title: 'SGIS - Teste',
    version: `Teste - ${BaseEnvironmentIMPL.app.version}`,
    env: 'test',
  },
  services: {
    authentication: {
      path: 'http://localhost:3000/',
    },
  },
};
