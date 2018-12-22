import { leaderboardFrameTree } from './leaderboard/frameTree'
import { soaring } from "./leaderboard/soaring";
import { original } from "./leaderboard/original";
import { newsong } from "./leaderboard/newsong";
import { hotsong } from "./leaderboard/hotsong";

export const leaderboard = async (page) => {
    // 飙升榜
    await page.goto("https://music.163.com/#/discover/toplist")
    await page.waitFor(1000)
    const soaringIframe = await page.frames().find(f => f.name() === "contentFrame")
    const soaringFrameData = await leaderboardFrameTree(soaringIframe)
    await soaring(soaringFrameData)
    // 新歌榜
    await page.goto("https://music.163.com/#/discover/toplist?id=2884035")
    await page.waitFor(1000)
    const newsongIframe = await page.frames().find(f => f.name() === "contentFrame")
    const newsongFrameData = await leaderboardFrameTree(newsongIframe)
    await newsong(newsongFrameData)
    // 原创榜
    await page.goto("https://music.163.com/#/discover/toplist?id=3779629")
    await page.waitFor(1000)
    const originalIframe = await page.frames().find(f => f.name() === "contentFrame")
    const originalFrameData = await leaderboardFrameTree(originalIframe)
    await original(originalFrameData)
    // 热歌榜
    await page.goto("https://music.163.com/#/discover/toplist?id=3778678")
    await page.waitFor(1000)
    const hotsongIframe = await page.frames().find(f => f.name() === "contentFrame")
    const hotsongFrameData = await leaderboardFrameTree(hotsongIframe)
    await hotsong(hotsongFrameData)
}
