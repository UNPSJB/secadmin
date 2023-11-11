import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor(private configService: ConfigService) {
    // Configurar el transporter (puedes utilizar un servicio como Gmail o cualquier otro proveedor SMTP)
  
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: this.configService.get("email")
    });
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
    const info = await this.transporter.sendMail(opcionesCorreo);

    console.log('Correo enviado: %s', info.messageId);
    console.log('URL del mensaje: %s', nodemailer.getTestMessageUrl(info));
  }
}