(async () => {
  const src = chrome.runtime.getURL('src/main.js');
  try {
    const contentScript = await import(src);
    contentScript.main();
  } catch (error) {
    console.log(error);
  }
})();