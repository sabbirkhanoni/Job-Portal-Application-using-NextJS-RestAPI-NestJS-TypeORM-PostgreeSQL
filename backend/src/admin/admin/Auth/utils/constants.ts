export const jwtConstants = {
  secret: process.env.JWT_SECRET || 'DEV_SECRET_DO_NOT_USE_IN_PROD',
  expiresIn: process.env.JWT_EXPIRES_IN || '1h',
};
