export const EnvConfiguration = () => ({
  enviroment: process.env.NODE_ENV || 'dev',
  mongodb: process.env.MONGODB_URI,
  port: +process.env.PORT || 3000,
  hostApi: process.env.HOST_API,
});
