import { hotMain } from './discover/hot'
import { newdishMain } from './discover/newdish'

export const discover = async (page) => {
    await page.goto("https://music.163.com")
    const iframe = await page.frames().find(f => f.name() === "contentFrame")
    // 热门推荐
    // await hotMain(iframe)
    // 新碟上架
    // await newdishMain(iframe)
}
