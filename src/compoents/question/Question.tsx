import { useState } from "react";
import { questions } from "../../services/data";
import "./question.scss"

 const Question=()=>{
    const [showAnswer, setShowAnswer]=useState<boolean[]>([])
    const handleShowAnswer=(i:number)=>{
    setShowAnswer(showAnswer=>{
          const updateShowQuestion=[...showAnswer]
          updateShowQuestion[i]= !updateShowQuestion[i]
          return updateShowQuestion
        })
      
    }
    return (
      <div className="QuestionA">
        <h2>Popular Questions</h2>
      {questions.map((item:any,i:number)=>(
        <div className="accordion" key={item.question} >
        <h3  onClick={()=>handleShowAnswer(i)}>{item.question}</h3>
        {showAnswer[i] && <p className="active-aws">{item.anwers}</p>}
  
        </div>
      ))}
      </div>
    )
  };
  export default Question