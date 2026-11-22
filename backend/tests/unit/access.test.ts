import {
  assertPatientOwns,
  assertSameFacility,
  canAccessAppointment,
} from '../../src/utils/access';
import { AuthUser } from '../../src/types/auth';

const patient: AuthUser = { sub: 'p1', role: 'PATIENT', facilityId: null };
const doctorA: AuthUser = { sub: 'd1', role: 'DOCTOR', facilityId: 'fac-A' };
const receptionistB: AuthUser = { sub: 'r2', role: 'RECEPTIONIST', facilityId: 'fac-B' };
const appt = { patientId: 'p1', facilityId: 'fac-A' };

describe('access', () => {
  it('patient nijer appointment dekhte pare, onnoro pare na', () => {
    expect(canAccessAppointment(patient, appt)).toBe(true);
    expect(canAccessAppointment({ ...patient, sub: 'p9' }, appt)).toBe(false);
  });

  it('same facility staff dekhte pare, onno facility pare na', () => {
    expect(canAccessAppointment(doctorA, appt)).toBe(true);
    expect(canAccessAppointment(receptionistB, appt)).toBe(false);
  });

  it('assertPatientOwns: onner data hole error', () => {
    expect(() => assertPatientOwns(patient, 'p9')).toThrow();
    expect(() => assertPatientOwns(patient, 'p1')).not.toThrow();
  });

  it('assertSameFacility: patient ke block kore', () => {
    expect(() => assertSameFacility(patient, 'fac-A')).toThrow();
    expect(() => assertSameFacility(doctorA, 'fac-A')).not.toThrow();
  });
});