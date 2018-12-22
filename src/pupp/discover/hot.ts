import { getManager } from "typeorm";
import { DiscoverHot } from "../../orm/discover/hot";

export async function hotMain(iframe) {
    const hotData = await hotFrameTree(iframe)
    const entityManager = getManager()
    await entityManager.clear(DiscoverHot)
    await entityManager.insert(DiscoverHot, hotData)
}
interface hotObject {
    title: string,
    amount: string,
    imgSrc: string,
    songId: string
}
export async function hotFrameTree(iframe) {
    try {
        await iframe.waitForSelector("#discover-module")
        return await iframe.evaluate(() => {
            const res: Array<hotObject> = []
            const discover_module_ul_li = document.querySelectorAll("#discover-module ul.m-cvrlst>li")
            discover_module_ul_li.forEach(_li => {
                const _img = _li.querySelector(".u-cover.u-cover-1 img") as HTMLImageElement
                const _span = _li.querySelector(".u-cover.u-cover-1 .bottom span.nb") as HTMLElement
                const _a = _li.querySelector("p.dec a") as HTMLElement
                res.push({
                    title: _a.getAttribute("title") as string,
                    amount: _span.innerText,
                    imgSrc: _img.src,
                    songId: _a.getAttribute("data-res-id") as string
                })
            })
            return res
        });
    } catch (error) {
        console.log(error)
    }
}