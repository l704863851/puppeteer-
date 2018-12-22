import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class DiscoverHot {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;
    // 标题

    @Column()
    amount: string;
    // 播放数量

    @Column()
    imgSrc: string;
    // 封面图片

    @Column()
    songId: string;
    // 歌曲或者专辑id
}