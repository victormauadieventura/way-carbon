export interface BaseEnvironment {
  production: boolean;
  app: {
    title?: string;
    version?: string;
    env?: 'development' | 'test' | 'production';
  };
  services: {
    authentication: {
      path: string;
    };
  };
}
