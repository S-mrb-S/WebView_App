// const observer = new MutationObserver((mutations) => {
//   mutations.forEach((mutation) => {
//     start_i();
//     if (mutation.type === "childList") {
//       const addedNodes = mutation.addedNodes;
//       for (let i = 0; i < addedNodes.length; i++) {
//         const addedNode = addedNodes[i];
//         //   if (addedNode.tagName === 'DIV') {
//         const images = addedNode.querySelectorAll("img");
//         images.forEach((image) => {
//           if (
//             image.naturalWidth > 100 &&
//             image.naturalHeight > 100 &&
//             image.offsetTop < 100
//           ) {
//             window.ReactNativeWebView.postMessage(image.src);
//           }
//         });
//         //   }
//       }
//     }
//   });
// });

// function start_i() {
//   const images = document.querySelectorAll("img");
//   for (var i = 0; i < images.length; i++) {
//     if (
//       images[i].naturalWidth > 100 &&
//       images[i].naturalHeight > 100 &&
//       images[i].offsetTop < 100
//     ) {
//       window.ReactNativeWebView.postMessage(images[i].src);
//     }
//   }
// }
// start_i();

// setTimeout(function () {
//   window.ReactNativeWebView.postMessage("Start observer");
//   observer.observe(document.body, { childList: true, subtree: true });
// }, 500);
// true; // note: this is required, or you'll sometimes get silent failures

export const WebViewScript_Mutation = `
// new way
function sendImages(images) {
  images.forEach((image) => {
    if (
      image.naturalWidth > 100 &&
      image.naturalHeight > 100 &&
      image.offsetTop < 100
    ) {
      window.ReactNativeWebView.postMessage(image.src);
    }
  });
}

function start_i() {
  const images = document.querySelectorAll("img");
  sendImages(images);
}

start_i();

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    start_i();
    if (mutation.type === "childList") {
      const addedNodes = mutation.addedNodes;
      addedNodes.forEach((addedNode) => {
        const images = addedNode.querySelectorAll("img");
        sendImages(images);
      });
    }
  });
});

setTimeout(function () {
  window.ReactNativeWebView.postMessage("Start observer");
  observer.observe(document.body, { childList: true, subtree: true });
}, 500);

true;
`;

export const WebViewScript_Intersect = `
// new way chatgpt3.5
// دریافت عکس هایی که فقط میبینم
// توی مرورگر لپ تاپ کار نمیکنه
function sendImages(images) {
  images.forEach((image) => {
    if (
      image.naturalWidth > 100 &&
      image.naturalHeight > 100 &&
      image.offsetTop < 100
    ) {
      window.ReactNativeWebView.postMessage(image.src);
    }
  });
}

function handleIntersect(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const images = entry.target.querySelectorAll("img");
      sendImages(images);
    }
  });
}

const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.5, // Adjust the threshold as needed
};

const imageObserver = new IntersectionObserver(
  handleIntersect,
  observerOptions
);

function start_i() {
  const images = document.querySelectorAll("img");
  images.forEach((image) => {
    imageObserver.observe(image);
  });
}

start_i();

setTimeout(function () {
  window.ReactNativeWebView.postMessage("Start observer");
}, 500);
true;
`;

export const WebViewNoScript = `
setTimeout(function () {
  window.ReactNativeWebView.postMessage('');
}, 500);
true; // note: this is required, or you'll sometimes get silent failures
`;
