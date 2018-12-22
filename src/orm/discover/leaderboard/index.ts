import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { LeaderboardData } from './indexData';
import { BaseInfo } from './baseInfo';

@Entity()
export class Leaderboard extends BaseInfo {
    @PrimaryGeneratedColumn()
    id: number;
    
}

export {
    LeaderboardData
}