function solution(absolutes, signs) {
  return absolutes.reduce((acc, cur, idx) => acc + (signs[idx] ? cur : -cur), 0);
}

console.log(solution([1,2,3], [false,false,true])) // -1 -2 3