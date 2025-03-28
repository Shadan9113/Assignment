const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const Question = require("./models/Question");

dotenv.config();
connectDB();

const seedData = async () => {
  try {
    await Question.deleteMany();

    // Questions array with proper order and unique timestamps
    const questions = [
      {
        text: "The ___ is the capital of ___. It is known for its ___ culture, famous for ___ and the ___ tower.",
        blanks: [1, 5, 10, 15, 18],
        correctAnswers: ["Paris", "France", "rich", "cuisine", "Eiffel"],
        options: ["Paris", "London", "France", "Germany", "rich", "modern", "cuisine", "fashion", "Eiffel", "Big Ben"]
      },
      {
        text: "The ___ is the largest planet in the solar system. It is known for its ___ atmosphere and ___ moons.",
        blanks: [1, 7, 12],
        correctAnswers: ["Jupiter", "gaseous", "79"],
        options: ["Jupiter", "Saturn", "gaseous", "stormy", "79", "53"]
      },
      {
        text: "Mount ___ is the highest peak in the world. It is located in the ___ mountain range and stands at ___ meters above sea level.",
        blanks: [1, 6, 11],
        correctAnswers: ["Everest", "Himalayas", "8848"],
        options: ["Everest", "K2", "Himalayas", "Andes", "8848", "8850"]
      },
      {
        text: "The process of converting water into vapor is called ___. It is a key step in the ___ cycle and helps in forming ___.",
        blanks: [7, 14, 20],
        correctAnswers: ["evaporation", "water", "clouds"],
        options: ["evaporation", "condensation", "water", "carbon", "clouds", "rain"]
      },
      {
        text: "The human heart has ___ chambers. The two upper chambers are called ___ and the two lower chambers are called ___.",
        blanks: [4, 10, 18],
        correctAnswers: ["four", "atria", "ventricles"],
        options: ["four", "two", "atria", "ventricles", "auricles", "valves"]
      },
      {
        text: "The Great Wall of ___ is one of the wonders of the world. It was built to protect against invasions from the ___.",
        blanks: [3, 12],
        correctAnswers: ["China", "Mongols"],
        options: ["China", "India", "Mongols", "Huns", "Japanese"]
      },
      {
        text: "The ___ is responsible for carrying oxygenated blood from the heart to the rest of the body. It is the largest ___ in the human body.",
        blanks: [1, 13],
        correctAnswers: ["aorta", "artery"],
        options: ["aorta", "vena cava", "artery", "vein", "capillary"]
      },
      {
        text: "The ___ is the fastest land animal, capable of reaching speeds up to ___ km/h.",
        blanks: [1, 10],
        correctAnswers: ["cheetah", "120"],
        options: ["cheetah", "leopard", "120", "100", "80"]
      },
      {
        text: "The Amazon ___ is the largest rainforest in the world. It is home to diverse ___ and helps regulate the global ___.",
        blanks: [2, 11, 19],
        correctAnswers: ["Rainforest", "species", "climate"],
        options: ["Rainforest", "Desert", "species", "tribes", "climate", "temperature"]
      },
      {
        text: "The ___ is the main organ responsible for filtering blood in the human body. It is essential for maintaining proper ___.",
        blanks: [1, 15],
        correctAnswers: ["kidney", "hydration"],
        options: ["kidney", "liver", "hydration", "digestion", "circulation"]
      }
    ];

    // Insert questions sequentially with proper ordering
    for (const question of questions) {
      await new Question(question).save();
    }

    console.log("✅ 10 Questions Seeded Successfully in Correct Order!");
    process.exit();
  } catch (error) {
    console.error("❌ Seeding Failed:", error);
    process.exit(1);
  }
};

seedData();