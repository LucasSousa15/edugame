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
    question: "Quanto é 15 + 27?",
    options: ["42", "52", "32", "40"],
    correct: 0,
  },
  {
    id: 2,
    subject: "math",
    question: "Se 3x = 21, qual é o valor de x?",
    options: ["5", "6", "7", "8"],
    correct: 2,
  },
  {
    id: 3,
    subject: "math",
    question: "Qual é a área de um retângulo de 5 metros de comprimento por 3 metros de largura?",
    options: ["8 m²", "15 m²", "10 m²", "16 m²"],
    correct: 1,
  },
  {
    id: 4,
    subject: "math",
    question: "Quanto é 2 elevado à quarta potência (2⁴)?",
    options: ["8", "12", "16", "32"],
    correct: 2,
  },
  {
    id: 5,
    subject: "math",
    question: "Qual é o resultado de 1000 ÷ 25?",
    options: ["25", "40", "50", "20"],
    correct: 1,
  },
  {
    id: 6,
    subject: "math",
    question: "Qual é o perímetro de um quadrado cujo lado mede 6 cm?",
    options: ["12 cm", "18 cm", "24 cm", "36 cm"],
    correct: 2,
  },
  {
    id: 7,
    subject: "math",
    question: "Quanto é 30% de 200?",
    options: ["30", "60", "50", "70"],
    correct: 1,
  },
  {
    id: 8,
    subject: "math",
    question: "Qual é o valor de 12²?",
    options: ["124", "144", "134", "154"],
    correct: 1,
  },
  {
    id: 9,
    subject: "math",
    question: "Qual é a raiz quadrada de 81?",
    options: ["7", "8", "9", "10"],
    correct: 2,
  },
  {
    id: 10,
    subject: "math",
    question: "Quanto é 1/2 + 1/3?",
    options: ["2/5", "5/6", "2/6", "3/5"],
    correct: 1, 
  },

  
  {
    id: 11,
    subject: "port",
    question: 'Qual é o sinônimo de "feliz"?',
    options: ["Triste", "Alegre", "Bravo", "Cansado"],
    correct: 1,
  },
  {
    id: 12,
    subject: "port",
    question: 'Qual é o antônimo de "grande"?',
    options: ["Enorme", "Pequeno", "Largo", "Alto"],
    correct: 1,
  },
  {
    id: 13,
    subject: "port",
    question: 'Qual é o plural de "cidadão"?',
    options: ["cidadãos", "cidadões", "cidadães", "cidadãos"],
    correct: 0, 
  },
  {
    id: 14,
    subject: "port",
    question: 'Qual é a separação silábica correta da palavra "pássaro"?',
    options: ["pás-sa-ro", "pá-sa-ro", "pás-sar-o", "pa-ssa-ro"],
    correct: 0, 
  },
  {
    id: 15,
    subject: "port",
    question: 'Qual das palavras abaixo está escrita corretamente?',
    options: ["Excessão", "Exceção", "Eceção", "Exesão"],
    correct: 1, 
  },
  {
    id: 16,
    subject: "port",
    question: 'Complete a frase: "Estudei muito, _____ não passei."',
    options: ["mais", "mas", "más", "mais"],
    correct: 1, 
  },
  {
    id: 17,
    subject: "port",
    question: 'Qual é o feminino de "cavaleiro"?',
    options: ["Cavaleira", "Cavaleiroa", "Cavala", "Amazona"],
    correct: 0, 
  },
  {
    id: 18,
    subject: "port",
    question: 'Qual é o superlativo absoluto sintético de "bom"?',
    options: ["Beníssimo", "Bondoso", "Ótimo", "Boníssimo"],
    correct: 2, 
  },
  {
    id: 19,
    subject: "port",
    question: 'Qual a classe gramatical da palavra "rapidamente"?',
    options: ["Adjetivo", "Advérbio", "Substantivo", "Verbo"],
    correct: 1, 
  },
  {
    id: 20,
    subject: "port",
    question: 'Na frase "O menino correu", qual é o sujeito?',
    options: ["O", "menino", "correu", "O menino"],
    correct: 1, 
    
  },
];