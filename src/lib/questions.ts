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
    question: "Quanto é 5 + 3?",
    options: ["6", "7", "8", "9"],
    correct: 2,
  },
  {
    id: 2,
    subject: "math",
    question: "Quanto é 10 - 4?",
    options: ["4", "5", "6", "7"],
    correct: 2,
  },
  {
    id: 3,
    subject: "math",
    question: "Quanto é 2 + 7?",
    options: ["8", "9", "10", "11"],
    correct: 1,
  },
  {
    id: 4,
    subject: "math",
    question: "Quanto é 3 × 4?",
    options: ["7", "10", "12", "14"],
    correct: 2,
  },
  {
    id: 5,
    subject: "math",
    question: "Quanto é 20 ÷ 5?",
    options: ["2", "3", "4", "5"],
    correct: 2,
  },
  {
    id: 6,
    subject: "math",
    question: "Qual número vem depois do 29?",
    options: ["28", "30", "31", "39"],
    correct: 1,
  },
  {
    id: 7,
    subject: "math",
    question: "Qual número é maior?",
    options: ["12", "21", "8", "15"],
    correct: 1,
  },
  {
    id: 8,
    subject: "math",
    question: "Quantos lados tem um triângulo?",
    options: ["2", "3", "4", "5"],
    correct: 1,
  },
  {
    id: 9,
    subject: "math",
    question: "Maria tinha 6 balas e ganhou mais 4. Quantas balas ela tem agora?",
    options: ["8", "9", "10", "11"],
    correct: 2,
  },
  {
    id: 10,
    subject: "math",
    question: "João tinha 15 carrinhos e perdeu 5. Com quantos carrinhos ele ficou?",
    options: ["5", "10", "15", "20"],
    correct: 1,
  },
  {
    id: 11,
    subject: "port",
    question: 'Qual é o contrário de "feliz"?',
    options: ["Alegre", "Triste", "Animado", "Contente"],
    correct: 1,
  },
  {
    id: 12,
    subject: "port",
    question: 'Qual é o plural de "gato"?',
    options: ["Gatoes", "Gatos", "Gatões", "Gatas"],
    correct: 1,
  },
  {
    id: 13,
    subject: "port",
    question: "Qual palavra começa com a letra B?",
    options: ["Casa", "Bola", "Dado", "Foca"],
    correct: 1,
  },
  {
    id: 14,
    subject: "port",
    question: 'Qual palavra rima com "pato"?',
    options: ["Gato", "Casa", "Bola", "Mesa"],
    correct: 0,
  },
  {
    id: 15,
    subject: "port",
    question: "Qual destas palavras é o nome de um animal?",
    options: ["Mesa", "Escola", "Cachorro", "Janela"],
    correct: 2,
  },
  {
    id: 16,
    subject: "port",
    question: 'Complete a frase: "O peixe nada no _____."',
    options: ["Céu", "Chão", "Mar", "Telhado"],
    correct: 2,
  },
  {
    id: 17,
    subject: "port",
    question: 'Quantas sílabas tem a palavra "boneca"?',
    options: ["1", "2", "3", "4"],
    correct: 2,
  },
  {
    id: 18,
    subject: "port",
    question: "Qual destas palavras está escrita corretamente?",
    options: ["Caza", "Kasa", "Casa", "Cassa"],
    correct: 2,
  },
  {
    id: 19,
    subject: "port",
    question: 'Na frase "A menina pulou", quem pulou?',
    options: ["A menina", "Pulou", "A", "Ninguém"],
    correct: 0,
  },
  {
    id: 20,
    subject: "port",
    question: "Qual sinal usamos no final de uma pergunta?",
    options: [".", ",", "!", "?"],
    correct: 3,
  },
];