// src/lib/questions.ts
export type Question = {
  id: number;
  subject: "math" | "port";
  question: string;
  options: string[];
  correct: number; 
};

export const questions: Question[] = [

  {
    id: 1,
    subject: "math",
    question: "Quanto é 7 × 8?",
    options: ["48", "56", "64", "72"],
    correct: 1,
  },
  {
    id: 2,
    subject: "math",
    question: "Qual é a raiz quadrada de 144?",
    options: ["10", "11", "12", "13"],
    correct: 2,
  },
  {
    id: 10,
    subject: "port",
    question: 'Qual é o plural de "cidadão"?',
    options: ["cidadãos", "cidadões", "cidadães", "cidadãos"],
    correct: 0,
  },

];