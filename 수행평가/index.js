/** domain의 값 변경 */
function changeDomain(who = 0) {
  const domainListEl = document.querySelectorAll('#domain-list')
  const domainInputEl = document.querySelectorAll('#domain')

  const idx = domainListEl[who].options.selectedIndex;
  const val = domainListEl[who].options[idx].value;

  domainInputEl[who].value = val;
}

let result = false;

/** 사업자등록번호 체크 */
function checkCorporateRegiNumber() {
  const number = document.getElementById('corporateRegiNumber').value;
  const numberMap = number.replace(/-/gi, "").split("").map((val) => {
    return parseInt(val)
  });

  if(numberMap.length == 10){
    const keyArr = [1, 3, 7, 1, 3, 7, 1, 3, 5]
    let checkSum = 0;

    keyArr.forEach((val, idx) => {
      checkSum += val * numberMap[idx];
    });

    checkSum += parseInt((keyArr[8] * numberMap[8]) / 10);
    result = Math.floor(numberMap[9] === ((10 - (checkSum % 10)) % 10));
  } else {
    dangerAlert('사업자등록번호를 정확히 입력해주세요.')
  }
}

/** 전체 확인 */
function checkAll() {
  const corporateEl = document.getElementById('corporateRegiNumber');
  const companyEl = document.getElementById('company');
  const agentEl = document.getElementById('agent');
  const phoneNumberEl = document.querySelectorAll('#phone-number');
  const emailEl = document.querySelectorAll('#email');
  const domainEl = document.querySelectorAll('#domain');
  const domainListEl = document.querySelectorAll('#domain-list')
  const clientIdEl = document.getElementById('client-id');
  const passwordEl = document.getElementById('password');
  const confirmPasswordEl = document.getElementById('confirm-password');
  const managerNameEl = document.getElementById('manager-name');
  const faxEl = document.getElementById('fax');
  const companySizeEl = document.querySelector('input[name="company-size"]:checked');
  const methodEl = document.querySelector('input[name="method"]:checked');
  const agreeEl = document.querySelector('input[name="agree"]:checked');
  
  // 0으로 시작해서 0~9사이의 1~2자이고, -이 있어야 되며 0~9사이의 3~4글자 0~9사이 4글자 이어야한다.
  const phoneNumberchk = /^0([0-9]{1,2})-([0-9]{3,4})-([0-9]{4})$/; 
  // 6~20자의 영문 소문자 + 숫자여야한다.
  const clientIdchk =  /^[a-z0-9]{5,20}$/;
  // 8~16자, 영문, 숫자, 특수문자의 조합이로 이루어져야 한다.
  const passwordchk = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
  // 첫글자는 A~z 또는 0~9의 숫자여야한다
  const emailchk = /^[A-z|0-9]([A-z|0-9]*)$/;
  // 영어만 입력하고 반점 필요 소문자 a~z까지 2~6자, a~z까지 2자이상이여야 한다
  const domainchk = /^([A-z]*)\.([a-z]{2,6}(?:\.[a-z]{2,})?)$/;
  // 숫자만 입력가능하고 -이 입력되어야하며 처음은 2~4자 중간 3~4자 마지막은 4자여야 한다.
  const faxchk = /^([0-9]{2,4})-([0-9]{3,4})-([0-9]{4})$/;

  if(!result){
    dangerAlert('사업자등록번호의 확인버튼을 눌러주세요.');
    corporateEl.focus();
    return false;
  }

  if(companyEl.value.length == 0){
    dangerAlert('상호명을 입력해주세요.');
    companyEl.focus();
    return false;
  }

  if(agentEl.value.length == 0){
    dangerAlert('대표자를 입력해주세요.');
    agentEl.focus();
    return false;
  }

  if(phoneNumberEl[0].value.length !== 0){
    if(!phoneNumberchk.test(phoneNumberEl[0].value)){
      dangerAlert('대표전화를 정확히 입력해주세요.(\'-\' 포함되어야 합니다.)');
      phoneNumberEl[0].focus();
      return false;
    }
  }

  if(emailEl[0].value.length !== 0) {
    if(!emailchk.test(emailEl[0].value)){
      dangerAlert('이메일을 정확히 입력해주세요.')
      emailEl[0].focus();
      return false;
    } else if(domainListEl[0].value === 'direct') {
      if(!domainchk.test(domainEl[0].value)){
        dangerAlert('도메인을 정확히 입력해주세요.')
        domainEl[0].focus();
        return false;
      }
    }
  }

  if(clientIdEl.value.length == 0){
    dangerAlert('거래처ID를 입력해주세요.');
    clientIdEl.focus();
    return false;
  }else if(!clientIdchk.test(clientIdEl.value)) {
    dangerAlert('거래처ID는 6~20자의 영문 소문자, 숫자만 사용 가능합니다.');
    clientIdEl.focus();
    return false;
  }

  if(passwordEl.value.length == 0){
    dangerAlert('비밀번호를 입력해주세요.');
    passwordEl.focus();
    return false;
  }else if(!passwordchk.test(passwordEl.value)) {
    dangerAlert('비밀번호는 8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.');
    passwordEl.focus();
    return false;
  }

  if(passwordEl.value !== confirmPasswordEl.value){
    dangerAlert('비밀번호가 일치하기 않습니다.');
    confirmPasswordEl.focus();
    return false;
  }

  if(companySizeEl == null){
    dangerAlert('기업분류를 선택해주세요.');
    return false;
  }

  if(managerNameEl.value.length === 0) {
    dangerAlert('담당자 이름을 입력해주세요.');
    managerNameEl.focus();
    return false;
  }

  if(emailEl[1].value.length !== 0) {
    if(!emailchk.test(emailEl[1].value)){
      dangerAlert('이메일을 정확히 입력해주세요.')
      emailEl[1].focus();
      return false;
    } else if(domainListEl[1].value === 'direct') {
      if(!domainchk.test(domainEl[1].value)){
        dangerAlert('도메인을 정확히 입력해주세요.')
        domainEl[1].focus();
        return false;
      }
    }
  }

  if(phoneNumberEl[1].value.length !== 0){
    if(!phoneNumberchk.test(phoneNumberEl[1].value)){
      dangerAlert('담당자전화를 정확히 입력해주세요.(\'-\' 포함되어야 합니다.)');
      phoneNumberEl[1].focus();
      return false;
    }
  }

  if(faxEl.value.length !== 0) {
    if(!faxchk.test(faxEl.value)){
      dangerAlert('팩스번호를 정확히 입력해주세요.');
      faxEl.focus();
      return false;
    }
  }

  if(methodEl == null){
    dangerAlert('처리방법을 선택해주세요.');
    return false;
  }

  if(agreeEl == null){
    dangerAlert('개인정보 동의를 선택해주세요.');
    return false;
  }

};

/** 실패 Alert 뛰우는 함수 */
function dangerAlert(text) {
  const alertEl = document.getElementById('alert')
  let new_text_tag = document.createElement('h3');

  new_text_tag.setAttribute('class', 'alert-text')
  new_text_tag.innerHTML = text;
  
  alertEl.appendChild(new_text_tag);
  alertEl.setAttribute('class', 'action');

  setTimeout(function() {
    alertEl.classList.remove('action');
    alertEl.removeChild(new_text_tag);
  }, 3000);
};