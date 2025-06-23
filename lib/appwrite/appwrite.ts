import * as sdk from "node-appwrite";
import { appwriteConfig } from "./config";

const client = new sdk.Client();

client
  .setEndpoint(appwriteConfig.endpointUrl)
  .setProject(appwriteConfig.projectId)
  .setKey(appwriteConfig.secretKey);

export const users = new sdk.Users(client);
export const storage = new sdk.Storage(client);
export const databases = new sdk.Databases(client);
export const messaging = new sdk.Messaging(client);
