import { useState } from "react"
import style from './Card.module.css'

export const Card = ({ word, translate }: { word: string, translate: string }) => {
  const [isShow, setIsShow] = useState(false)

  return (
    <button 
      className={`${style.card} ${isShow && style.showAnswer}`}
      onClick={() => setIsShow(!isShow)}
    >
      <div className={style.innerCard}>
        <div className={style.innerCardFront}>
          <p>{word}</p>
        </div>
        <div className={style.innerCardBack}>  
          <p>{translate}</p>
        </div>
      </div>
    </button>
  )
}