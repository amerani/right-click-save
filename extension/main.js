/**
 * Constants
 */
const LOCAL_STORAGE_BOUDNS = 10;
const LOCAL_STORAGE_KEY = 'RIGHT_CLICK_SAVE_STORAGE_KEY';

/**
 * Add item to local storage array with upper bounds
 */
function addItem({ key, value, bound }) {
  const cur = localStorage.getItem(key);
  const current = JSON.parse(cur);
  if(Array.isArray(current)) {
    if(current.length < bound) {
      current.push(value);
    } else {
      const spliceLen = current.length - bound;
      if(spliceLen > 0) {
        current.splice(0, spliceLen);
        current.push(value);
      } else {  
        throw new Error(`spliceLen ${spliceLen} > ${bound}`);
      }
    }
  } else {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([]));
  }
  const resultToAdd = JSON.stringify(current);
  localStorage.setItem(key, resultToAdd);
}

/**
 * Convert svg DOM Node to base64 string
 */
function svgToBase64(svgEl) {
  const svg = new XMLSerializer().serializeToString(svgEl);
  const base64 = encodedData = window.btoa(svg);
  return base64;
}

/**
 * Click handler for mint button
 */
function mintHandler(event) {
  const base64 = svgToBase64(event.target);
  storeValue(base64);
  event.stopPropogation();
} 

/**
 * Wrap svg DOM Node with wrapper div and a button
 */
function wrapWithButton(svgEl) {
  try {
    const parent = svgEl.parentElement;
    const wrapper = document.createElement('div');
    const button = document.createElement('button');
    button.className = 'btn-mint';
    button.innerText = 'Mint';
    button.addEventListener('click', mintHandler);
    wrapper.appendChild(button);
    parent.replaceChild(wrapper, svgEl);
    wrapper.appendChild(svgEl);
  } catch (error) {
    console.log(error)
  }
}

/**
 * Search for svg and object nodes
 */
function findImageVectors() {
  const svgs = Array.from(document.querySelectorAll('svg'));
  const objects = Array.from(document.querySelectorAll('object'));
  return svgs.concat(objects).filter(x => x !== undefined);
}

/**
 * Main
 */
const storeValue = (value) => addItem({ 
  key: LOCAL_STORAGE_KEY,
  bound: LOCAL_STORAGE_BOUDNS,
  value,
});

try {
  let found = false;
  const handle = setInterval(() => {
    const els = findImageVectors();
    console.log(`Found ${els.length} elements`)
    if(els.length > 0) {
      wrapWithButton(els[0]);
      found = true;
    }
    if(found) {
      clearInterval(handle);
    }
  }, 100);
} catch (error) {
  alert(error);
}