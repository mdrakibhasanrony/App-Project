import { stubLog } from '../utils/stub';

// TODO(Azmir): Prisma query diye replace korbe

export async function getDoctorQueue(doctorId: string) {
  stubLog('getDoctorQueue');
  return {
    doctorId,
    currentTokenId: 'stub-token-id',
    waiting: 3,
    skipped: 1,
  };
}

export async function callNextPatient(doctorId: string) {
  stubLog('callNextPatient');
  return { doctorId, tokenId: 'stub-token-id', tokenNumber: 6, status: 'CALLED' };
}

export async function startConsultation(tokenId: string) {
  stubLog('startConsultation');
  return { id: tokenId, status: 'IN_CONSULTATION' };
}

export async function endConsultation(tokenId: string) {
  stubLog('endConsultation');
  return { id: tokenId, status: 'DONE' };
}

export async function setDoctorStatus(doctorId: string, status: string) {
  stubLog('setDoctorStatus');
  return { doctorId, status };
}

export async function addDelay(doctorId: string, minutes: number) {
  stubLog('addDelay');
  return { doctorId, delayMin: minutes };
}