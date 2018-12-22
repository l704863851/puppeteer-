import { Column } from 'typeorm'

export abstract class BaseInfo {
    @Column()
    type: string;

    @Column()
    title: string;
    // 标题

    @Column()
    imgUrl: string;
    // 封面图片

    @Column()
    songsId: string;
    // 歌曲集id

    @Column()
    collectionAmount: string;
    // 收藏量

    @Column()
    forwardingAmount: string;
    // 转发量

    @Column()
    commentAmount: string;
    // 评论数量

    @Column()
    playAmount: string;
    // 播放量

    @Column()
    lastUpdateTime: string;
    // 最后更新时间

    @Column()
    updateStatus: string;
    // 更新状态
}