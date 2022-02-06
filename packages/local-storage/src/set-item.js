/**
 * Add value to localStorage array at key, 
 * ensure upper bound, and optionally 
 * initalize array or invoke callback  
 * @param { 
 *  { 
 *    key: string, 
 *    value: string,
 *    bound: number, 
 *    options: { 
 *      initFn: () => void, 
 *      initArray: { key, value }[],
 *    }
 *  }
 * } input 
 */
export function setItem(input) {
  const { key, value, bound, options } = input;
  const { initFn, initArray } = options || {};
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
  } else if(initArray) {
    localStorage.setItem(key, JSON.stringify(initArray));
  } else if(initFn) {
    initFn();
  } else {
    throw new Error('current value is not an Array')
  }
  const resultToAdd = JSON.stringify(current);
  localStorage.setItem(key, resultToAdd);
}