import { MongoClient, ObjectId } from 'mongodb';
import { nanoid } from 'nanoid';
import type { NextApiRequest, NextApiResponse } from 'next'
import { deleteCookie, getCookie, getCookies, setCookie } from 'cookies-next'
import { connectDB } from '../../utils/db';

// const hash = async (inputPassword: string, hashPassword: string) => {
//   if (hashPassword) {
//     const isMatch = await bcrypt.compare(inputPassword, hashPassword);
//     return isMatch;
//   }
//   const salt = await bcrypt.genSalt(10);
//   const password = await bcrypt.hash(inputPassword, salt);
//   return password;
// }

const findUserByUserName = (db: any, username: string) => db.collection("users").findOne({ username });

const findUserBySessionId = async (db: any, sessionId: any) => {
  const session = await db.collection("sessions").findOne({ sessionId }, { projection: { userId: 1 } });
  if (!session) return;
  return db.collection("users").findOne({ _id: new ObjectId(session.userId) });
}

const createSession = async (db: any, userId: string) => {
  const sessionId = nanoid();

  await db.collection("sessions").insertOne({ userId, sessionId });

  return sessionId;
};

const deleteSession = async (db: any, sessionId: string) => {
  await db.collection("sessions").deleteOne({ sessionId });
}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const db = await connectDB()

  if (req.method === 'GET', req.query.username) {  //check free username
    const user = await findUserByUserName(db, req.query.username.toString())
    if (!user) {
      return res.status(200).json({log: 'username is free'})
    }
    return res.status(200).json({log: 'username is passed'})
  }

  if(req.method === 'GET') { // check auth 
    const user = await findUserBySessionId(db, req.headers.sessionid)
    if (!user) {
      return res.status(200).json({data: null, error: 'not found'})
    }
    return res.status(200).json({ data: user, error: null })
  }

  if (req.method === 'POST') { // auth
    if(req.headers.type === 'login') { //log in
      const { username, password } = req.body
      const user = await findUserByUserName(db, username)
      if (!user || user && user.password !== password) {
        return res.status(200).json({ data: 'error' })
      }
      const sessionId = await createSession(db, user._id)
      setCookie('sessionId', sessionId, { req, res, httpOnly: true })
      return res.status(200).json({ data: user })
    }

    if(req.headers.type === 'signon') {  //sign on
      const { username, password } = req.body
      await db.collection("users").insertOne({
        username,
        password
      })
      const user = await findUserByUserName(db, username)
      const sessionId = await createSession(db, user._id)
      setCookie('sessionId', sessionId, { req, res, httpOnly: true })
      return res.status(200).json({ data: user })
    }

    if(req.headers.type === 'logout') {
      const { sessionId } = req.body
      await deleteSession(db, sessionId)
      deleteCookie('sessionId', { req, res })
      return res.status(200).json({ error: '' })
    }
  }
}
