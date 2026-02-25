import { useNavigate } from "react-router-dom"


export function ScoreCard({ score, total, setSubmitted, setCurrentQuestionIndex }) {
    const navigate = useNavigate()

    function returnToAnswers() {
        setCurrentQuestionIndex(0)
        setSubmitted(false)
    }

    return (
        <div className="score-container">
            <h3>Your Score!</h3>
            <h2>{score} / {total}</h2>
                <button onClick={() => returnToAnswers()}>See Correct Answers</button>
                <button onClick={() => window.location.reload()}>Retry</button>
                <button onClick={() => navigate(-1)}>Exit</button>
        </div>
    )
}