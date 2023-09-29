import { defineStore } from 'pinia';

interface Urls {
  id: number,
  url: string,
};

let idNumber: number = 0;
let inputUrl: string = "";

export const urlStore = defineStore("urlStore", {
  state: () => ({
    urls: [] as Urls[],
    idNumber: idNumber,
    inputUrl: inputUrl,
  }),
  actions: {
    addUrl(url: string): void {
      this.urls.push({
        id: ++this.idNumber,
        url: url,
      });
      this.inputUrl = "";
    },
    removeUrl(listId: number): void {
      let arrayNumber: number = this.urls.findIndex((url) => url.id === listId);
      this.urls.splice(arrayNumber, 1);
    },
    setUrls(): void {
      let arrayUrls = this.urls.map(url => url.url).join(" ");
      chrome.storage.local.set({ url: arrayUrls });
    },
    loadUrls(): void {
      chrome.storage.local.get(["url"], (result) => {
        if (result.url) {
          let urlArray = result.url.split(" ");
          for (let i = 0; i < urlArray.length; i++) {
            if (urlArray[i] !== "") {
              this.urls.push({
                id: ++this.idNumber,
                url: urlArray[i],
              });
            }
          }
        }
      });
    }
  },
});
