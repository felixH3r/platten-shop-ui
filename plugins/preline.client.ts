import "preline/preline";

declare var HSStaticMethods: {
  autoInit(collection?: string | string[]): void;
};

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("page:finish", () => {
    HSStaticMethods.autoInit();
  });
});
