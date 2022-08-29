import { NextApiRequest, NextApiResponse } from "next"
import { connectDB } from "../../utils/db"

type getData = { word: string, translate: string, userId: string }

const createWord = async (db: any, { word, translate, userId }: getData) => {
  const res = await db.collection('words').insertOne({
    userId,
    word,
    translate,
    isStudied: false,
    progress: 0
  })
  return await db.collection('words').findOne({ _id: res.insertedId })
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const db = await connectDB()
  if(req.method === 'GET') {
    const userId = req.headers.userid
    const wordsCollection = await db.collection('words').find({ userId }).toArray()
    if(!wordsCollection) {
      return res.status(404).json({ error: 'notFound' })
    }
    return res.status(200).json({ wordsCollection })
  }
  if (req.method === 'POST') {
    const word = await createWord(db, req.body)
    return res.status(200).json({ word, error: '' })
  }
  return res.status(500)
}