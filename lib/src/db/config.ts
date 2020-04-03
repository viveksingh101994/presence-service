export const firebaseConfig = {
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  privatekey: process.env.FIREBASE_PRIVATE_KEY
    ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
    : '',
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL
};

export const mongoDB = {
  connectionString: process.env.MONGODB_CONNECTION_STRING,
  dbName: process.env.DB_NAME
};

export const corsSettings = {
  origin: process.env.CORS_ORIGIN
};
