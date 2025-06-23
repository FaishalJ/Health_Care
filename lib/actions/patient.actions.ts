"use server";

import { revalidatePath } from "next/cache";
import { Query, ID } from "node-appwrite";
import { InputFile } from "node-appwrite";

import { databases, storage, users } from "../appwrite/appwrite";
import { appwriteConfig } from "../appwrite/config";
import { parseStringify } from "../utils";

// ==========> Create User <==========
export const createUser = async (user: CreateUserParams) => {
  try {
    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name,
    );

    console.log({ newUser });
    return newUser;
  } catch (error: any) {
    if (error && error?.code === 409) {
      const documents = await users.list([Query.equal("email", user.email)]);

      return documents?.users[0];
    }
    console.error("An error occurred while creating a new user:", error);
  }
};

// ==========> Get User <==========
export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);
    return parseStringify(user);
  } catch (error) {
    console.error("An error occurred while getting the user:", error);
  }
};

// ==========> Get Patient <==========
export const getPatient = async (userId: string) => {
  try {
    const patients = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.patientCollectionId,
      [Query.equal("userId", userId)],
    );
    return parseStringify(patients.documents[0]);
  } catch (error) {
    console.error("An error occurred while getting the user:", error);
  }
};

// ==========> Register Patient <==========
export const registerPatient = async ({
  identificationDocument,
  ...patient
}: RegisterUserParams) => {
  try {
    // Upload file ->  // https://appwrite.io/docs/references/cloud/client-web/storage#createFile
    let file;
    if (identificationDocument) {
      const inputFile =
        identificationDocument &&
        InputFile.fromBlob(
          identificationDocument?.get("blobFile") as Blob,
          identificationDocument?.get("fileName") as string,
        );

      file = await storage.createFile(
        appwriteConfig.bucketId,
        ID.unique(),
        inputFile,
      );
    }

    // Create new patient document -> https://appwrite.io/docs/references/cloud/server-nodejs/databases#createDocument
    const newPatient = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.patientCollectionId,
      ID.unique(),
      {
        identificationDocumentId: file?.$id ? file.$id : null,
        identificationDocumentUrl: file?.$id
          ? `${appwriteConfig.endpointUrl}/storage/buckets/${appwriteConfig.bucketId}/files/${file.$id}/view??project=${appwriteConfig.projectId}`
          : null,
        ...patient,
      },
    );

    return parseStringify(newPatient);
  } catch (error) {
    console.error("An error occurred while creating a new patient:", error);
  }
};