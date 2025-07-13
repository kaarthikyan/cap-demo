import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;

export type DecodedUser = {
  userId: string;
  email: string;
  role?: string; // role is optional
};

export function verifyToken(token: string): DecodedUser | null {
  try {
    return jwt.verify(token, JWT_SECRET) as DecodedUser;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.log(err?.message);
    return null;
  }
}
