function recursiveGet(source, propParts) {
  if(isUndef(source)) {
    return undefined;
  }
  if(propParts.length == 1) {
    return source[array.head(propParts)];  
  }
  return recursiveGet(source[array.head(propParts)], array.tail(propParts))
}

function recursiveSet(target, propParts, value) {
  if(isUndef(value)) {
    return;
  }
  if(propParts.length == 1) {
    return target[array.head(propParts)] = value;  
  }
  if(isUndef(target[array.head(propParts)])) {
    target[array.head(propParts)] = {};
  }
  return recursiveSet(target[array.head(propParts)], array.tail(propParts), value);    
}

function keyhole(source, ...props) {
  return props.map(p => p.split('.')).reduce((dest, current) => {
    recursiveSet(dest, current, recursiveGet(source, current))
    return dest;
  }, {});

}

// few tiny utils

const isUndef = (val) => typeof(val) === 'undefined';

const array = {
  head(arr) {
    return arr[0];
  },
  tail(arr) {
    return arr.slice(1);
  }
};

export default keyhole;