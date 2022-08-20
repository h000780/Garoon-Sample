type BaseMailEventObject = {
  type: string;
  error?: string;
  mail: Mail;
};

type Mail = {
  subject: string;
  body?: string;
  isHtml: boolean;
  htmlBody?: string;
  signature: string;
  dispositionNotification: boolean;
  actionType: "NEW" | "REPLY" | "FORWARD" | "RESEND";
  from: MailUser;
  to: MailUser[];
  cc: MailUser[];
  bcc: MailUser[];
  attatchments: Attatchment[];
}

type Attatchment = {
  id: string;
  name: string;
  contentType: string;
  size: string;
}

type MailUser = {
  name: string;
  mailAddress: string;
}

type MailMailSendSubmit = BaseMailEventObject;