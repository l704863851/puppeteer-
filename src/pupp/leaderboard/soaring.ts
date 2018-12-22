import { getManager } from "typeorm";
import { Leaderboard, LeaderboardData } from "../../orm/discover/leaderboard";

export async function soaring(data) {
    try {
        const entityManager = await getManager()
        // 清除
        await entityManager.delete(LeaderboardData, { type: "soaring" })
        await entityManager.delete(Leaderboard, { type: "soaring" })
        // 创建 ==> 保存
        const leaderboard = await entityManager.create(Leaderboard, {
            ...data.resBaseinfo,
            type: "soaring"
        })
        const leaderboardDataArr = data.resData.map(n => {
            return {
                ...n,
                type: "soaring"
            }
        })
        const leaderboardData = await entityManager.create(LeaderboardData, leaderboardDataArr)
        await entityManager.save(leaderboard)
        await entityManager.save(leaderboardData)
    } catch (error) {
        console.log(error)
    }
}