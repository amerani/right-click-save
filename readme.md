# right-click-save
A chrome extension that stores base64 encoded string for up to 10 svg elements on the page where it's executed

## testing
1. run the following commands to run a local app with svg

    ```
    cd app
    npm i
    npm start
    ```
2. load unpacked from `extension` directory
https://developer.chrome.com/docs/extensions/mv3/getstarted/#unpacked

3. verify localStorage value for key = `RIGHT_CLICK_SAVE_STORAGE_KEY`