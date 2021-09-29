// ==UserScript==
// @name         OldCouponRemover
// @namespace    https://github.com/chagama-g/
// @version      0.1
// @description  過去のクーポン情報を表示しない
// @author       chagama-g
// @match        https://shop.hikaritv.net/shopping/static/s_kakakucom/data/index.html
// @icon         https://shop.hikaritv.net/shopping/static/s_kakakucom/data/index.html
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    console.log("Old Coupon Remover");

    // ページが読み込まれないまま実行されることがあるため待機してから実行
    setTimeout(remove_old_coupon, 100);

    function remove_old_coupon() {
        const coupon_mark = "【クーポン獲得期間】";
        let elements = Array.from(document.getElementById("contents").getElementsByTagName("h3"));

        console.log("coupon elements:", elements.length);

        elements.forEach((elem, index) => {
            let text = elem.firstChild.textContent;
            //console.log(text);

            if (text.indexOf(coupon_mark, 0) != 0) {
                console.log("error");
                return;
            }

            let exp = text.substr(coupon_mark.length);
            let exp_split = exp.split("～");
            if (exp_split.length != 2) {
                console.log("expiration split error");
                return;
            }
            let end = exp_split[1];

            // parse
            // format e.g. "2021/10/04(月)0時"
            let year = end.split("/")[0];
            let month = end.split("/")[1];
            let day = end.split("/")[2].split("(")[0];
            let hour = end.split(")")[1].split("時")[0];

            let end_date = new Date(year, month - 1, day, hour);
            console.log(end_date.toString());

            let now = new Date();
            //console.log(now.toString());
            if (end_date < now) {
                elem.parentElement.remove();
                console.log("removed");
            }
        });
    }
})();