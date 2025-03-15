import bcrypt from "bcryptjs";

export function hashPassword(password: string): string {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}

export function verifyPassword(
  password: string,
  hashPassword: string,
): boolean {
  return bcrypt.compareSync(password, hashPassword);
}
