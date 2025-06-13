import { UsersRepository } from "@/repositories/users.repository";
import { hash } from "bcryptjs";

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, email, password }: RegisterUseCaseRequest) {
    const passwordHash = await hash(password, 6);

    const emailAlreadyExists = await this.usersRepository.findByEmail(email);
    if (emailAlreadyExists) throw new Error("Email already exists.");

    await this.usersRepository.create({
      name,
      email,
      password_hash: passwordHash,
    });
  }
}
