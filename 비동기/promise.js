function test(value) {
  return new Promise((resolve, reject) => {
    if(value >= 1){
      resolve('ok');
    }else {
      reject('error');
    }});
};

test(1)
.then((result) => console.log(result))
.catch((error) => console.log(error))

