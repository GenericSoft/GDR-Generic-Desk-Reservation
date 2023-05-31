export function waitForElementToBeAppended(target: string, scope: Node) {
  return new Promise((resolve) => {
    if (document.querySelector(target)) {
      return resolve(document.querySelector(target));
    }

    const observer = new MutationObserver((mutations) => {
      console.log(mutations);
      if (document.querySelector(target)) {
        resolve(document.querySelector(target));
        observer.disconnect();
      }
    });

    observer.observe(scope, {
      childList: true,
      subtree: true,
    });
  });
}
