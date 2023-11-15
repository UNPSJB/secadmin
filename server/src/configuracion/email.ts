import { registerAs } from "@nestjs/config";
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.env' });

const config = {
   type: 'OAuth2',
   user:process.env.EMAIL_USER,
   pass: process.env.EMAIL_PASSWORD,
   clientId: process.env.OAUTH_CLIENTID,
   clientSecret: process.env.OAUTH_CLIENT_SECRET,
   refreshToken: process.env.OAUTH_REFRESH_TOKEN
}
 
export default registerAs('email', () => config)