export function stringContains(str:string, target:string,isCaseSensitive:boolean = false) {
    if (isCaseSensitive) {
      return str.includes(target)
    }
    return str.toLowerCase().includes(target.toLowerCase())
  }

/**
 * Converts an array of files to an array of Data URLs.
 *
 * @param {FileList | Array<File>} files - The files to convert.
 * @return {string[]} A promise that resolves with an array of Data URLs.
 */
export function convertFilesToDataUrls(files:Array<File>):string[]{
  let dataUrls:string[] = []

  if (files && files.length > 0) {
    files.forEach(file => {
      console.log(typeof file)
      const reader = new FileReader()

      reader.onload = function(event) {
        try {
          if (event.target) {
            const dataUrl = event.target.result as string
            dataUrls.push(dataUrl)
          }
        } catch (error) {
          console.error("FileReader error",error)
        }
      }

      reader.readAsDataURL(file)
    })

    return dataUrls
  }

  return dataUrls
}