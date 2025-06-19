import { CheckIn } from "generated/prisma";
import { CheckInsRepository } from "@/repositories/check-ins.repository";
import { GymsRepository } from "@/repositories/gyms.repository";
import { ResourceNotFoundError } from "./errors/resource-not-found.error";
import { getDistanceBetweenCoordinates } from "./utils/get-distance-between-coordinates";

interface CheckInUseCaseRequest {
  userId: string;
  gymId: string;
  userLatitude: number;
  userLongitude: number;
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn;
}

export class CheckInUseCase {
  constructor(
    private checkInsRepository: CheckInsRepository,
    private gymsRepository: GymsRepository,
  ) {}

  async execute({
    userId,
    gymId,
    userLatitude,
    userLongitude,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId);
    if (!gym) throw new ResourceNotFoundError();

    const distance = getDistanceBetweenCoordinates(
      {
        latitude: userLatitude,
        longitude: userLongitude,
      },
      {
        latitude: Number(gym.latitude),
        longitude: Number(gym.longitude),
      },
    );

    const MAX_DISTANCE_IN_KILOMETRES = 0.1;
    if (distance > MAX_DISTANCE_IN_KILOMETRES) throw new Error();

    const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(
      userId,
      new Date(),
    );

    if (checkInOnSameDay) throw new Error();

    const checkIn = await this.checkInsRepository.create({
      gym_id: gymId,
      user_id: userId,
    });

    return { checkIn };
  }
}
