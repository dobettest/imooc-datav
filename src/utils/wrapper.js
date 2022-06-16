function format(v) {
  const reg = /\d{1,3}(?=(\d{3})+)/g;
  return `${v}`.replace(reg, "$&,");
}
export function wrapperNumber(o, k) {
  return o && o[k] ? format(o[k]) : 0;
}
export function wrapperObject(o, k) {
  if (o && k.indexOf(".") >= 0) {
    const keys = k.split(".");
    keys.forEach((key) => {
      o = o[key];
    });
    return o;
  } else {
    return o && o[k] ? o[k] : {};
  }
}

export function wrapperArray(o, k) {
  return o && o[k] ? o[k] : [];
}

export function wrapperMoney(o, k) {
  return o && o[k] ? `¥ ${format(o[k])}` : "¥ 0.00";
}

export function wrapperOriginalNumber(o, k) {
  return o && o[k] ? o[k] : 0;
}

export function wrapperPercentage(o, k) {
  return o && o[k] ? `${o[k]}%` : "0%";
}
