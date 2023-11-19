import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor(private configService: ConfigService) {
    // Configurar el transporter (puedes utilizar un servicio como Gmail o cualquier otro proveedor SMTP)
    const nodemailer = require('nodemailer');
    const { google } = require("googleapis");
    const OAuth2 = google.auth.OAuth2;
    const smtpTransport = require('nodemailer-smtp-transport');
    const xoauth2 = require('xoauth2');
    

    const mail_rover = async (callback) => {
      const oauth2Client = new OAuth2(
          this.transporter.auth.clientId,
          this.transporter.auth.clientSecret,
          "https://developers.google.com/oauthplayground",
      );
      oauth2Client.setCredentials({
          refresh_token: this.transporter.auth.refreshToken,
          tls: {
              rejectUnauthorized: false
          }
      });
      oauth2Client.getAccessToken((err, token) => {
          if (err)
              return console.log(err);;
          this.transporter.auth.accessToken = token;
          callback(nodemailer.createTransport(this.transporter));
      });
  };

    this.transporter = nodemailer.createTransport(
      smtpTransport({
        service: 'gmail', // Puedes cambiarlo según tu proveedor de correo
        auth: {
          xoauth2: xoauth2.createXOAuth2Generator({
            user: 'sec2023unpsjb@gmail.com',
            clientId: process.env.OAUTH_CLIENTID,
            clientSecret: process.env.OAUTH_CLIENT_SECRET,
            refreshToken: process.env.OAUTH_REFRESH_TOKEN,
            accessToken: 'tu_access_token', // Este puede no ser necesario si usas refreshToken
            expires: 3600,
          }),
        },
      })
    );
  } 
  async enviarCorreo(destinatario: string, asunto: string, cuerpo: string) {
    // Configurar el objeto de opciones del correo
    const opcionesCorreo = {
      from: this.configService.get("email").user,
      to: destinatario,
      subject: asunto,
      text: cuerpo,
    };

    // Enviar el correo
  this.transporter.sendMail(opcionesCorreo, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log('Correo enviado: ' + info.response);
      }
    });
    const info = await this.transporter.sendMail(opcionesCorreo);

    console.log('Correo enviado: %s', info.messageId);
    console.log('URL del mensaje: %s', nodemailer.getTestMessageUrl(info));
  }
}
 