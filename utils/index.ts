export function stringContains(str:string, target:string,isCaseSensitive:boolean = false) {
    if (isCaseSensitive) {
      return str.includes(target)
    }
    return str.toLowerCase().includes(target.toLowerCase())
  }