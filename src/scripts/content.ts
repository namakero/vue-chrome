window.onload = async function () {
  chrome.storage.local.get(["url"], (result) => {
    if (result.url) {
      let removeUrl: [] = result.url.split(" ");
      let allSite = document.querySelectorAll('.g');
      allSite.forEach((site) => {
        let linkElement = site.querySelector("a");
        if (linkElement) {
          let url = linkElement.href;
          for (let i = 0; i < removeUrl.length; i++) {
            if (url.startsWith(removeUrl[i])) {
              (site as HTMLElement).style.display = "none";
            }
          }
        }
      });
    }
  });
};
