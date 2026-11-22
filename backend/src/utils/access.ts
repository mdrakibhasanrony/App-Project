import { AuthUser } from '../types/auth';
import { AppError } from './AppError';

interface OwnedAppointment {
  patientId: string;
  facilityId: string;
}

// Patient nijer data chara onno kicchu dekhte parbe na
export function assertPatientOwns(user: AuthUser, ownerId: string) {
  if (user.role === 'PATIENT' && user.sub !== ownerId) {
    throw new AppError(403, 'FORBIDDEN', 'Ei data dekhar permission nei');
  }
}

// Patient ei kaj korte parbe na, staff shudhu nijer facility er data dekhte parbe
export function assertSameFacility(user: AuthUser, facilityId: string) {
  if (user.role === 'PATIENT') {
    throw new AppError(403, 'FORBIDDEN_ROLE', 'Patient ei kaj korte parbe na');
  }
  if (user.facilityId !== facilityId) {
    throw new AppError(403, 'FORBIDDEN_FACILITY', 'Onno facility er data');
  }
}

// Appointment dekhar anumoti ache kina (true/false)
export function canAccessAppointment(user: AuthUser, appt: OwnedAppointment): boolean {
  if (user.role === 'PATIENT') {
    return user.sub === appt.patientId;
  }
  return user.facilityId === appt.facilityId;
}