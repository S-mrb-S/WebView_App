/**
 *
 * @param data current data
 * @param newData new data
 * @returns boolean
 */
//========================================================
/* Handle WebView message and url */
//========================================================
// Filename
export function Handle_urls(data: string[], newData: string): boolean {
  const linkRegex = /https?:\/\/[^\s]+/g; // الگوی یک لینک
  //                                +g ^

  // function getImgSrc() {
  //   var imgElements = document.getElementsByTagName('img');
  //   var imgSrcList = [];
  //   for (var i = 0; i < imgElements.length; i++) {
  //     // بررسی دامنه لینک عکس
  //     if (imgElements[i].src.includes('example.com')) {
  //       imgSrcList.push(imgElements[i].src);
  //     }
  //   }
  //   return imgSrcList;
  // }

  // // استفاده از تابع برای دریافت لینک‌های عکس
  // var imageSources = getImgSrc();
  // console.log(imageSources);

  if (newData.match(linkRegex)) {
    if (newData.match(/\.(jpeg|jpg|png)$/)) {
      return true;
    }
    // else if (link.match(/\.(mp4|avi|mov)$/)) {
    //   return 'Video'; // لینک یک ویدئو است
    // }
    else {
      return false;
    }
  } else {
    return false;
  }
}
