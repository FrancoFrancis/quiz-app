


"use client"
import styles from "./quizForm.module.css";
import { firestore } from "../../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useState } from "react";

export default function NewQuizForm() {
  const [quizName, setQuizName] = useState("");
  const [quizDescription, setQuizDescription] = useState("");
  const [pointsSystem, setPointsSystem] = useState("");
  const [timeLimit, setTimeLimit] = useState(0);
  const [questions, setQuestions] = useState([{ prompt: "", options: [] }]);
  const [newOption, setNewOption] = useState("");

  const handleQuestionChange = (event, questionIndex) => {
    const { name, value } = event.target;

    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[questionIndex][name] = value;
      return updatedQuestions;
    });
  };

  const handleOptionChange = (event, questionIndex, optionIndex) => {
    const { value } = event.target;

    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[questionIndex].options[optionIndex] = value;
      return updatedQuestions;
    });
  };

  const handleNewOptionChange = (event) => {
    setNewOption(event.target.value);
  };

  // handle add option
  const handleAddOption = (questionIndex) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[questionIndex].options.push(newOption);
      setNewOption("");
      return updatedQuestions;
    });
  };

  // handle delete option
  const handleDeleteOption = (questionIndex, optionIndex) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[questionIndex].options.splice(optionIndex, 1);
      return updatedQuestions;
    });
  };

  // hndle add question
  const handleAddQuestion = () => {
    setQuestions((prevQuestions) => [
      ...prevQuestions,
      { prompt: "", options: [] },
    ]);
  };
// handle delete question
  const handleDeleteQuestion = (questionIndex) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions.splice(questionIndex, 1);
      return updatedQuestions;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const quizRef = await addDoc(collection(firestore, "quizzes"), {
        quizName,
        description: quizDescription,
        points: pointsSystem,
        timeLimit,
        createdAt: serverTimestamp(),
        questions: questions.map((question) => {
          return {
            prompt: question.prompt,
            options: question.options,
          };
        }),
      });
      console.log("Quiz created with ID: ", quizRef.id);
      // TODO: Redirect to the quiz page
    } catch (error) {
      console.error("Error creating quiz: ", error);
    }
  };

  return (
       <div div className={styles.app}>
         <form onSubmit={handleSubmit} className={styles.form}>
           <label className={styles.label}>
             Quiz Name:
             <input
               type="text"
               value={quizName}
               onChange={(event) => setQuizName(event.target.value)}
               className={styles.input}
             />
           </label>
           <br />
           <label className={styles.label}>
             Description:
             <textarea
               value={quizDescription}
               onChange={(event) => setQuizDescription(event.target.value)}
               className={styles.input}
             />
           </label>
           <br />
           <label className={styles.label}>
             Points/Grading System:
             <input
               type="text"
               value={pointsSystem}
               onChange={(event) => setPointsSystem(event.target.value)}
              className={styles.input}
            />
          </label>
          <br />
          <label className={styles.label}>
            Time Limit (in minutes):
            <input
              type="number"
              value={timeLimit}
              onChange={(event) => setTimeLimit(parseInt(event.target.value))}
              className={styles.input}
            />
          </label>
          <br />
          <br />
          <button type="submit" className={styles.submitButton}>
            Create Quiz
          </button>
        </form>
    
          <div className={styles.questionsContainer}>
            {questions.map((question, questionIndex) => (
              <div key={questionIndex} className={styles.question}>
                <label className={styles.label}>
                  Question Prompt:
                  <input
                    type="text"
                    name="prompt"
                    value={question.prompt}
                    onChange={(event) => handleQuestionChange(event, questionIndex)}
                    className={styles.input}
                  />
                </label>
                <br />
                <label className={styles.label}>
                  Answer Options:
                  <ul className={styles.optionsList}>
                    {question.options.map((option, optionIndex) => (
                      <li key={optionIndex} className={styles.option}>
                        <input
                          type="text"
                          value={option}
                          onChange={(event) =>
                            handleOptionChange(event, questionIndex, optionIndex)
                          }
                          className={styles.input}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            handleDeleteOption(questionIndex, optionIndex)
                          }
                          className={styles.deleteOptionButton}
                        >
                          Delete
                        </button>
                      </li>
                    ))}
                  </ul>
                  <input
                    type="text"
                    value={newOption}
                    onChange={handleNewOptionChange}
                    className={styles.input}
                  />
                  <button
                    type="button"
                    onClick={() => handleAddOption(questionIndex)}
                    className={styles.addOptionButton}
                  >
                    Add Option
                  </button>
                </label>
                <br />
                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(questionIndex)}
                  className={styles.deleteQuestionButton}
                >
                  Delete Question
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddQuestion}
            className={styles.addQuestionButton}
          >
            Add Question
          </button>
        </div>
    
        </div>
      );



  }

