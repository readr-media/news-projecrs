export function initNoteContainer() {

    // get viewport size
    // let vw = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    let vh = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    //設定 note--container 尺寸，等於主圖縮放後的尺寸
    let slide = document.querySelectorAll(".swiper-slide");
    slide.forEach(function (element, index) {

        const image = element.querySelector("img");

        if (image) {
            let width = image.offsetWidth;
            let height = image.offsetHeight;

            // image.style.marginLeft = width / 2 * -1 + "px";
            // image.style.marginTop = height / 2 * -1 + "px";

            // console.log(width + ", " + height);

            let container = element.querySelector(".note--container");
            if (container) {
                container.style.width = width + "px";
                container.style.height = height + "px";
            }
        } //end if(image)
    });

    //檢查 note--content 是否超出 viewport 顯示範圍
    let noteContent = document.querySelectorAll(".note--content");
    
    // let container = document.querySelector('.container');
    let containerRectBottom = 
        document.querySelector('.container').getBoundingClientRect().bottom;

    // console.log('containerRectBottom: ' + containerRectBottom);

    if (noteContent) {
        noteContent.forEach(function(element, index){  

            //reset margin-top
            element.style.marginTop = 0;
            
            //與 viewport 的距離
            // let domRect = element.getBoundingClientRect();
            let rectBottom = element.getBoundingClientRect().bottom;

            // console.log(domRect);
            // console.log(rectBottom);

            if(rectBottom > containerRectBottom) {
                //set margin-top
                let marginTop = (rectBottom - containerRectBottom + 10) * -1 + "px";
                element.style.marginTop = marginTop;
            }
        });
    }

}

