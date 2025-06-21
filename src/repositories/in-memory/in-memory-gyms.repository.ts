import { Gym, Prisma } from "generated/prisma";
import {
  findManyNearbyParams,
  GymsRepository,
} from "@/repositories/gyms.repository";
import { randomUUID } from "node:crypto";
import { getDistanceBetweenCoordinates } from "@/usecases/utils/get-distance-between-coordinates";

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = [];

  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(String(data.latitude)),
      longitude: new Prisma.Decimal(String(data.longitude)),
      created_at: new Date(),
    };

    this.items.push(gym);
    return gym;
  }

  async findById(id: string) {
    const gym = this.items.find((item) => item.id === id);
    if (!gym) return null;
    return gym;
  }

  async findManyNearby(params: findManyNearbyParams) {
    return this.items.filter((item) => {
      const distance = getDistanceBetweenCoordinates(
        {
          latitude: params.latitude,
          longitude: params.longitude,
        },
        { latitude: Number(item.latitude), longitude: Number(item.longitude) },
      );

      return distance < 10;
    });
  }

  async searchMany(query: string, page: number) {
    return this.items
      .filter((item) => item.title.includes(query))
      .slice((page - 1) * 20, page * 20);
  }
}
