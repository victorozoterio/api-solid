import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins.repository";
import { GetUserMetricsUseCase } from "./get-user-metrics.usecase";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: GetUserMetricsUseCase;

describe("Get User Metrics Use Case", () => {
  // Recria as variáveis em memória antes de cada um dos teste
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new GetUserMetricsUseCase(checkInsRepository); // system under test
  });

  it("should be able to get user check-ins count from metrics", async () => {
    await checkInsRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    });

    await checkInsRepository.create({
      gym_id: "gym-02",
      user_id: "user-01",
    });

    const { checkInsCount } = await sut.execute({
      userId: "user-01",
    });

    expect(checkInsCount).toEqual(2);
  });
});
