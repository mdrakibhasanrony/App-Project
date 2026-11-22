import { prisma } from '../../config/prisma';
import { AppError } from '../../utils/AppError';
import { hashPassword, verifyPassword } from '../../utils/password';
import { signAccessToken } from '../../utils/jwt';

// TODO(Azmir): User model e facilityId add hole ekhane DB theke facilityId porbe

export async function registerPatient(input: {
  phone: string;
  password: string;
  name: string;
}) {
  const existing = await prisma.user.findUnique({ where: { phone: input.phone } });
  if (existing) {
    throw new AppError(409, 'PHONE_ALREADY_REGISTERED', 'Ei phone number diye already account ache');
  }

  const passwordHash = await hashPassword(input.password);

  const user = await prisma.user.create({
    data: {
      phone: input.phone,
      passwordHash,
      name: input.name,
      role: 'PATIENT',
    },
    select: { id: true, phone: true, name: true, role: true },
  });

  return user;
}

export async function login(phone: string, password: string) {
  const user = await prisma.user.findUnique({ where: { phone } });

  // Security: phone ba password dui ta bhul hole same message dibo
  if (!user) {
    throw new AppError(401, 'INVALID_CREDENTIALS', 'Phone ba password bhul');
  }

  const ok = await verifyPassword(password, user.passwordHash);
  if (!ok) {
    throw new AppError(401, 'INVALID_CREDENTIALS', 'Phone ba password bhul');
  }

  // TODO(Azmir): facilityId User model e add hole ekhane real value asbe
  const facilityId = null;

  const token = signAccessToken({ id: user.id, role: user.role, facilityId });

  return {
    token,
    user: { id: user.id, phone: user.phone, name: user.name, role: user.role },
  };
}

export async function getMe(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, phone: true, name: true, role: true },
  });

  if (!user) {
    throw new AppError(404, 'NOT_FOUND', 'User paoa jay nai');
  }

  return user;
}