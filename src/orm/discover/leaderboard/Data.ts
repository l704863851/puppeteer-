import {  Column } from "typeorm";

export abstract class Data {
    @Column()
    type: string;

    @Column()
    rank: string;
    // 排名

    @Column()
    trend: string;
    // 趋势

    @Column()
    imgUrl: string;
    // 封面图片，排名前三才有

    @Column()
    songName: string;
    // 歌名

    @Column()
    subtitle: string;
    // 副标题，例如：来自电影xx，电视剧xx

    @Column()
    songtime: string;
    // 歌曲时长

    @Column()
    songer: string;
    // 歌手

    @Column()
    songId: string;
    // 歌曲或专辑Id
}