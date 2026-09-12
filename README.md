# EduGame Carapicuíba

Protótipo web gamificado para reforço de Matemática e Língua Portuguesa no Ensino Fundamental, desenvolvido para a Atividade Extensionista II - Tecnologia Aplicada à Inclusão Digital, do CST em Análise e Desenvolvimento de Sistemas da UNINTER.

## O que está implementado

- 20 questões, divididas igualmente entre Matemática e Português;
- feedback imediato com explicação da resposta;
- pontuação, progresso visual e três níveis de badges;
- ranking dos 20 melhores resultados salvo somente no navegador;
- tela final com aproveitamento e registro do aluno;
- envio opcional do resultado ao professor configurado no servidor;
- interface responsiva e suporte a preferência por movimento reduzido.

O ranking local evita transmitir dados de crianças durante a demonstração. Ele não representa um ranking entre diferentes dispositivos ou escolas.

## Executar

Requisitos: Node.js 20 ou superior e npm.

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

Para habilitar o envio por e-mail sem domínio próprio, cadastre e verifique um remetente individual na Brevo e crie um `.env.local` na raiz:

```text
EMAIL_PROVIDER=brevo
BREVO_API_KEY=sua_chave
BREVO_SENDER_EMAIL=seu-email-verificado@gmail.com
BREVO_SENDER_NAME=EduGame Carapicuíba
RESULT_RECIPIENT_EMAIL=professor@escola.com
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Use `.env.example` como referência e nunca envie credenciais ao Git. O destinatário é fixado no servidor para impedir que uma implantação pública seja usada para enviar mensagens a endereços arbitrários. Sem as variáveis do provedor, o quiz e o ranking local continuam funcionando; apenas o envio por e-mail informa que a configuração está ausente. A integração anterior com Resend continua disponível com `EMAIL_PROVIDER=resend`.

## Validação técnica

```bash
npm run lint
npm run typecheck
npm run build
```

O projeto usa Next.js 16 App Router, React 19, TypeScript e Tailwind CSS 4. A API de e-mail é um Route Handler em `src/app/api/email/route.ts`; as credenciais permanecem no servidor.

## Publicar na Vercel

O projeto está pronto para o fluxo Git + Vercel. Envie a branch, importe o repositório na Vercel e cadastre as mesmas variáveis do `.env.example` em **Settings > Environment Variables**. Faça o primeiro deploy, copie a URL gerada para `NEXT_PUBLIC_SITE_URL` e execute um novo deploy para atualizar os metadados.

## CI/CD

O workflow `.github/workflows/ci.yml` executa `npm ci` e `npm run build` em pull requests e atualizações da branch `main`. O comando de build inclui lint e verificação TypeScript antes de gerar a aplicação de produção.

Com o repositório conectado à Vercel e `main` definida como **Production Branch**, cada push nessa branch dispara automaticamente um novo deploy. Branches e pull requests recebem deploys de Preview.

## Limite acadêmico conhecido

O protótipo comprova desenvolvimento técnico, mas não foi aplicado em uma escola municipal e não possui evidências de participação ou impacto comunitário. O relatório final registra essa lacuna sem fabricar dados. Para atender integralmente ao manual seria necessário realizar uma sessão real, obter autorização, registrar evidências e avaliar os resultados.
