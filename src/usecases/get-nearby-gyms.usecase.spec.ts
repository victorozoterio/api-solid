import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms.repository";
import { GetNearbyGymsUseCase } from "./get-nearby-gyms.usecase";

let gymsRepository: InMemoryGymsRepository;
let sut: GetNearbyGymsUseCase;

describe("Get Nearby Gyms Use Case", () => {
  // Recria as variáveis em memória antes de cada um dos teste
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new GetNearbyGymsUseCase(gymsRepository); // system under test
  });

  it("should be able to get nearby gyms", async () => {
    await gymsRepository.create({
      title: "Near Gym",
      description: null,
      phone: null,
      latitude: -23.0719488,
      longitude: -47.2088576,
    });

    await gymsRepository.create({
      title: "Far Gym",
      description: null,
      phone: null,
      latitude: -22.8404862,
      longitude: -46.8427287,
    });

    const { gyms } = await sut.execute({
      userLatitude: -23.0719488,
      userLongitude: -47.2088576,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: "Near Gym" })]);
  });
});
