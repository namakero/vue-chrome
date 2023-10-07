const target: HTMLElement = document.body;
interface Config {
  childList: boolean;
  attributes: boolean;
  characterData: boolean;
  subtree: boolean;
}
const config: Config = {
  childList: true,
  attributes: true,
  characterData: true,
  subtree: true,
}

const mainFunc = async function () {
  chrome.storage.local.get(["pickUpUrl", "hideUrl", "selectPage"], (result) => {
    if (!result.selectPage) {
      if (result.hideUrl) {
        let hideUrl: [] = result.hideUrl.split(" ");
        let allSite = document.querySelectorAll('.g');
        allSite.forEach((site) => {
          let linkElement = site.querySelector("a");
          if (linkElement) {
            let url = linkElement.href;
            for (let i = 0; i < hideUrl.length; i++) {
              if (url.startsWith(hideUrl[i])) {
                (site as HTMLElement).style.display = "none";
              }
            }
          }
        });
      }
    } else if(result.selectPage){
      if (result.pickUpUrl) {
        let pickUpUrl: [] = result.pickUpUrl.split(" ");
        let allSite = document.querySelectorAll('.g');
        allSite.forEach((site) => {
          let linkElement = site.querySelector("a");
          if (linkElement) {
            let url = linkElement.href;
            for (let i = 0; i < pickUpUrl.length; i++) {
              if (!url.startsWith(pickUpUrl[i])) {
                (site as HTMLElement).style.display = "none";
              }
            }
          }
        });
      }
    }
  });
};


addEventListener("load", mainFunc);
const observer = new MutationObserver(mainFunc);
observer.observe(target, config);