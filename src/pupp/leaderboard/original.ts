import { getManager } from "typeorm";
import { Leaderboard, LeaderboardData } from "../../orm/discover/leaderboard";

export async function original(data) {
    try {
        const entityManager = await getManager()
        // 清除
        await entityManager.delete(LeaderboardData, { type: "original" })
        await entityManager.delete(Leaderboard, { type: "original" })
        // 创建 ==> 保存
        const leaderboard = await entityManager.create(Leaderboard, {
            ...data.resBaseinfo,
            type: "original"
        })
        const leaderboardDataArr = data.resData.map(n => {
            return {
                ...n,
                type: "original"
            }
        })
        const leaderboardData = await entityManager.create(LeaderboardData, leaderboardDataArr)
        await entityManager.save(leaderboard)
        await entityManager.save(leaderboardData)
    } catch (error) {
        console.log(error)
    }
}