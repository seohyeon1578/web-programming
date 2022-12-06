// 필요한 값, 함수를 가진 객체를 만든 다음 module.exports에 해당 객체를 할당한다.

// commonJS
// const data = {
//   user: 'abcd',
//   role: 'admin',
//   sayHello() {
//     console.log("Hello!!!");
//   }
// };
//
// exports 객체를 내가 만든 객체로 한번에 할당
// module.exports = data;

//ES6
export default {
  user: 'abcd',
  role: 'admin',
  sayHello() {
    console.log("Hello!!!");
  }
}