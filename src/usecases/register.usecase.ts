import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

export class RegisterUseCase {
  constructor(private usersRepository: any) {}

  async execute({ name, email, password }: RegisterUseCaseRequest) {
    const passwordHash = await hash(password, 6);

    const emailAlreadyExists = await prisma.user.findUnique({
      where: { email },
    });
    if (emailAlreadyExists) throw new Error("Email already exists.");

    await this.usersRepository.create({
      name,
      email,
      password_hash: passwordHash,
    });
  }
}
