import * as puppeteer from 'puppeteer'

import { discover } from "./discover";
import { leaderboard } from './leaderboard'


export default async () => {
    try {
        const browser = await puppeteer.launch()
        const page = await browser.newPage();
        page.on('console', msg => console.log(msg.text()))
        await discover(page);//推荐
        await leaderboard(page);//排行榜
        await browser.close()
    } catch(err) {
        console.log(err)
    }
}