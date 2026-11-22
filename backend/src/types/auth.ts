export type Role = 'PATIENT' | 'DOCTOR' | 'RECEPTIONIST' | 'ADMIN';

export interface AuthUser {
  sub: string;
  role: Role;
  facilityId: string | null;
}