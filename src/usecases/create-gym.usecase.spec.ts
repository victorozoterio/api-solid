import { expect, describe, it, beforeEach } from "vitest";
import { CreateGymUseCase } from "./create-gym.usecase";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms.repository";

let gymsRepository: InMemoryGymsRepository;
let sut: CreateGymUseCase;

describe("Gym Use Case", () => {
  // Recria as variáveis em memória antes de cada um dos teste
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new CreateGymUseCase(gymsRepository); // system under test
  });

  it("should be able to create gym", async () => {
    const { gym } = await sut.execute({
      title: "JavaScript Gym",
      description: null,
      phone: null,
      latitude: -23.0719488,
      longitude: -47.2088576,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
