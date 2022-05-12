export const arrEquals = (arrA: any[], arrB: any[]): boolean => {
  if (!arrB) return false;
  if (arrA.length != arrB.length) return false;
  for (let i = 0, l = arrA.length; i < l; i++) {
    if (arrA[i] instanceof Array && arrB[i] instanceof Array) {
      if (!arrA[i].equals(arrB[i]))
        return false;
    }
    else if (arrA[i] != arrB[i]) {
      return false;
    }
  }
  return true;
}
