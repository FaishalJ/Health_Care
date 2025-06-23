"use server";

import { revalidatePath } from "next/cache";
import { Query, ID } from "node-appwrite";

import { databases, storage, users, messaging } from "../appwrite/appwrite";
import { appwriteConfig } from "../appwrite/config";
import { formatDateTime, parseStringify } from "../utils";
import { Appointment } from "../../types/appwrite.types";

// ==========> Create appointment <==========
export const createAppointment = async (
  appointment: CreateAppointmentParams
) => {
  try {
    const newAppointment = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.appointmentCollectionId,
      ID.unique(),
      appointment
    );

    revalidatePath("/admin");
    return parseStringify(newAppointment);
  } catch (error) {
    console.error("An error occurred while creating a new appointment:", error);
  }
};

// ==========> Get appointment <==========
export const getAppointment = async (appointmentId: string) => {
  try {
    const appointment = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.appointmentCollectionId,
      appointmentId
    );

    return parseStringify(appointment);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the existing patient:",
      error
    );
  }
};

// ==========> Get Recent appointment <==========
export const getRecentAppointmentList = async () => {
  try {
    const appointments = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.appointmentCollectionId,
      [Query.orderDesc("$createdAt")]
    );

    const initialCounts = {
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    };
    const counts = (appointments.documents as Appointment[]).reduce(
      (acc, appointment) => {
        switch (appointment.status) {
          case "scheduled":
            acc.scheduledCount++;
            break;
          case "pending":
            acc.pendingCount++;
            break;
          case "cancelled":
            acc.cancelledCount++;
            break;
        }
        return acc;
      },
      initialCounts
    );

    const data = {
      totalCount: appointments.total,
      ...counts,
      documents: appointments.documents,
    };

    return parseStringify(data);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the existing patient:",
      error
    );
  }
};

// ==========> update appointment <==========
export const updateAppointment = async ({
  appointmentId,
  userId,
  timeZone,
  appointment,
  type,
}: UpdateAppointmentParams) => {
  try {
    const updatedAppointment = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.appointmentCollectionId,
      appointmentId,
      appointment
    );

    if (!updatedAppointment) throw Error;

    const smsMessage = `Greetings from HealthCare. ${
      type === "schedule"
        ? `Your appointment is confirmed for ${
            formatDateTime(appointment.schedule!, timeZone).dateTime
          } with Dr. ${appointment.primaryPhysician}`
        : `We regret to inform that your appointment for ${
            formatDateTime(appointment.schedule!, timeZone).dateTime
          } is cancelled. Reason:  ${appointment.cancellationReason}`
    }.`;
    await sendSMSNotification(userId, smsMessage);

    revalidatePath("/admin");
    return parseStringify(updatedAppointment);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the existing patient:",
      error
    );
  }
};

// ==========> Send SMS notification <==========
export const sendSMSNotification = async (userId: string, content: string) => {
  try {
    const message = await messaging.createSms(
      ID.unique(),
      content,
      [],
      [userId]
    );

    return parseStringify(message);
  } catch (err) {
    console.error(err);
  }
};
