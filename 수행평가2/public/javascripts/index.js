$(window).on('load', function() {
  $.ajax({
    url: '/auth/signup',
    type: 'post',
    data: { adminId: 'admin', password: 'admin' }
  })
  .done((data) => {})
  .fail((xhr, status, error) => {});
})

$(document).ready(function() {
  if($('nav ul li').length !== 0){
    $('nav ul').next().css('left', `${$('nav ul li:eq(0)').offset().left}px`);
  }
})

$(window).resize(function() {
  if($('nav ul li').length !== 0){
    $('nav ul').next().css('left', `${$('nav ul li:eq(0)').offset().left}px`);
  }
})

$(() => {
  $('nav ul li').on('click', function(e) {
    $('#line').css('left', `${e.currentTarget.offsetLeft}px`);
    $(this).addClass('now').siblings().removeClass('now')
    $.ajax({
      url: `/product/category/${e.currentTarget.value}`,
      type: 'get',
      dataType: 'json',
      success: function(res) {
        $('.item > *').remove()
        $('.admin-item > *').remove()
        for(let i=0; i<res.length; i++){
          $(`.item:eq(${i})`).append(`<img src=${res[i].fileUrl} />`)
          $(`.item:eq(${i})`).append(`<span id=${res[i].id}>${res[i].name}</span>`)
          $(`.item:eq(${i})`).append(`<span class="price">${res[i].price}</span>`)
          $(`.admin-item:eq(${i})`).append(`<img src=${res[i].fileUrl} />`)
          $(`.admin-item:eq(${i})`).append(`<span id=${res[i].id}>${res[i].name}</span>`)
          $(`.admin-item:eq(${i})`).append(`<span class="price">${res[i].price}</span>`)
        }
      }
    })
  })

  $('.item-slide').on('click', '.back', function() {
    if($('.show').index() === 0){
      $('.slide-list li').css('transform', `translateX(${($('.slide-list li').length - 2) * -164}px)`)
      $(`.slide-list li:eq(${$('.slide-list li').length - 1})`).addClass('show').siblings().removeClass('show');
    }else {
      $('.slide-list li').css('transform', `translateX(${($('.slide-list .show').index() - 2) * -164}px)`)
      $(`.slide-list li:eq(${$('.show').index() - 1})`).addClass('show').siblings().removeClass('show');
    }
  })

  $('.item-slide').on('click', '.next', function() {
    if($('.show').index() + 1 === $('.slide-list li').length){
      $('.slide-list li').css('transform', `translateX(0)`)
      $('.slide-list li:eq(1)').addClass('show').siblings().removeClass('show');
    }else {
      $('.slide-list li').css('transform', `translateX(${$('.slide-list .show').index() * -164}px)`)
      $('.show + li').addClass('show').siblings().removeClass('show');
    }
  })

  $('.item').on('click', function() {
    if ($(this).children().length !== 0) {
      openModal()
  
      $.ajax({
        url: `/product/${$('img + span', this).attr("id")}`,
        type: "get",
        dataType: 'json',
        success: function(res) {
          $('.modal').append(`<img class="close" onclick="closeModal()" src="/images/close.png"/>`)
          $('.modal').append(`<img class="big" src="${res.fileUrl}"/>`)
          $('.modal').append(`<div class="title">${res.name}</div>`)
          $('.modal').append(`<div class="price">${res.price.toLocaleString('ko-KR') + '원'}</div>`)
          $('.modal').append(`
            <div class="plus-btn-wrap">
              <button onclick="minusCnt(${res.price})"><img src="/images/remove.png"/></button>
              <span class="cnt">1</span>
              <button onclick="plusCnt(${res.price})"><img src="/images/plus.png"/></button>
            </div>
          `)
          $('.modal').append(`
            <div class="modal-bottom">
              <div><span>총 주문수량</span><span id="total-cnt">1개</span></div>
              <div><span class="mny">총 주문금액</span><span id="total-mny">${res.price.toLocaleString('ko-KR') + '원'}</span></div>
              <button class="only-btn" onclick="handleShopping()">장바구니 담기</button>
            </div>
          `)
        }
      })
    }
  })

  $('.item-slide').on('click', '.slide-list .slide img',function() {
    const cntPrev = $(this).next().text().split('개')[0]
    const mnyPrev = $(this).next().next().text().replace(',', '').split('원')[0]
    const totalCnt = $('.total-sum-cnt div').text() 
    const totalMny = $('.total-sum-mny div').text().replace(',', '').split('원')[0] 
    $('.total-sum-cnt div').text(`${Number(totalCnt) - Number(cntPrev)}`)
    $('.total-sum-mny div').text(`${(Number(totalMny) - Number(mnyPrev)).toLocaleString('ko-KR')}원`)
    $(this).closest('.slide').remove()
  })

  $('.btn-wrap .reset').on('click', function() {
    $('.item-slide > *').remove();
    $('.total-sum-cnt div').text('0')
    $('.total-sum-mny div').text('0원')
    $('.item-slide').append('<div class="none-shopping">장바구니가 비어 있습니다 </div>')
  })

  $('.modal').on('click', '.minus', function() {
    const prev = $(this).next().text()
    if(Number(prev) !== 1){
      const totalPrev = $('.modal .modal-bottom #total-cnt').text().split('개')[0]
      const onePrice = $(this).closest('.plus-btn-wrap').prev().children('.price').attr('data-price')
      const totalPrice = Number(onePrice) * (Number(prev) - 1) 
      const lastPrice = Number($('.modal .modal-bottom #total-mny').text().replace(',', '').split('원')[0]) - Number(onePrice)
      $(this).next().text(`${Number(prev) - 1}`)
      $(this).closest('.plus-btn-wrap').prev().children('.price').text(`${totalPrice.toLocaleString('ko-KR')}원`)
      $('.modal .modal-bottom #total-cnt').text(`${Number(totalPrev) - 1}개`)
      $('.modal .modal-bottom #total-mny').text(`${lastPrice.toLocaleString('ko-KR')}원`)
    }
  })

  $('.modal').on('click', '.plus', function() {
    const prev = $(this).prev().text()
    const totalPrev = $('.modal .modal-bottom #total-cnt').text().split('개')[0]
    const onePrice = $(this).closest('.plus-btn-wrap').prev().children('.price').attr('data-price')
    const totalPrice = Number(onePrice) * (Number(prev) + 1)
    const lastPrice = Number(onePrice) + Number($('.modal .modal-bottom #total-mny').text().replace(',', '').split('원')[0])
    $(this).prev().text(`${Number(prev) + 1}`)
    $(this).closest('.plus-btn-wrap').prev().children('.price').text(`${totalPrice.toLocaleString('ko-KR')}원`)
    $('.modal .modal-bottom #total-cnt').text(`${Number(totalPrev) + 1}개`)
    $('.modal .modal-bottom #total-mny').text(`${lastPrice.toLocaleString('ko-KR')}원`)
  })

  $('.item-slide').on('click', '.minus', function() {
    const prev = $(this).next().text()
    if(Number(prev) === 1) return
    const totalPrev = $('aside .total-list .total-sum-cnt div').text()
    const price =  Number($(this).closest('.plus-btn-wrap').next().text().replace(',', '').split('원')[0])
    let onePrice = price / Number(prev);
    const totalPrice = Number(onePrice) * (Number(prev) - 1)
    const lastPrice = Number($('aside .total-list .total-sum-mny div').text().replace(',', '').split('원')[0]) - Number(onePrice)
    $(this).next().text(`${Number(prev) - 1}`)
    $(this).closest('.plus-btn-wrap').next().text(`${totalPrice.toLocaleString('ko-KR')}원`)
    $('aside .total-list .total-sum-cnt div').text(`${Number(totalPrev) - 1}`)
    $('aside .total-list .total-sum-mny div').text(`${lastPrice.toLocaleString('ko-KR')}원`)
  })

  $('.item-slide').on('click', '.plus', function() {
    const prev = $(this).prev().text()
    const totalPrev = $('aside .total-list .total-sum-cnt div').text()
    const price =  Number($(this).closest('.plus-btn-wrap').next().text().replace(',', '').split('원')[0])
    let onePrice = '';
    if(prev === '1'){
      onePrice = price
    }else {
      onePrice = price / Number(prev)
    }
    const totalPrice = Number(onePrice) * (Number(prev) + 1)
    const lastPrice = Number(onePrice) + Number($('aside .total-list .total-sum-mny div').text().replace(',', '').split('원')[0])
    $(this).prev().text(`${Number(prev) + 1}`)
    $(this).closest('.plus-btn-wrap').next().text(`${totalPrice.toLocaleString('ko-KR')}원`)
    $('aside .total-list .total-sum-cnt div').text(`${Number(totalPrev) + 1}`)
    $('aside .total-list .total-sum-mny div').text(`${lastPrice.toLocaleString('ko-KR')}원`)
  })

  $('.btn-wrap .order').on('click', function() {
    openModal()
    $.ajax({
      url: '/product/select/all',
      type: "get",
      dataType: 'json',
      success: function(res) {
        let html = '<div class="order-section">'
        let totalcnt = 0
        let totalmny = 0
        for (let i = 0; i < $('.item-slide .slide-list li').length; i++){
          const title = $(`.item-slide .slide-list li:eq(${i}) h4:eq(0)`).text()
          const cnt = $(`.item-slide .slide-list li:eq(${i}) .plus-btn-wrap .cnt`).text()
          const mny = $(`.item-slide .slide-list li:eq(${i}) h4:eq(1)`).text()
          totalcnt += Number(cnt)
          totalmny += Number(mny.replace(',', '').split('원')[0])
          const now = res.filter((val) => val.name === title)
          html += `
            <div class="item-wrap">
              <img src="${now[0].fileUrl}"/>
              <div class="fnt-wrap">
                <h4>${title}</h4>
                <h4 class="price" data-price="${now[0].price}">${mny}</h4>
              </div>
              <div class="plus-btn-wrap">
                <button class="minus"><img src="/images/remove.png"/></button>
                <span class="cnt">${cnt}</span>
                <button class="plus"><img src="/images/plus.png"/></button>
              </div> 
            </div>`
        }
        html += '</div>'
        $('.modal').append(`
          <div class="order-head">
            <div class="three now">주문 확인</div>
            <div class="three">결제</div>
            <div class="three">확인</div>
          </div>
        `)
        $('.modal').append(html)
        $('.modal').append(`
          <div class="modal-bottom">
            <div><span>총 주문수량</span><span id="total-cnt">${totalcnt}개</span></div>
            <div><span class="mny">총 주문금액</span><span id="total-mny">${totalmny.toLocaleString('ko-KR')}원</span></div>
            <button class="first-btn" onclick="closeModal()">이전</button>
            <button class="next-btn">다음</button>
          </div>
        `)
      }
    })
  })

  $('.modal').on('click', '.modal-bottom .next-btn', function() {
    $('.modal .order-section > *').remove();
    $('.modal .modal-bottom button').remove();
    $('.modal .order-head div:eq(1)').addClass('now').siblings().removeClass('now')
    $('.modal .order-section').append("<img class='waiting' src='/images/waiting.png'/>")
    $('.modal .order-section').append("<h4 class='fnt'>카드를 넣어주세요</h4>")
    $('.modal .modal-bottom').append("<button class='only-btn cancel'>취소</button>")
    setTimeout(function() {
      $('.modal .order-section > *').remove();
      $('.modal .order-head div:eq(2)').addClass('now').siblings().removeClass('now')
      $('.modal .order-section').append("<img class='waiting' src='/images/finish.png'/>")
      $('.modal .order-section').append("<h4 class='fnt'>결제가 완료되었습니다</h4>")
      $('.modal .modal-bottom .only-btn').text('확인')
      $('.modal .modal-bottom .only-btn').addClass('finish')
      $('.modal .modal-bottom .only-btn').removeClass('cancel')
    }, 3000)
  })

  $('.modal').on('click', '.modal-bottom .finish', function() {
    closeModal()
    $('.item-slide > *').remove();
    $('.total-sum-cnt div').text('0')
    $('.total-sum-mny div').text('0원')
    $('.item-slide').append('<div class="none-shopping">장바구니가 비어 있습니다 </div>')
  })
})

