function solution(sizes) {
  let largestW = 0
  let largestH = 0
  
  sizes.forEach((size) => {
    let [w, h] = size.sort((w, h) => h-w)
    if (w > largestW) largestW = w
    if (h > largestH) largestH = h
  })

  return largestW * largestH;
}
