import * as sdk from "node-appwrite";

// export const {
//   PROJECT_ID,
//   API_KEY,
//   DATABASE_ID,
//   API_ENDPOINT,
//   PATIENT_COLLECTION_ID,
//   DOCTOR_COLLECTION_ID,
//   APPOINTMENT_COLLECTION_ID,
//   NEXT_PUBLIC_BUCKET_ID,
// } = process.env;

// const client = new sdk.Client()
//   .setEndpoint(API_ENDPOINT!)
//   .setProject(PROJECT_ID!)
//   .setKey(API_KEY!);
const API_ENDPOINT = process.env.API_ENDPOINT!
const PROJECT_ID = process.env.PROJECT_ID!
const API_KEY = process.env.API_KEY!

const client = new sdk.Client()
  .setEndpoint(API_ENDPOINT)
  .setProject(PROJECT_ID)
  .setKey(API_KEY);

export const databases = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const messaging = new sdk.Messaging(client);
export const users = new sdk.Users(client);
