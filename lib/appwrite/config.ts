export const appwriteConfig = {
  endpointUrl: process.env.NEXT_PUBLIC_ENDPOINT!,
  projectId: process.env.PROJECT_ID!,
  secretKey: process.env.API_KEY!,
  databaseId: process.env.DATABASE_ID!,
  bucketId: process.env.NEXT_PUBLIC_BUCKET_ID!,
  patientCollectionId: process.env.PATIENT_COLLECTION_ID!,
  doctorCollectionId: process.env.DOCTOR_COLLECTION_ID!,
  appointmentCollectionId: process.env.APPOINTMENT_COLLECTION_ID!,
  adminPassKey: process.env.NEXT_PUBLIC_ADMIN_PASSKEY!,
};