function openModal() {
  $('.modal-container').css('display', 'block');
  $('.modal').css('display', 'block');
}

function closeModal() {
  $('.modal-container').css('display', 'none');
  $('.modal').css('display', 'none');
  $('.modal > *').remove();
}

function plusCnt(onePrice) {
  const prev = $('.modal .cnt').text()
  const totalPrev = $('.modal .modal-bottom #total-cnt').text().split('개')[0]
  const totalPrice = Number(onePrice) * (Number(prev) + 1) 
  $('.modal .cnt').text(`${Number(prev) + 1}`)
  $('.modal .modal-bottom #total-cnt').text(`${Number(totalPrev) + 1}개`)
  $('.modal .modal-bottom #total-mny').text(`${totalPrice.toLocaleString('ko-KR')}원`)
}

function minusCnt(onePrice) {
  const prev = $('.modal .cnt').text()
  if(Number(prev) !== 1){
    const totalPrev = $('.modal .modal-bottom #total-cnt').text().split('개')[0]
    const totalPrice = Number(onePrice) * (Number(prev) - 1) 
    $('.modal .cnt').text(`${Number(prev) - 1}`)
    $('.modal .modal-bottom #total-cnt').text(`${Number(totalPrev) - 1}개`)
    $('.modal .modal-bottom #total-mny').text(`${totalPrice.toLocaleString('ko-KR')}원`)
  }
}

