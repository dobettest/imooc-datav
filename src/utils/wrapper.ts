function format(v:string) {
  const reg = /\d{1,3}(?=(\d{3})+)/g;
  return `${v}`.replace(reg, '$&,');
}
export function wrapperNumber(o:any, k:string) {
  return o && o[k] ? format(o[k]) : 0;
}
export function wrapperObject(o: any, k: string) {
  if (o && k.indexOf('.') >= 0) {
    const keys = k.split('.');
    for (const key of keys) {
      o = o[key];
    }
    return o;
  } else {
    return o && o[k] ? o[k] : {};
  }
}

export function wrapperArray(o:any, k:string) {
  return o && o[k] ? o[k] : [];
}

export function wrapperMoney(o:any, k:string) {
  return o && o[k] ? `¥ ${format(o[k])}` : '¥ 0.00';
}

export function wrapperOriginalNumber(o:any, k:string) {
  return o && o[k] ? o[k] : 0;
}

export function wrapperPercentage(o:any, k:string) {
  return o && o[k] ? `${o[k]}%` : '0%';
}
