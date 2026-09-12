import { Resend } from "resend";
import {
  createScoreEmailHtml,
  createScoreEmailSubject,
  createScoreEmailText,
  ScoreEmailPayload,
} from "./templates/score-email";

export async function sendScoreEmail(payload: ScoreEmailPayload) {
  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    throw new Error("O envio por e-mail não está configurado neste ambiente.");
  }

  const resendFromEmail = process.env.RESEND_FROM_EMAIL;
  if (!resendFromEmail) {
    throw new Error("O endereço remetente não está configurado neste ambiente.");
  }

  const recipientEmail = process.env.RESULT_RECIPIENT_EMAIL;
  if (!recipientEmail) {
    throw new Error("O destinatário dos resultados não está configurado neste ambiente.");
  }

  const resend = new Resend(resendApiKey);

  const templateData = {
    ...payload,
    date: new Intl.DateTimeFormat("pt-BR", {
      timeZone: "America/Sao_Paulo",
    }).format(new Date()),
  };

  const result = await resend.emails.send({
    from: resendFromEmail,
    to: recipientEmail,
    subject: createScoreEmailSubject(templateData),
    html: createScoreEmailHtml(templateData),
    text: createScoreEmailText(templateData),
  });

  if (result.error) {
    throw new Error("O serviço de e-mail recusou o envio. Verifique a configuração do Resend.");
  }

  return result.data;
}
export type { ScoreEmailPayload };
