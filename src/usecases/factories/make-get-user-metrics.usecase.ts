import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins.repository";
import { GetUserMetricsUseCase } from "../get-user-metrics.usecase";

export function makeGetUserMetricsUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const useCase = new GetUserMetricsUseCase(checkInsRepository);

  return useCase;
}
