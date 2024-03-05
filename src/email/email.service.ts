import Mail from "nodemailer/lib/mailer";
import { createTransport } from "nodemailer";
import { Inject, Injectable } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import emailConfig from "src/config/email.config";

interface EmailOption {
  to: string;
  subject: string;
  html: string;
}

@Injectable()
export class EmailService {
  private transpoter: Mail;

  constructor(
    @Inject(emailConfig.KEY) private config: ConfigType<typeof emailConfig>,
  ) {
    this.transpoter = createTransport({
      service: config.service,
      auth: {
        user: config.auth.user,
        pass: config.auth.pass,
      },
    });
  }

  async sendMemberJoinVerification(
    emailAddress: string,
    signupVerifyToken: string,
  ) {
    const baseUrl = this.config.baseUrl;

    // 인증하기 버튼 클릭 시 서버로 전송될 POST 요청 주소
    const url = `${baseUrl}/users/email-verify?signupVerifyToken=${signupVerifyToken}`;

    const mailOptions: EmailOption = {
      to: emailAddress,
      subject: "가입 인증 메일",
      html: `
        인증하기 버튼을 누르시면 가입 인증이 완료됩니다.<br/>
        <form action="${url}" method="POST">
          <button>인증하기</button>
        </form>
      `,
    };

    return await this.transpoter.sendMail(mailOptions);
  }
}
