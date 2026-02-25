import { useNavigate, useParams } from "react-router-dom";
import { quizzes } from "../quiz-data/quiz-data";
import { useState } from "react";
import { useEffect } from "react";
import { ScoreCard } from "./score-card";
import '../styles/quiz.css'

export function Quiz() {
    const navigate = useNavigate()
    const { quizId } = useParams()
    let quiz = quizzes.find((quiz) => quiz.quizId == quizId)
    
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [rightNavButton, setRightNavButton] = useState(["Next", gotoNext])
    const [userAnswers, setUserAnswers] = useState( Array(quiz.questionsList.length).fill(null))
    const [submitted, setSubmitted] = useState(false)
    const [checkDisplay, setCheckDisplay] = useState(Array(quiz.questionsList.length).fill(null))
    let correctAnswers = quiz.questionsList.map((question) => question.correctIndex)
    let score = null
    const totalQuestions = quiz.questionsList.length
    

    

    function gotoPrev() {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1)
        }
    }

    function gotoNext() {
        if (currentQuestionIndex < quiz.questionsList.length - 1 ) {
            setCurrentQuestionIndex(currentQuestionIndex + 1)
        } else {

        }
    }

    function selectAnswer(answer, index) {
        setUserAnswers((currentAnswers) => {
            let temp = [...currentAnswers]
            temp[index] = answer
            return temp
        })
    }

    function checkAnswer() {
        let nullIndex = userAnswers.indexOf(null)
        console.log(userAnswers)
        console.log(nullIndex)
        if (nullIndex !== -1) {
            console.log("Not Finished")
            setCurrentQuestionIndex(nullIndex)
        } else {
            setCheckDisplay(correctAnswers.map((correctAnswer, index) => {
                if (correctAnswer === userAnswers[index]) {
                    return correctAnswer
                }

                else {
                    return [correctAnswer, userAnswers[index]]
                }
            }))
            setSubmitted(true)
        }
    }

    useEffect(() => {
        if (currentQuestionIndex === quiz.questionsList.length-1) {
            setRightNavButton([checkDisplay.includes(null) ? "Submit" : "See Score", checkAnswer])
        } else {
            setRightNavButton(["Next", gotoNext])
        }
    }, [currentQuestionIndex, userAnswers])


    if (submitted == true) {
        console.log(checkDisplay)
        score = checkDisplay.filter(item => Number.isInteger(item)).length
        return <ScoreCard score={score} total={totalQuestions} setSubmitted={setSubmitted} setCurrentQuestionIndex={setCurrentQuestionIndex}/>
    }

    return (
        <>
            <div className="quiz-container">
                <button onClick={() => navigate(-1)} className="back-btn">x</button>
                <div>
                    <h2>{quiz.quizTitle}</h2>
                </div>
                <div className="question-container">
                    <div className="question-sentence-container">
                        <h3>{quiz.questionsList[currentQuestionIndex].questionSentence}</h3>
                    </div>
                    <div className="progress-container">
                        <div className="progress-bar">
                            <p>Question {currentQuestionIndex+1} of {quiz.questionsList.length}</p>
                        </div>
                    </div>
                    <div className="choices-container">
                        {
                            checkDisplay.includes(null) ? (
                                quiz.questionsList[currentQuestionIndex].questionChoices.map((choice, index) => {
                            return (
                                <button key={index}
                                style={{ 
                                    backgroundColor: (userAnswers[currentQuestionIndex] === index ? `#53504c` : `#363636`)
                                }} onClick={() => selectAnswer(index, currentQuestionIndex)}>{choice}</button>
                            )
                        })
                            ) : (
                                quiz.questionsList[currentQuestionIndex].questionChoices.map((choice, index) => {
                            return (
                                <button key={index}
                                style={{ 
                                    backgroundColor: (Number.isInteger(checkDisplay[currentQuestionIndex]) ? (checkDisplay[currentQuestionIndex] === index ? `#5AAD69` : `#363636`) : (checkDisplay[currentQuestionIndex][0] === index ? `#3F6B47` : userAnswers[currentQuestionIndex] === index ? `#632F2F` : `#363636`))
                                }} >{choice}</button>
                            )
                        })
                            )
                        }
                        
                    </div>
                </div>
                <div className="navigation-container">
                        <button disabled={currentQuestionIndex === 0} onClick={() => gotoPrev()}>Previous</button>
                        <button onClick={rightNavButton[1]}>{rightNavButton[0]}</button>
                </div>
            </div>
        </>
    )
}