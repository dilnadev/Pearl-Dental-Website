import nodemailer, { type Transporter } from "nodemailer";
import type { BookingRecord } from "./db";

let transporter: Transporter | null = null;
let emailConfigured = false;

function getTransporter(): Transporter | null {
  if (transporter) return transporter;

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    return null;
  }

  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
  emailConfigured = true;
  return transporter;
}

export async function sendBookingEmails(booking: BookingRecord) {
  const t = getTransporter();
  if (!t) {
    console.warn(
      "[email] SMTP not configured (set SMTP_HOST/SMTP_PORT/SMTP_USER/SMTP_PASS in .env) — skipping email, booking was still saved."
    );
    return;
  }

  const from = process.env.SMTP_FROM || process.env.SMTP_USER!;
  const clinicEmail = process.env.CLINIC_NOTIFY_EMAIL || process.env.SMTP_USER!;

  const summary = `
Booking Reference: ${booking.bookingId}
Patient: ${booking.patientName}
Phone: ${booking.patientPhone}
Email: ${booking.patientEmail}
Service: ${booking.serviceName}
Doctor: ${booking.doctorName}
Date & Time: ${booking.date} at ${booking.timeSlot}
Notes: ${booking.notes || "-"}
`.trim();

  try {
    // Notify the clinic
    await t.sendMail({
      from,
      to: clinicEmail,
      subject: `New Appointment Request — ${booking.bookingId}`,
      text: summary,
    });

    // Confirmation to the patient
    await t.sendMail({
      from,
      to: booking.patientEmail,
      subject: `Your Pearl Dental Care appointment — ${booking.bookingId}`,
      text: `Hi ${booking.patientName},\n\nYour appointment request has been received:\n\n${summary}\n\nWe'll contact you to confirm. Thank you for choosing Pearl Dental Care.`,
    });
  } catch (err) {
    console.error("[email] Failed to send booking emails:", err);
  }
}

export function isEmailConfigured() {
  return emailConfigured;
}
