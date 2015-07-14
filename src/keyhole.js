function recursiveGet(source, remainingProps) {
  if(isUndef(source)) return undefined;
  const currentProp = remainingProps[0];
  return (remainingProps.length > 1) 
    ? recursiveGet(source[currentProp], remainingProps.slice(1))
    : source[currentProp];
}

function recursiveSet(target, remainingProps, value) {
  if(isUndef(value)) return;
  const currentProp = remainingProps[0];
  if(remainingProps.length > 1) {
    if(isUndef(target[currentProp])) target[currentProp] = {};
    return recursiveSet(target[currentProp], remainingProps.slice(1), value);    
  }
  target[currentProp] = value;  
}

function isUndef(val) {
  return typeof(val) === 'undefined';
}

export default function (source, ...props) {
  var initial = {};
  return props.map(p => p.split('.')).reduce((dest, current) => {
    recursiveSet(dest, current, recursiveGet(source, current))
    return dest;
  }, initial);
};