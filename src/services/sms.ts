import Twilio from "twilio";

export default class SMS {
  private client: Twilio.Twilio;
  constructor() {
    this.client = Twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN,
    );
  }

  public static build() {
    return new SMS();
  }

  public async send(to: string, message: string) {
    try {
      const resposne = await this._send(to, message);

      return {
        ok: true,
        data: resposne,
      };
    } catch (error) {
      //   console.log(error);
      return {
        ok: false,
        error,
      };
    }
  }

  private _send(to: string, message: string) {
    return this.client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to,
    });
  }
}
