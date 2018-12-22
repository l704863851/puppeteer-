import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class DiscoverNewdish {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    singer: string;
    // 歌手

    @Column()
    songName: string;
    // 歌名

    @Column()
    imgSrc: string;
    // 封面图片
    
    @Column()
    songId: string;
    // 歌曲或专辑id
}