import { Resend } from "resend";
import {
  createScoreEmailHtml,
  createScoreEmailSubject,
  createScoreEmailText,
} from "./templates/score-email";
import type {
  ScoreEmailPayload,
  ScoreEmailTemplateData,
} from "./templates/score-email";

type EmailProvider = "brevo" | "resend";

function getEmailProvider(): EmailProvider {
  const configuredProvider = process.env.EMAIL_PROVIDER?.trim().toLowerCase();

  if (configuredProvider === "brevo" || configuredProvider === "resend") {
    return configuredProvider;
  }

  if (configuredProvider) {
    throw new Error("O provedor de e-mail configurado não é suportado.");
  }

  return process.env.BREVO_API_KEY ? "brevo" : "resend";
}

async function sendWithBrevo(
  templateData: ScoreEmailTemplateData,
  recipientEmail: string,
) {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  const senderName = process.env.BREVO_SENDER_NAME?.trim() || "EduGame Carapicuíba";

  if (!apiKey || !senderEmail) {
    throw new Error("O envio pela Brevo não está configurado neste ambiente.");
  }

  let response: Response;

  try {
    response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": apiKey,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: {
          name: senderName,
          email: senderEmail,
        },
        to: [{ email: recipientEmail }],
        subject: createScoreEmailSubject(templateData),
        htmlContent: createScoreEmailHtml(templateData),
        textContent: createScoreEmailText(templateData),
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(15_000),
    });
  } catch {
    throw new Error("Não foi possível conectar ao serviço de e-mail.");
  }

  if (!response.ok) {
    throw new Error("O serviço de e-mail recusou o envio. Verifique a configuração da Brevo.");
  }

  return response.json() as Promise<{ messageId?: string }>;
}

async function sendWithResend(
  templateData: ScoreEmailTemplateData,
  recipientEmail: string,
) {
  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    throw new Error("O envio pelo Resend não está configurado neste ambiente.");
  }

  const resendFromEmail = process.env.RESEND_FROM_EMAIL;
  if (!resendFromEmail) {
    throw new Error("O endereço remetente não está configurado neste ambiente.");
  }

  const resend = new Resend(resendApiKey);

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

export async function sendScoreEmail(payload: ScoreEmailPayload) {
  const recipientEmail = process.env.RESULT_RECIPIENT_EMAIL;
  if (!recipientEmail) {
    throw new Error("O destinatário dos resultados não está configurado neste ambiente.");
  }

  const templateData: ScoreEmailTemplateData = {
    ...payload,
    date: new Intl.DateTimeFormat("pt-BR", {
      timeZone: "America/Sao_Paulo",
    }).format(new Date()),
  };

  return getEmailProvider() === "brevo"
    ? sendWithBrevo(templateData, recipientEmail)
    : sendWithResend(templateData, recipientEmail);
}

export type { ScoreEmailPayload };
