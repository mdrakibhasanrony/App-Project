import { stubLog } from '../utils/stub';

// TODO(Azmir): Prisma transaction + token numbering diye replace korbe

export type WalkInInput = {
  doctorId: string;
  patientName: string;
  phone: string;
};

export async function getMyQueue(patientId: string) {
  stubLog('getMyQueue');
  return {
    tokenId: 'stub-token-id',
    tokenNumber: 5,
    status: 'WAITING',
    patientsAhead: 2,
    estimatedWaitMin: 18,
    patientId,
  };
}

export async function createWalkIn(receptionistId: string, input: WalkInInput) {
  stubLog('createWalkIn');
  return {
    id: 'stub-token-id',
    tokenNumber: 12,
    status: 'WAITING',
    receptionistId,
    ...input,
  };
}

export async function skipToken(tokenId: string) {
  stubLog('skipToken');
  return { id: tokenId, status: 'SKIPPED' };
}

export async function recallToken(tokenId: string) {
  stubLog('recallToken');
  return { id: tokenId, status: 'CALLED' };
}

export async function restoreToken(tokenId: string) {
  stubLog('restoreToken');
  return { id: tokenId, status: 'WAITING' };
}

export async function markEmergency(tokenId: string) {
  stubLog('markEmergency');
  return { id: tokenId, status: 'WAITING', isEmergency: true };
}