export function addDot (value, times) {
  let numStr = value.replace(/\s*/g, '').replace(/\//g, '')
  let dotNum = times - numStr.length
  let result = ''
  for (var i = 0; i < dotNum; i++) {
    result += '•'
  }
  return (numStr + result)
}
