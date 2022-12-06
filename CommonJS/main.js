// require 문구를 이용해 필요한 모듈을 불러와 객체에 저장한다.

//commonJS
// const data = require('./obj');
// const util = require('./each');

// console.log(data);
// data.sayHello;

// console.log(util.message);
// util.hello(data.user);
// util.bye();

//ES6
import obj from "./obj.js";
import { message, hello, bye } from "./each.js";

console.log(obj);
obj.sayHello();

console.log(message);
hello(obj.user);
bye();