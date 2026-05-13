export interface Result {
  id: string;
  title: string;
  description: string;
  color: string;
  emoji: string;
}

export const results: Result[] = [
  {
    id: "art-critic",
    title: "Юный искусствовед",
    description: "Ты замечаешь цвет, настроение и детали, которые другие пропускают мимо. Тебе место в жюри!",
    color: "#3D1A6E",
    emoji: "🎨"
  },
  {
    id: "fairy-tale",
    title: "Знаток сказок",
    description: "Кащей, Дракон, волшебство — всё это твоё! Ты знаешь каждую сказку наизусть и сразу узнал героев на картинах.",
    color: "#FF6B6B",
    emoji: "🐉"
  },
  {
    id: "riddle-solver",
    title: "Разгадыватель загадок",
    description: "Загадки тебя не пугают — ты разгадываешь их с лёту. Настоящий детектив выставки в ТРК TRINITI!",
    color: "#7C3AED",
    emoji: "🔍"
  },
  {
    id: "animal-friend",
    title: "Друг зверей",
    description: "Дельфин, Котик, Енотик, Лошадка — все зверята выставки твои лучшие друзья. Ты чувствуешь каждый пушистый хвостик!",
    color: "#059669",
    emoji: "🐾"
  },
  {
    id: "dreamer",
    title: "Мечтатель облаков",
    description: "Ты смотришь выше других — прямо в облака. Твои мечты самые высокие, как полёт над выставкой!",
    color: "#F5A623",
    emoji: "☁️"
  }
];

export const getResult = (answers: string[]): string => {
  // Юный искусствовед: correctly found blue painting (Котик в Заполярье for Q1)
  if (answers[0] === "«Котик в Заполярье»") return "art-critic";

  // Знаток сказок: found the Dragon or Koshchei
  if (answers[2] === "«Он Дракон»" || answers[4] === "«История про Кащея»") return "fairy-tale";

  // Разгадыватель загадок: solved balloon riddle or ladybug riddle correctly
  if (answers[3] === "«Полёт над облаками»" || answers[5] === "«Застолье у Божьей Коровки»") return "riddle-solver";

  // Друг зверей: found the raccoon
  if (answers[7] === "«Енотик»") return "animal-friend";

  // Default
  return "dreamer";
};
