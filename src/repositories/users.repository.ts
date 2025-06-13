import { Prisma, User } from "generated/prisma";

// Ess interface define quais métodos deverão ser implementados pela classe concreta de repositório.
export interface UsersRepository {
  create(data: Prisma.UserCreateInput): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
}
