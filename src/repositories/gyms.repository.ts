import { Gym, Prisma } from "generated/prisma";

export interface findManyNearbyParams {
  latitude: number;
  longitude: number;
}

export interface GymsRepository {
  create(data: Prisma.GymCreateInput): Promise<Gym>;
  findById(id: string): Promise<Gym | null>;
  findManyNearby(params: findManyNearbyParams): Promise<Gym[]>;
  searchMany(query: string, page: number): Promise<Gym[]>;
}
