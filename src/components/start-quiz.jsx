import { quizzes } from "../quiz-data/quiz-data"
import { useNavigate } from "react-router-dom"


export function Start() {
    const navigate = useNavigate()
    return (
        <div>
            {quizzes.map((quiz) => {
                return (
                    <div key={quiz.quizId} className="quiz-item">
                        <h2>{quiz.quizTitle}</h2>
                        <h4>{quiz.questionsList.length} Items</h4>
                        <button onClick={() => navigate(`quiz/${quiz.quizId}`)}>Start Quiz</button>
                        <hr />
                    </div>

                )
                
            })}
            
        </div>
    )
}