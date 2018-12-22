interface baseinfoObject {
    title: string,
    imgUrl: string,
    songsId: string,
    collectionAmount: string,
    forwardingAmount: string,
    commentAmount: string,
    playAmount: string,
    lastUpdateTime: string,
    updateStatus: string
}
interface dataObject {
    rank: string,
    trend: string,
    imgUrl: string,
    songName: string,
    subtitle: string,
    songtime: string,
    songer: string,
    songId: string,
}
export async function leaderboardFrameTree(iframe) {
    try {
        await iframe.waitForSelector("#toplist .g-mn3 .g-wrap .m-info")
        await iframe.waitForSelector("#toplist .g-mn3 .g-wrap12 #song-list-pre-cache table tbody tr")
        return await iframe.evaluate(() => {
            // 基本信息
            const _box_baseinfo = document.querySelector("body #toplist .g-mn3 .g-wrap .m-info") as HTMLElement
            const _sub_box_baseinfo = _box_baseinfo.querySelector(".cnt .cntc") as HTMLElement
            const _baseinfo_title = _sub_box_baseinfo.querySelector(".hd .f-ff2") as HTMLElement
            const _baseinfo_imgUrl = _box_baseinfo.querySelector(".cover img") as HTMLImageElement
            const _baseinfo_songsId = _sub_box_baseinfo.querySelector(".btns .u-btni-addply") as HTMLElement
            const _baseinfo_collectionAmount = _sub_box_baseinfo.querySelector(".btns #toplist-fav i") as HTMLElement
            const _baseinfo_forwardingAmount = _sub_box_baseinfo.querySelector(".btns #toplist-share i") as HTMLElement
            const _baseinfo_commentAmount = _sub_box_baseinfo.querySelector(".btns .u-btni-cmmt i #comment-count") as HTMLElement
            const _baseinfo_playAmount = document.querySelector("#toplist .g-mn3 .g-wrap12 .u-title .more #play-count") as HTMLElement
            const _baseinfo_lastUpdateTime = _sub_box_baseinfo.querySelector(".user .sep") as HTMLElement
            const _baseinfo_updateStatus = _sub_box_baseinfo.querySelector(".user .s-fc4") as HTMLElement
            const resBaseinfo: baseinfoObject = {
                title: _baseinfo_title.innerText,
                imgUrl: _baseinfo_imgUrl.getAttribute("src") as string,
                songsId: _baseinfo_songsId.getAttribute("data-res-data") as string,
                collectionAmount: _baseinfo_collectionAmount.innerText.substring(1, _baseinfo_collectionAmount.innerText.length-1),
                forwardingAmount: _baseinfo_forwardingAmount.innerText.substring(1, _baseinfo_forwardingAmount.innerText.length-1),
                commentAmount: _baseinfo_commentAmount.innerText,
                playAmount: _baseinfo_playAmount.innerText,
                lastUpdateTime: _baseinfo_lastUpdateTime.innerText.split("：")[1],
                updateStatus: _baseinfo_updateStatus.innerText
            }
            // 音乐信息
            const resData: Array<dataObject> = []
            const _box_data_tr = document.querySelectorAll("#toplist .g-mn3 .g-wrap12 #song-list-pre-cache table tbody tr")
            _box_data_tr.forEach(tr => {
                const _data_rank = tr.querySelector("td .hd .num") as HTMLElement
                const _data_trend = tr.querySelector("td .hd .rk .u-icn") as HTMLElement
                const _data_imgUrl = tr.querySelector("td.rank .f-cb .tt a img") as HTMLElement
                const _data_songId = tr.querySelector("td .f-cb .tt .ply") as HTMLElement
                const _data_songName = tr.querySelector("td .f-cb .tt .ttc a b") as HTMLElement
                const _data_subtitle = tr.querySelector("td .f-cb .tt .ttc .s-fc8") as HTMLElement
                const _data_songtime = tr.querySelector("td .u-dur") as HTMLElement
                const _data_songer = tr.querySelector("td .text") as HTMLElement
                // 趋势需要判断class, (.u-icn-73)上升,(.u-icn-74)下降,(.u-icn-75)NEW
                let trend = ""
                if(_data_trend.classList.contains("u-icn-73")) trend = 'rise'
                else if(_data_trend.classList.contains("u-icn-74")) trend = 'drop'
                else if(_data_trend.classList.contains("u-icn-75")) trend = 'new'
                // 前三名才有图片
                let imgUrl = ""
                if(_data_imgUrl) imgUrl = _data_imgUrl.getAttribute("src") as string
                // 副标题可能不存在
                let subtitle = ""
                if(_data_subtitle) subtitle = _data_subtitle.getAttribute("title") as string
                resData.push({
                    rank: _data_rank.innerText,
                    trend: trend,
                    imgUrl: imgUrl,
                    songId: _data_songId.getAttribute("data-res-id") as string,
                    songName: _data_songName.getAttribute("title") as string,
                    subtitle: subtitle,
                    songtime: _data_songtime.innerText,
                    songer: _data_songer.getAttribute("title") as string,
                })
            })
            return {
                resBaseinfo,
                resData
            }
        })
    } catch(error) {
        console.log(error)
    }
}