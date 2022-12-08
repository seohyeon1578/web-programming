function test(value) {
  return new Promise((resolve, reject) => {
    if(value >= 1){
      resolve('ok');
    }else {
      reject('error');
    }});
};

function test2(value) {
  return new Promise((resolve, reject) => {
    console.log('test2 ' + value);
    resolve('finished');
  });
};

function test3(value) {
  console.log(value);
}

test(1)
.then(test2)
.then(test3)
.catch(error => console.log(error))