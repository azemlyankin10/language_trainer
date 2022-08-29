import { MongoClient } from "mongodb"

const URI = process.env.DB_URI || ''

const clientPromise = MongoClient.connect(URI)

export const connectDB = async () => {
  const client = await clientPromise
  return client.db("english")
}