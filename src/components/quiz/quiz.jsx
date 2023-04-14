import { useState } from 'react';
import styles from './quiz.module.css';

// function Quiz({ quizData}) {
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [selectedOption, setSelectedOption] = useState('');
//   const [score, setScore] = useState(0);

//   const handleOptionChange = (event) => {
//     setSelectedOption(event.target.value);
//   };

//   const handleNextQuestion = () => {
//     // Check if the selected answer is correct and update score
//     if (selectedOption === quizData.questions[currentQuestionIndex].correctAnswer) {
//       setScore(score + quizData.points);
//     }

//     // Move to the next question
//     if (currentQuestionIndex < quizData.questions.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//       setSelectedOption('');
//     } else {
//       // End of quiz
//       alert(`Your score is ${score} out of ${quizData.questions.length * quizData.points}`);
//     }
//   };

//   return (
//     <div className={styles.quiz}>
//       <h1>
//         {quizData.quizName}
//         </h1>
//       <p>
//         {quizData.description}
//       </p>
//       {currentQuestionIndex < quizData.questions.length ? (
//         <>
//           <h2>Question {currentQuestionIndex + 1}</h2>
//           <p>{quizData.questions[currentQuestionIndex].prompt}</p>
//           <form>
//             <ul>
//               {quizData.questions[currentQuestionIndex].options.map((option, optionIndex) => (
//                 <li key={optionIndex}>
//                   <input
//                     type="radio"
//                     id={`option-${optionIndex}`}
//                     name="option"
//                     value={option}
//                     checked={selectedOption === option}
//                     onChange={handleOptionChange}
//                     required
//                   />
//                   <label htmlFor={`option-${optionIndex}`}>{option}</label>
//                 </li>
//               ))}
//             </ul>
//             <button type="button" onClick={handleNextQuestion}>
//               {currentQuestionIndex < quizData.questions.length - 1 ? 'Next' : 'Finish'}
//             </button>
//           </form>
//         </>
//       ) : (
//         <p>No questions available for this quiz.</p>
//       )}
//     </div>
//   );
// }

const Quiz = () => {
  const questions = [
    {
      question: "What is the capital of France?",
      answers: [
        { answerText: "Paris", isCorrect: true },
        { answerText: "Madrid", isCorrect: false },
        { answerText: "London", isCorrect: false },
        { answerText: "Rome", isCorrect: false },
      ],
    },
    {
      question: "What is the largest country in the world?",
      answers: [
        { answerText: "China", isCorrect: false },
        { answerText: "Russia", isCorrect: true },
        { answerText: "India", isCorrect: false },
        { answerText: "United States", isCorrect: false },
      ],
    },
    {
      question: "What is the most populous black country in the world?",
      answers: [
        { answerText: "Nigeria", isCorrect: false },
        { answerText: "London", isCorrect: true },
        { answerText: "Kenya", isCorrect: false },
        { answerText: "South-Africa", isCorrect: false },
      ],
    },
    
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleAnswerButtonClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className='quiz'>
      {showScore ? (
        <div className='quiz-score'>
          You scored {score} out of {questions.length}.
        </div>
      ) : (
        <>
          <div className={styles.quizQuestion}>
            {questions[currentQuestion].question}
          </div>
          <div className={styles.quizAnswers}>
            {questions[currentQuestion].answers.map((answer) => (
              <button
                key={answer.answerText}
                onClick={() => handleAnswerButtonClick(answer.isCorrect)}
              >
                {answer.answerText}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;


