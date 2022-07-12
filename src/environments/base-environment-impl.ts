import { BaseEnvironment } from "src/app/shared/models/base-environments";

export const BaseEnvironmentIMPL: BaseEnvironment = {
  production: false,
  app: {
    title: 'SGIS - Development',
    version: '2.0.0',
    env: 'development'
  },
  services: {
    authentication: {
      path: 'http://localhost:3000/',
    },
  },
};
