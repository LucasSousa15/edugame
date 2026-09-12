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

Para habilitar o envio por e-mail, crie um `.env.local` na raiz:

```text
RESEND_API_KEY=sua_chave
RESEND_FROM_EMAIL=EduGame <remetente@dominio-verificado.com>
RESULT_RECIPIENT_EMAIL=professor@escola.com
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Use `.env.example` como referência e nunca envie credenciais ao Git. O destinatário é fixado no servidor para impedir que uma implantação pública seja usada para enviar mensagens a endereços arbitrários. Sem as três variáveis do Resend, o quiz e o ranking local continuam funcionando; apenas o envio por e-mail informa que a configuração está ausente.

## Validação técnica

```bash
npm run lint
npm run typecheck
npm run build
```

O projeto usa Next.js 16 App Router, React 19, TypeScript e Tailwind CSS 4. A API de e-mail é um Route Handler em `src/app/api/email/route.ts`; as credenciais permanecem no servidor.

## Publicar na Vercel

O projeto está pronto para o fluxo Git + Vercel. Depois de criar manualmente o repositório remoto, envie a branch, importe o projeto na Vercel e cadastre as variáveis de ambiente. O guia completo, incluindo a configuração do Resend e o checklist pós-deploy, está em [docs/DEPLOY_VERCEL.md](docs/DEPLOY_VERCEL.md).

## Limite acadêmico conhecido

O protótipo comprova desenvolvimento técnico, mas não foi aplicado em uma escola municipal e não possui evidências de participação ou impacto comunitário. O relatório final registra essa lacuna sem fabricar dados. Para atender integralmente ao manual seria necessário realizar uma sessão real, obter autorização, registrar evidências e avaliar os resultados.

Consulte [docs/CRITERIOS.md](docs/CRITERIOS.md) para a matriz de conformidade e [docs/EVIDENCIAS.md](docs/EVIDENCIAS.md) para o roteiro de comprovação e entrega.
