export type ScoreEmailPayload = {
  studentName: string;
  teacherName: string;
  subject: string;
  score: number;
  total: number;
  correct: number;
  accuracy: number;
  badges: string[];
};

export type ScoreEmailTemplateData = ScoreEmailPayload & {
  date: string;
};

const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[
        character
      ] ?? character,
  );

export const createScoreEmailSubject = (payload: ScoreEmailTemplateData) =>
  `Resultado EduGame • ${payload.subject} • ${payload.studentName}`;

export const createScoreEmailText = (payload: ScoreEmailTemplateData) => {
  const badgeText = payload.badges.length
    ? payload.badges.map((badge) => `• ${badge}`).join("\n")
    : "Sem badges nesta rodada";

  return `Resultado EduGame - ${payload.subject}\n\n` +
    `Aluno: ${payload.studentName}\n` +
    `Professor: ${payload.teacherName}\n` +
    `Disciplina: ${payload.subject}\n` +
    `Data: ${payload.date}\n\n` +
    `Pontos: ${payload.score}\n` +
    `Acertos: ${payload.correct}/${payload.total}\n` +
    `Aproveitamento: ${payload.accuracy}%\n\n` +
    `Badges conquistados:\n${badgeText}\n\n` +
    `Parabéns pelo progresso no EduGame Carapicuíba!`;
};

export const createScoreEmailHtml = (payload: ScoreEmailTemplateData) => {
  const studentName = escapeHtml(payload.studentName);
  const teacherName = escapeHtml(payload.teacherName);
  const subject = escapeHtml(payload.subject);
  const date = escapeHtml(payload.date);
  const badgesHtml = payload.badges.length
    ? payload.badges.map((badge) => `<li>${escapeHtml(badge)}</li>`).join("")
    : `<li>Sem badges nesta rodada</li>`;

  return `<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Resultado EduGame</title>
    <style>
      body { margin: 0; padding: 0; font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; background: #f5f8ff; color: #0f172a; }
      .wrapper { width: 100%; background: #f5f8ff; padding: 24px 16px; }
      .card { width: 100%; max-width: 720px; margin: 0 auto; border-radius: 28px; overflow: hidden; background: #ffffff; box-shadow: 0 26px 80px rgba(15, 23, 42, 0.12); }
      .hero { padding: 32px 28px; background: linear-gradient(135deg, #2b68ff 0%, #7ac7ff 42%, #ffd78f 100%); color: #0f172a; }
      .hero h1 { margin: 0; font-size: 32px; line-height: 1.05; letter-spacing: -0.03em; }
      .hero p { margin: 16px 0 0; font-size: 16px; line-height: 1.75; opacity: 0.92; }
      .badge { display: inline-block; margin-bottom: 18px; padding: 10px 16px; border-radius: 999px; background: rgba(255,255,255,0.75); color: #102a4b; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.14em; }
      .content { padding: 28px; }
      .section-title { margin: 0 0 12px; font-size: 14px; font-weight: 700; color: #475569; letter-spacing: 0.14em; text-transform: uppercase; }
      .summary { display: flex; flex-wrap: wrap; gap: 16px; margin: 18px 0 28px; }
      .summary-item { flex: 1 1 160px; min-width: 160px; border-radius: 22px; background: #f8fafc; padding: 18px 16px; }
      .summary-item strong { display: block; font-size: 28px; line-height: 1; color: #0f172a; margin-bottom: 6px; }
      .summary-item span { display: block; font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.12em; }
      .table { width: 100%; border-collapse: collapse; margin-top: 10px; }
      .table td { padding: 12px 0; border-bottom: 1px solid #e2e8f0; }
      .table td.label { width: 140px; color: #64748b; font-size: 13px; vertical-align: top; }
      .table td.value { color: #0f172a; font-size: 15px; vertical-align: top; }
      .badges { margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 10px; list-style: none; }
      .badges li { display: inline-flex; align-items: center; justify-content: center; padding: 10px 14px; border-radius: 999px; background: #e2e8f0; color: #0f172a; font-size: 13px; }
      .footer { margin-top: 28px; padding: 22px; background: #f8fafc; border-radius: 20px; }
      .footer p { margin: 0; font-size: 14px; line-height: 1.75; color: #475569; }
      @media (max-width: 600px) {
        .hero { padding: 24px 20px; }
        .content { padding: 22px; }
        .summary { flex-direction: column; }
      }
    </style>
  </head>
  <body>
    <div class="wrapper">
      <div class="card">
        <div class="hero">
          <span class="badge">Resultado do jogo</span>
          <h1>Relatório de ${subject}</h1>
          <p>O aluno <strong>${studentName}</strong> completou a rodada em ${date}. Veja abaixo o desempenho.</p>
        </div>
        <div class="content">
          <p class="section-title">Resumo geral</p>
          <div class="summary">
            <div class="summary-item">
              <strong>${payload.score}</strong>
              <span>Pontos</span>
            </div>
            <div class="summary-item">
              <strong>${payload.correct}/${payload.total}</strong>
              <span>Acertos</span>
            </div>
            <div class="summary-item">
              <strong>${payload.accuracy}%</strong>
              <span>Aproveitamento</span>
            </div>
          </div>

          <p class="section-title">Detalhes da rodada</p>
          <table class="table">
            <tr>
              <td class="label">Aluno</td>
              <td class="value">${studentName}</td>
            </tr>
            <tr>
              <td class="label">Professor</td>
              <td class="value">${teacherName}</td>
            </tr>
            <tr>
              <td class="label">Disciplina</td>
              <td class="value">${subject}</td>
            </tr>
            <tr>
              <td class="label">Data</td>
              <td class="value">${date}</td>
            </tr>
          </table>

          <div class="footer">
            <p class="section-title">Badges conquistados</p>
            <ul class="badges">
              ${badgesHtml}
            </ul>
            <p>Parabéns por acompanhar o progresso no EduGame Carapicuíba. Esse resultado mostra onde o aluno se destacou e onde pode melhorar nas próximas atividades.</p>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>`;
};
