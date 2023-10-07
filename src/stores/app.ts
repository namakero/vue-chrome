import { defineStore } from 'pinia';

interface Urls {
  id: number,
  url: string,
};

let idNumber: number = 0;
let inputUrl: string = "";
let changeScreen: boolean = false;

export const urlStore = defineStore("urlStore", {
  state: () => ({
    pickUpUrls: [] as Urls[],
    hideUrls: [] as Urls[],
    idNumber: idNumber,
    inputUrl: inputUrl,
    changeScreen: changeScreen,
  }),
  actions: {
    changeScreenFunc(): void {
      this.changeScreen = !this.changeScreen;
      chrome.storage.local.set({
        selectPage: this.changeScreen,
      });
    },
    addHideUrl(url: string): void {
      this.hideUrls.push({
        id: ++this.idNumber,
        url: url,
      });
      this.inputUrl = "";
    },
    addPickUpUrl(url: string): void {
      this.pickUpUrls.push({
        id: ++this.idNumber,
        url: url,
      });
      this.inputUrl = "";
    },
    removeHideUrl(listId: number): void {
      let arrayNumber: number = this.hideUrls.findIndex((url) => url.id === listId);
      this.hideUrls.splice(arrayNumber, 1);
    },
    removePickUpUrl(listId: number): void {
      let arrayNumber: number = this.pickUpUrls.findIndex((url) => url.id === listId);
      this.pickUpUrls.splice(arrayNumber, 1);
    },
    confirmHideUrls(): void {
      let arrayHideUrls = this.hideUrls.map(url => url.url).join(" ");
      chrome.storage.local.remove(["pickUpUrl"]);
      chrome.storage.local.set({
        hideUrl: arrayHideUrls,
        selectPage: this.changeScreen,
      });
    },
    confirmPickUpUrls(): void {
      let arrayPickUpUrls = this.pickUpUrls.map(url => url.url).join(" ");
      chrome.storage.local.remove(["hideUrl"]);
      chrome.storage.local.set({
        pickUpUrl: arrayPickUpUrls,
        selectPage: this.changeScreen,
      });
    },
    loadUrls(): void {
      chrome.storage.local.get(["hideUrl", "pickUpUrl", "selectPage"], (result) => {
        this.changeScreen = result.selectPage;
        if (result.selectPage && result.pickUpUrl) {
          let urlArray = result.pickUpUrl.split(" ");
          for (let i = 0; i < urlArray.length; i++) {
            if (urlArray[i] !== "") {
              this.pickUpUrls.push({
                id: ++this.idNumber,
                url: urlArray[i],
              });
            }
          }
        } else {
          if (!result.selectPage && result.hideUrl) {
            let urlArray = result.hideUrl.split(" ");
            for (let i = 0; i < urlArray.length; i++) {
              if (urlArray[i] !== "") {
                this.hideUrls.push({
                  id: ++this.idNumber,
                  url: urlArray[i],
                });
              }
            }
          }
        }
      });
    }
  },
});
