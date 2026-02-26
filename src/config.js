import "dotenv/config";
import Joi from "joi";

const envSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid("development", "production", "test")
    .required()
    .messages({
      "any.required": "NODE_ENV is required",
      "string.empty": "NODE_ENV cannot be empty",
      "any.only":
        "NODE_ENV must be one of 'development', 'production', or 'test'",
    }),
  DATABASE_HOST: Joi.string().required().messages({
    "any.required": "DATABASE_HOST is required",
    "string.empty": "DATABASE_HOST cannot be empty",
  }),
  DATABASE_PORT: Joi.number().port().optional().messages({
    "number.base": "DATABASE_PORT must be a number",
    "number.port": "DATABASE_PORT must be a valid port number",
  }),
  DATABASE_NAME: Joi.string().required().messages({
    "any.required": "DATABASE_NAME is required",
    "string.empty": "DATABASE_NAME cannot be empty",
  }),
  DATABASE_USER: Joi.string().required().messages({
    "any.required": "DATABASE_USER is required",
    "string.empty": "DATABASE_USER cannot be empty",
  }),
  DATABASE_PASSWORD: Joi.string().required().messages({
    "any.required": "DATABASE_PASSWORD is required",
    "string.empty": "DATABASE_PASSWORD cannot be empty",
  }),
  PORT: Joi.number().port().required().messages({
    "any.required": "PORT is required",
    "number.base": "PORT must be a number",
    "number.port": "PORT must be a valid port number",
  }),
  HOST: Joi.string().hostname().required().messages({
    "any.required": "HOST is required",
    "string.base": "HOST must be a string",
    "string.hostname": "HOST must be a valid hostname",
  }),
  JWT_SECRET: Joi.string().required().messages({
    "any.required": "JWT_SECRET is required",
    "string.empty": "JWT_SECRET cannot be empty",
  }),
}).unknown();

const validateEnv = () => {
  const { error, value } = envSchema.validate(process.env);

  if (error) {
    throw new Error(`Config validation error: ${error.message}`);
  }

  return value;
};

const env = validateEnv();

const config = {
  nodeEnv: env.NODE_ENV,
  server: {
    host: env.HOST,
    port: env.PORT,
  },
  database: {
    host: env.DATABASE_HOST,
    port: env.DATABASE_PORT,
    dbName: env.DATABASE_NAME,
    user: env.DATABASE_USER,
    password: env.DATABASE_PASSWORD,
    connectionString: `postgresql://${env.DATABASE_USER}:${env.DATABASE_PASSWORD}@${env.DATABASE_HOST}:${env.DATABASE_PORT}/${env.DATABASE_NAME}`,
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
};

export default config;
