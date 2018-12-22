import { getManager } from "typeorm";
import { DiscoverNewdish } from "../../orm/discover/newdish";

export async function newdishMain(iframe) {
    const newdishData = await newdishFrameTree(iframe)
    const entityManager = getManager()
    await entityManager.clear(DiscoverNewdish)
    await entityManager.insert(DiscoverNewdish, newdishData)
}

interface newdishObject {
    singer: string,
    songName: string,
    imgSrc: string,
    songId: string
}
export async function newdishFrameTree(iframe) {
    try {
        await iframe.waitForSelector("#album-roller")
        return await iframe.evaluate(() => {
            const res: Array<newdishObject> = []
            const album_roller_ul_li = document.querySelectorAll("#album-roller .roll.f-pr ul.f-cb > li")
            album_roller_ul_li.forEach(_li => {
                const _img = _li.querySelector(".u-cover.u-cover-alb1 img") as HTMLImageElement
                const _a = _li.querySelector(".u-cover.u-cover-alb1 a[data-res-id]") as Element
                const _song_name = _li.querySelector("p.f-thide .s-fc0.tit") as HTMLElement
                const _songer = _li.querySelector("p.tit.f-thide .s-fc3") as HTMLElement
                res.push({
                    singer: _songer.innerText,
                    songName: _song_name.innerText,
                    imgSrc: _img.getAttribute("data-src") as string,
                    songId: _a.getAttribute("data-res-id") as string
                })
            })
            // 结果去重
            const result: Array<newdishObject> = []
            res.forEach(n => {
                if(!result.some(m => m.songId === n.songId)) {
                    result.push(n)
                }
            })
            return result
        })
    } catch(error) {
        console.log(error)
    }
}