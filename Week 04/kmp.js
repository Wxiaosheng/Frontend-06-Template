function kmp(source, pattern) {
  let table = new Array(pattern.length).fill(0)

  { // 局部封装
    let i = 0, j = 0
    while (i < pattern.length) {
      if (pattern[i] === pattern[j]) {
        i++, j++;
        table[i] = j
      } else {
        if (j > 0) j = table[j]
        else i++
      }
    }
  }

  { // 局部封装
    let i = 0, j = 0
    while (i < source.length) {
      if (pattern[i] === source[i]) {
        i++, j++
      } else {
        if (j > 0) j = table[j]
        else i++
      }
      if (j === pattern.length) return true
    }
    return false
  }


}

console.log(kmp("abcdabcdabcex", "abcdabce"))