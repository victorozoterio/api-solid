import { Gym, Prisma } from "generated/prisma";
import { GymsRepository } from "@/repositories/gyms.repository";
import { randomUUID } from "node:crypto";

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
}
