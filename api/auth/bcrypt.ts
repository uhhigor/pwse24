import bcrypt from 'bcrypt';

function hashPassword(password: string) {
    return bcrypt.hash(password, 10);
}

function comparePassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export { hashPassword, comparePassword };
