import { NowRequest, NowResponse } from '@vercel/node';
import { MongoClient, Db } from 'mongodb';
import url from 'url';

let cachedDB: Db = null;

async function connectToDB(uri: string) {
  if (cachedDB) {
    return cachedDB;
  }

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const dbName = url.parse(uri).pathname.substr(1); // get db from DB connection string

  const db = client.db(dbName);

  cachedDB = db;

  return db;
}

export default async (request: NowRequest, response: NowResponse) => {
  const { email } = request.body;

  const db = await connectToDB(process.env.MONGODB_URI);

  const collection = db.collection('subscribers');

  await collection.insertOne({
    email,
    subscribedAt: new Date(),
  })

  return response.status(201).json({ ok: true });
}