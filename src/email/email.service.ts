import Mail from "nodemailer/lib/mailer";
import { createTransport } from "nodemailer";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

interface EmailOption {
  to: string;
  subject: string;
  html: string;
}

@Injectable()
export class EmailService {
  private transpoter: Mail;

  constructor(private configService: ConfigService) {
    this.transpoter = createTransport({
      service: this.configService.get<string>("email.service"),
      auth: {
        user: this.configService.get<string>("email.auth.user"),
        pass: this.configService.get<string>("email.auth.pass"),
      },
    });
  }

  async sendMemberJoinVerification(
    emailAddress: string,
    signupVerifyToken: string,
  ) {
    const baseUrl = this.configService.get<string>("email.baseUrl");

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
