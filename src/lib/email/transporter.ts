import { EmailClient } from "@azure/communication-email";

export const emailClient = new EmailClient(
  process.env.AZURE_COMMUNICATION_CONNECTION_STRING!,
);

export const SENDER_EMAIL = process.env.SENDER_EMAIL || "DoNotReply@egsync.com";

export const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || "gcx@eg.dk")
  .split(",")
  .map((a) => ({ address: a.trim() }));
