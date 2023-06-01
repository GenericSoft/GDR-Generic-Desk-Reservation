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

export function observeChangesOfChildren(element: HTMLDivElement) {
  return new Promise((resolve) => {
    const observer = new MutationObserver((mutationList) => {
      for (const mutation of mutationList) {
        if (mutation.type === 'childList') {
          resolve('BS');
          observer.disconnect();
        }
      }
    });

    const observerConfig = { childList: true };

    observer.observe(element, observerConfig);
  });
}
