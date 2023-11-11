import { registerAs } from "@nestjs/config";
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.env' });

const config = {
   user:process.env.EMAIL_USER,
   pass: process.env.EMAIL_PASSWORD
}

export default registerAs('email', () => config)