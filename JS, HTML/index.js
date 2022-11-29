function check() {
  const elementId = document.getElementById('userid')
  const elementBirthday = document.getElementById('birthday')
  const elementPass = document.getElementById('password')
  const elementPass2 = document.getElementById('password2')

  if(elementId.value.length == 0){
    alert('아이디를 입력하세요')
    return false;
  }else if(elementBirthday.value.length==0 || elementBirthday.value.length != 6 || isNaN(elementBirthday.value)){
    alert('올바른 생년월일을 입력하세요.')
    return false;
  }else if(elementPass.value.length < 4){
    alert('비밀번호는 4글자이상 입력하세요.')
    return false;
  }else if(elementPass.value != elementPass2.value){
    alert('비밀번호가 일치하지 않습니다.')
    return false;
  }else {
    return true;
  }

}