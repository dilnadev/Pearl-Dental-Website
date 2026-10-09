import { createClient, type Client } from "@libsql/client";

let client: Client | null = null;
let schemaReady: Promise<void> | null = null;

function getClient(): Client {
  if (!client) {
    const url = process.env.TURSO_DATABASE_URL;
    const authToken = process.env.TURSO_AUTH_TOKEN;
    if (!url) {
      throw new Error("TURSO_DATABASE_URL environment variable is missing.");
    }
    client = createClient({ url, authToken });
  }
  return client;
}

function ensureSchema(): Promise<void> {
  if (!schemaReady) {
    schemaReady = getClient().execute(`
      CREATE TABLE IF NOT EXISTS bookings (
        bookingId TEXT PRIMARY KEY,
        serviceId TEXT NOT NULL,
        serviceName TEXT NOT NULL,
        doctorId TEXT NOT NULL,
        doctorName TEXT NOT NULL,
        date TEXT NOT NULL,
        timeSlot TEXT NOT NULL,
        patientName TEXT NOT NULL,
        patientPhone TEXT NOT NULL,
        patientEmail TEXT NOT NULL,
        notes TEXT,
        createdAt TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'confirmed'
      )
    `).then(() => undefined);
  }
  return schemaReady;
}

export interface BookingRecord {
  bookingId: string;
  serviceId: string;
  serviceName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  timeSlot: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  notes?: string;
  createdAt: string;
  status: "confirmed" | "cancelled";
}

export async function insertBooking(booking: Omit<BookingRecord, "status">) {
  await ensureSchema();
  await getClient().execute({
    sql: `INSERT INTO bookings
      (bookingId, serviceId, serviceName, doctorId, doctorName, date, timeSlot, patientName, patientPhone, patientEmail, notes, createdAt, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'confirmed')`,
    args: [
      booking.bookingId,
      booking.serviceId,
      booking.serviceName,
      booking.doctorId,
      booking.doctorName,
      booking.date,
      booking.timeSlot,
      booking.patientName,
      booking.patientPhone,
      booking.patientEmail,
      booking.notes || null,
      booking.createdAt,
    ],
  });
}

// excludeBookingId lets a reschedule check for conflicts without flagging its own current slot
export async function isSlotTaken(
  doctorId: string,
  date: string,
  timeSlot: string,
  excludeBookingId?: string
): Promise<boolean> {
  await ensureSchema();
  const result = await getClient().execute({
    sql: `SELECT 1 FROM bookings WHERE doctorId = ? AND date = ? AND timeSlot = ? AND status != 'cancelled' AND bookingId != ?`,
    args: [doctorId, date, timeSlot, excludeBookingId || ""],
  });
  return result.rows.length > 0;
}

export async function listBookings(): Promise<BookingRecord[]> {
  await ensureSchema();
  const result = await getClient().execute(`SELECT * FROM bookings ORDER BY createdAt DESC`);
  return result.rows as unknown as BookingRecord[];
}

export async function findBooking(bookingId: string, patientPhone: string): Promise<BookingRecord | undefined> {
  await ensureSchema();
  const result = await getClient().execute({
    sql: `SELECT * FROM bookings WHERE bookingId = ? AND patientPhone = ?`,
    args: [bookingId.trim(), patientPhone.trim()],
  });
  return result.rows[0] as unknown as BookingRecord | undefined;
}

export async function rescheduleBooking(bookingId: string, date: string, timeSlot: string) {
  await ensureSchema();
  await getClient().execute({
    sql: `UPDATE bookings SET date = ?, timeSlot = ? WHERE bookingId = ?`,
    args: [date, timeSlot, bookingId],
  });
}

export async function cancelBooking(bookingId: string) {
  await ensureSchema();
  await getClient().execute({
    sql: `UPDATE bookings SET status = 'cancelled' WHERE bookingId = ?`,
    args: [bookingId],
  });
}
