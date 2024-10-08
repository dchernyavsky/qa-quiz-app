import React from "react";
import dataGpt from "./dataGpt.json";
import dataLlama from "./dataLlama.json";

export const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = React.useState(0); // индекс текущего вопроса
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]); // выбранные варианты
  const [showAnswer, setShowAnswer] = React.useState(false); // показывать ли правильный ответ
  const [isCorrect, setIsCorrect] = React.useState<boolean | null>(null); // правильность ответа
  const quizData = React.useMemo(
    () => (Math.random() > 0.5 ? dataGpt : dataLlama),
    []
  ); // данные для теста
  const [correctAnswerCount, setCorrectAnswerCount] = React.useState(0);

  const handleOptionChange = (option: string) => {
    setSelectedOptions([option]); // для одного ответа
  };

  const checkAnswer = () => {
    const correct = quizData[currentQuestion].correctAnswer.every((ans) =>
      selectedOptions.includes(ans)
    );
    setCorrectAnswerCount(
      (correctAnswerCount) => correctAnswerCount + (correct ? 1 : 0)
    );
    setIsCorrect(correct);
    setShowAnswer(true);
  };

  const nextQuestion = () => {
    setShowAnswer(false);
    setIsCorrect(null);
    setSelectedOptions([]);
    setCurrentQuestion((prev) => prev + 1);
  };

  return (
    <div className="quiz-container">
      {currentQuestion < quizData.length ? (
        <>
          <h2>
            Вопрос {currentQuestion + 1} из {quizData.length}
          </h2>
          <p>{quizData[currentQuestion].question}</p>
          <div className="options">
            {quizData[currentQuestion].options.map((option, index) => (
              <label key={index}>
                <input
                  type="radio"
                  name="option"
                  value={option}
                  checked={selectedOptions.includes(option)}
                  onChange={() => handleOptionChange(option)}
                />
                {option}
              </label>
            ))}
          </div>
          {showAnswer ? (
            <>
              {isCorrect ? (
                <p className="correct">Правильно!</p>
              ) : (
                <p className="incorrect">
                  Неправильно! Правильный ответ:{" "}
                  {quizData[currentQuestion].correctAnswer.join(", ")}
                </p>
              )}
              <button onClick={nextQuestion}>
                {currentQuestion + 1 === quizData.length
                  ? "Завершить квиз"
                  : "Следующий вопрос"}
              </button>
            </>
          ) : (
            <>
              <p> </p>
              <button onClick={checkAnswer}>Ответить</button>
            </>
          )}
        </>
      ) : (
        <>
          <h2>Квиз завершен!</h2>
          <h3>{`Правильные ответы ${correctAnswerCount} из ${quizData.length}`}</h3>
        </>
      )}
    </div>
  );
};
