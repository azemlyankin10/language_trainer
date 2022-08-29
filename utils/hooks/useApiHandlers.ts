import { useSetRecoilState } from "recoil"
import { userState, wordsCollectionState } from "../../state/atoms"

export const useApiHandlers = () => {
  const setUserDateState = useSetRecoilState(userState)
  const setWordsCollection = useSetRecoilState(wordsCollectionState)

  const auth = async (formData: any, type: 'login' | 'signon' | 'logout') => {
    if(!formData) return
    if(type === 'logout') {
      await fetch('http://localhost:3000/api/auth', {
        method: 'POST',
        headers: {
          type,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sessionId: formData })
      })
      location.reload()
      return
    }
    const {username, password} = formData
    
    const res = await fetch('http://localhost:3000/api/auth', {
      method: 'POST',
      headers: {
        type,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password 
      })
    })
    const body = await res.json()
    location.reload()
    if(body.data !== 'error') {
      setUserDateState(body.data) 
    }
  }

  const addNewWord = async (word: string, translate: string, userId: string | null) => {
    const res = await fetch('http://localhost:3000/api/words', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ word, translate, userId })
    })
    const newWord = await res.json()
    if(newWord.word) {
      setWordsCollection((state) => state.concat(newWord.word))
    }
  }

  const getWordsCollection = async (userId: string) => {
    const res = await fetch('http://localhost:3000/api/words', {
      headers: { userId }
    })
    const data = await res.json()
    
    if(data.wordsCollection) {
      setWordsCollection(data.wordsCollection)
    }
  }


  return {auth, addNewWord, getWordsCollection}
}