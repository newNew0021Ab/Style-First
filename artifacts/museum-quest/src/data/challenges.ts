import { Waves, Snowflake, Flame, Lightbulb, Skull, HelpCircle, Bird, Fish } from 'lucide-react';

export interface Challenge {
  id: number;
  question: string;
  riddle?: string;
  icon: React.ElementType;
  choices: string[];
  correctAnswer: string;
}

export const challenges: Challenge[] = [
  {
    id: 1,
    question: "Найди работу, где много синего и лазурного цвета",
    icon: Waves,
    choices: ["«Дельфин»", "«Полёт над облаками»", "«Котик в Заполярье»"],
    correctAnswer: "«Котик в Заполярье»"
  },
  {
    id: 2,
    question: "Найди работу, где сугробы и вьюга",
    icon: Snowflake,
    choices: ["«На батуте»", "«Котик в Заполярье»", "«Моя лошадка»"],
    correctAnswer: "«Котик в Заполярье»"
  },
  {
    id: 3,
    question: "Найди работу, где изображён герой мистических сказок. Он соединяет в себе пламя и крылья.",
    icon: Flame,
    choices: ["«История про Кащея»", "«Застолье у Божьей Коровки»", "«Он Дракон»"],
    correctAnswer: "«Он Дракон»"
  },
  {
    id: 4,
    question: "Отгадай загадку и найди работу, где изображён ответ",
    riddle: "Его держу за поводок,\nхотя он вовсе не щенок.\nА он сорвался с поводка\nи улетел под облака.",
    icon: Lightbulb,
    choices: ["«Полёт над облаками»", "«На батуте»", "«Моя лошадка»"],
    correctAnswer: "«Полёт над облаками»"
  },
  {
    id: 5,
    question: "Найди работу с героем, который прячет иглу в яйце. А смерти у него нет, зато есть сундук и дуб.",
    icon: Skull,
    choices: ["«Енотик»", "«Он Дракон»", "«История про Кащея»"],
    correctAnswer: "«История про Кащея»"
  },
  {
    id: 6,
    question: "Угадай, про какую картину идёт речь",
    riddle: "Какая коровка, скажите, пока\nещё никому не дала молока?",
    icon: HelpCircle,
    choices: ["«Моя лошадка»", "«Застолье у Божьей Коровки»", "«Котик в Заполярье»"],
    correctAnswer: "«Застолье у Божьей Коровки»"
  },
  {
    id: 7,
    question: "Найди работу, которая отвечает на вопрос: от чего собаки не летают, как птицы?",
    icon: Bird,
    choices: ["«На батуте»", "«Он Дракон»", "«Полёт над облаками»"],
    correctAnswer: "«На батуте»"
  },
  {
    id: 8,
    question: "Найди работу, где изображён зверёк, который любит полоскать всё в воде.",
    icon: Fish,
    choices: ["«Котик в Заполярье»", "«Застолье у Божьей Коровки»", "«Енотик»"],
    correctAnswer: "«Енотик»"
  }
];
