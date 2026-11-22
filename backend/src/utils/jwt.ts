import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { AuthUser, Role } from '../types/auth';

interface UserForToken {
  id: string;
  role: Role;
  facilityId: string | null;
}

export function signAccessToken(user: UserForToken): string {
  return jwt.sign(
    { sub: user.id, role: user.role, facilityId: user.facilityId },
    env.JWT_ACCESS_SECRET,
    { expiresIn: env.JWT_ACCESS_TTL as jwt.SignOptions['expiresIn'] }
  );
}

export function verifyAccessToken(token: string): AuthUser {
  const payload = jwt.verify(token, env.JWT_ACCESS_SECRET) as jwt.JwtPayload;
  return {
    sub: payload.sub as string,
    role: payload.role as Role,
    facilityId: (payload.facilityId ?? null) as string | null,
  };
}