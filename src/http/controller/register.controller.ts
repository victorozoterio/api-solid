import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { RegisterUseCase } from "@/usecases/register.usecase";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users.repository";
import { UserAlreadyExistsError } from "@/usecases/errors/user-already-exists.error";
import { MakeRegisterUseCase } from "@/usecases/factories/make-register.usecase";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  try {
    const registerUseCase = MakeRegisterUseCase();

    await registerUseCase.execute({ name, email, password });
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }

  return reply.status(201).send();
}
