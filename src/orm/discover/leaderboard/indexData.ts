import { Entity, PrimaryGeneratedColumn } from "typeorm";
import { Data } from './Data'

@Entity()
export class LeaderboardData extends Data {
    @PrimaryGeneratedColumn()
    id: number;
}