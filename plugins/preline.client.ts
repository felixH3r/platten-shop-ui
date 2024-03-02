import "preline/preline";

declare var HSStaticMethods: {
  autoInit(collection?: string | string[]): void;
};


export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("page:finish", () => {
    HSStaticMethods.autoInit();
  });
});
//
// import "preline/preline";
// // @ts-ignore
// import {type IStaticMethods} from "preline/preline";
//
// declare global {
//   interface Window {
//     HSStaticMethods: IStaticMethods;
//   }
// }
//
// export default defineNuxtPlugin((nuxtApp) => {
//   nuxtApp.hook("page:finish", () => {
//     window.HSStaticMethods.autoInit();
//   });
// });