function handleShopping() {
  const cntPrev = $('.total-sum-cnt div').text() 
  const mnyPrev = $('.total-sum-mny div').text() 
  const totalCnt = $('.modal .modal-bottom #total-cnt').text().split('개')[0]
  const totalMny = $('.modal .modal-bottom #total-mny').text()
  if($('.item-slide').children().length === 1){
    $('.item-slide .none-shopping').css('display', 'none')
    $('.item-slide').append('<img src="/images/back.png"  class="back"/>')
    $('.item-slide').append(`
      <ul class="slide-list">
        <li class="slide show">
          <h4>${$('.modal .title').text()}</h4>
          <img src="/images/close.png"/>
          <div class="plus-btn-wrap">
            <button class="minus"><img src="/images/remove.png"/></button>
            <span class="cnt">${totalCnt}</span>
            <button class="plus"><img src="/images/plus.png"/></button>
          </div> 
          <h4>${totalMny}</h4>
        </li>
      </ul>
    `)
    $('.item-slide').append('<img src="/images/next.png"  class="next"/>')
  }else {
    $('.item-slide .slide-list').append(`
      <li class="slide">
        <h4>${$('.modal .title').text()}</h4>
        <img src="/images/close.png"/>
        <div class="plus-btn-wrap">
          <button class="minus"><img src="/images/remove.png"/></button>
          <span class="cnt">${totalCnt}</span>
          <button class="plus"><img src="/images/plus.png"/></button>
        </div> 
        <h4>${totalMny}</h4>
      </li>
    `)
  }
  $('.total-sum-cnt div').text(`${Number(cntPrev) + Number(totalCnt.split('개')[0])}`)
  $('.total-sum-mny div').text(`${(Number(mnyPrev.replace(',', '').split('원')[0]) + Number(totalMny.replace(',', '').split('원')[0])).toLocaleString('ko-KR')}원`)
  closeModal()
}