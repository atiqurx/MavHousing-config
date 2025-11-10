import { Injectable } from '@nestjs/common';
import { genVCode } from 'common';
const Twilio = require('twilio');

@Injectable()
export class SmsService {
  private client;
  private fromNumber: string;

  constructor() {
    const sid = process.env.TWILIO_SID;
    const token = process.env.TWILIO_AUTH_TOKEN;
    const from = process.env.TWILIO_PH_NUM;

    if (!sid || !token || !from) {
      throw new Error(
        'Twilio environment variables (SID, AUTH_TOKEN, PH_NUM) are missing',
      );
    }

    this.fromNumber = from;
    this.client = Twilio(sid, token);
  }

  // test sms... just in case!!
  async testsms(to: string, message: string) {
    return this.client.messages.create({
      to: to,
      from: this.fromNumber,
      body: message,
    });
  }



}
