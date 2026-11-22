import { stubLog } from '../utils/stub';

// TODO(Azmir): Prisma query diye replace korbe

export async function bookAppointment(
  patientId: string,
  input: { doctorId: string; date: string; scheduledAt: string }
) {
  stubLog('bookAppointment');
  return { id: 'stub-appointment-id', patientId, ...input, status: 'BOOKED' };
}

export async function cancelAppointment(appointmentId: string) {
  stubLog('cancelAppointment');
  return { id: appointmentId, status: 'CANCELLED' };
}

export async function getMyAppointments(patientId: string) {
  stubLog('getMyAppointments');
  return [
    {
      id: 'stub-appointment-id',
      patientId,
      doctorId: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
      date: '2026-11-20',
      scheduledAt: '2026-11-20T10:00:00Z',
      status: 'BOOKED',
    },
  ];
}