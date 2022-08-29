import { atom } from "recoil";

export const userState = atom({
  key: 'userData',
  default: {
    id: null,
    username: '',
    sessionId: ''
  }
})

export const wordsCollectionState = atom({
  key: 'wordsCollection',
  default: []
})
