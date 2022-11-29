function check() {
  const elementGender = document.querySelector('input[name="gender"]:checked')
  const elementList = document.querySelectorAll('input[type=checkbox]:checked')

  if(elementGender == null){
    alert('성별을 선택히주세요.')
    return false
  }else if(elementList.length == 0){
    alert('신청 항목을 선택해주세요.')
    return false
  }else {
    alert(elementList.length + '개 신청합니다.')
    return false
  }

}