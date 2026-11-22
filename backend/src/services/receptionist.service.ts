import { stubLog } from '../utils/stub';

// TODO(Azmir): facilityId diye filter kora hobe, Prisma query diye replace korbe

export async function getFacilityQueue(facilityId: string | null) {
  stubLog('getFacilityQueue');
  return {
    facilityId,
    waiting: 8,
    inConsultation: 2,
    skipped: 1,
    doctors: [
      { doctorId: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d', status: 'AVAILABLE', waiting: 3 },
    ],
  };
}

export async function checkInAppointment(appointmentId: string) {
  stubLog('checkInAppointment');
  return { id: appointmentId, tokenNumber: 13, status: 'WAITING' };
}

export async function rescheduleAppointment(
  appointmentId: string,
  newScheduledAt: string
) {
  stubLog('rescheduleAppointment');
  return { id: appointmentId, scheduledAt: newScheduledAt, status: 'BOOKED' };
}