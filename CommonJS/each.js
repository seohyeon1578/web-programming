// 함수나 변수를 module.exports 객체에 필요한 만큼 각각 추가한다.

// commonJS
// module.exports.message = "Util module";

// module.exports.hello = (user) => {
//   console.log(`Hello ${user}`);
// };

// module.exports.bye = () => {
//   console.log('bye');
// }

//EX6
const message = "Util module";

const hello = (user) => {
  console.log(`Hello ${user}`);
};

const bye = () => {
  console.log('bye');
};

export{
  message,
  hello,
  bye
}