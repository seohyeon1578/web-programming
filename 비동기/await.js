function test(value) {
  return new Promise((resolve, reject) => {
    if(value >= 1){
      resolve('ok');
    }else {
      reject('error');
    }});
};

function test2(value) {
  try {
    console.log(value);
  }catch {
    console.log('error ' + value)
  }
}