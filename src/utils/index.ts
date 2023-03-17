/**
 * @descrption 随机生成一个rgb颜色
 * @returns rgb颜色
 */
export const randomColor = ():string => {
  const random = Math.round(Math.random() * 160);
  return `rgb(${random},${random}${random})`
}
