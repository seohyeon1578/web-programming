$(() => {
  $('.logout').on('click', function() {
    localStorage.removeItem('token')
    window.location.href = '/auth'
  })

  $('.add').on('click', function() {
    openModal()
    selectModal()
  })

  $('.modal').on('click', '.add-product', function() {
    $(this).addClass('now-add')
    $('.add-category').removeClass('now-add')
  })

  $('.modal').on('click', '.add-category', function() {
    $(this).addClass('now-add')
    $('.add-product').removeClass('now-add')
  })

  $('.modal').on('click', '.add-next-btn', function() {
    if ($('.modal .add-product').attr('class').match('now-add')){
      $('.modal > *').remove()
      setModal()
    } else {
      $('.modal > *').remove()
      categorySetModal()
    }
  })

  $('.modal').on('click', '.add2-next-btn', function(e) {
    e.preventDefault();
    $('.category-wrap').css('display', 'none')
    $('.title-wrap').css('display', 'none')
    $('.price-wrap').css('display', 'none')
    $('.modal #add-product #file-label ').css('display', 'block')
    $('.modal #add-product input[type=file]').css('display', 'block')
    $('.modal .first-btn').removeClass('select-prev')
    $('.modal .first-btn').addClass('content-prev')
    $('.modal .order-head div:eq(1)').addClass('now').siblings().removeClass('now')
    $(this).text("완료")
    $(this).attr("id", "add-product-btn")
    $(this).removeClass('add2-next-btn')
  })

  $('.modal').on('click', '.add3-next-btn', function(e) {
    e.preventDefault();
    $('.category-wrap').css('display', 'none')
    $('.title-wrap').css('display', 'none')
    $('.price-wrap').css('display', 'none')
    $('.modal #add-product #file-label ').css('display', 'block')
    $('.modal #add-product input[type=file]').css('display', 'block')
    $('.modal .first-btn').removeClass('select-prev')
    $('.modal .first-btn').addClass('content-prev')
    $('.modal .order-head div:eq(1)').addClass('now').siblings().removeClass('now')
    $(this).text("완료")
    $(this).attr("data-id", `${$(this).attr('id')}`)
    $(this).attr("id", "put-product-btn")
    $(this).removeClass('add3-next-btn')
  })

  $('.modal').on('click', '#put-product-btn', function(){
    const data = new FormData($('#add-product')[0]);
    data.append('category', $('.category option:selected').val());
    const id = $(this).attr('data-id')
    $.ajax({
      url: `/product/${id}`,
      type: 'PUT',
      data: data,
      contentType: false,
      processData: false,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      success: function(res) {
        window.location.href ='/product'
      },
      error: function(err) {
        window.location.href= '/product'
      }
    })
  })

  $('.modal').on('click', '#add-product-btn', function(){
    const data = new FormData($('#add-product')[0]);
    data.append('category', $('.category option:selected').val());
  
    $.ajax({
      url: '/product',
      type: 'post',
      data: data,
      contentType: false,
      processData: false,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      success: function(res) {
        window.location.href ='/product'
      }
    })
  })

  $('.modal').on('click', '#add-category-btn', function() {
    const data = 'name=' + $('#name').val();
  
    $.ajax({
      url: '/product/category',
      type: 'post',
      data: data,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      success: function(res) {
        window.location.href = '/product'
      }
    })
  })

  $('.modal').on('click', '.select-prev', function() {
    $('.modal > *').remove()
    selectModal()
  })

  $('.modal').on('click', '.content-prev', function() {
    $('.category-wrap').css('display', 'block')
    $('.title-wrap').css('display', 'block')
    $('.price-wrap').css('display', 'block')
    $('.modal #add-product #file-label ').css('display', 'none')
    $('.modal #add-product input[type=file]').css('display', 'none')
    $('.modal .order-head div:eq(0)').addClass('now').siblings().removeClass('now')
    $(this).next().text("다음")
    $(this).next().attr("id", "")
    $(this).next().addClass('add2-next-btn')
    $(this).removeClass('content-prev')
    $(this).addClass('select-prev')
  })

  $('.modal').on('change', '#file', function(e) {
    let file = event.target.files[0];

    let reader = new FileReader(); 
    reader.onload = function(e) {
        $("#preview").attr("src", e.target.result);
    }

    reader.readAsDataURL(file);
  })

  $('.admin-item').on('click', function() {
    if($(this).children('.cover').length !== 0){
      $(this).children().remove('.cover')
    } else {
      $(this).append(`
        <div class="cover">
          <button class="remove-btn">삭제</button>
          <button class="edit-btn">수정</button>
        </div>
      `)
    }
  })

  $('.admin-item').on('click', '.cover .remove-btn', function() {
    const id = $(this).parent().prev().prev().attr('id')
    $.ajax({
      url: `/product/${id}`,
      type: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      success: function(res) {
        window.location.href= '/product'
      },
      error: function() {
        window.location.href= '/product'
      }
    })
  })

  $('.admin-item').on('click', '.cover .edit-btn', function() {
    const id = $(this).parent().prev().prev().attr('id')
    openModal();
    $.ajax({
      url: '/product/select/category',
      type: "get",
      dataType: 'json',
      success: function(res) {
        let categorys = res
        $.ajax({
          url: `/product/${id}`,
          type: "get",
          dataType: 'json',
          success: function(res) {
            let html = ""
            html += '<div class="order-section">'
            html += '<form id="add-product" enctype="multipart/form-data" onsubmit="addProduct()">'
            html += '<label id="file-label" for="file" style="display:none"><img src="/images/image.png" id="preview"/></label>'
            html += '<input type="file" name="file" id="file" style="display:none"/>'
            html += '<div class="category-wrap">'
            html += '<label>카테고리</label>'
            html += '<select class="category">'
            for(let i = 0; i < categorys.length; i++) {
              if(res.category === categorys[i].id){
                html += `<option value="${categorys[i].id}" selected>${categorys[i].name}</option>`
              } else {
                html += `<option value="${categorys[i].id}">${categorys[i].name}</option>`
              }
            }
            html += '</select>'
            html += '</div>'
            html += '<div class="title-wrap">'
            html += '<label>상품명</label>'
            html += `<input type="text" name="name" id="name" value=${res.name} />`
            html += '</div>'
            html += '<div class="price-wrap">'
            html += '<label>상품 가격</label>'
            html += `<input type="text" name="price" id="price" value=${res.price} />`
            html += '</div>'
            html += '</form>'
            html += '</div>'
            $('.modal').append(`
              <div class="order-head">
                <div class="two now">제품 설정</div>
                <div class="two">이미지 추가</div>
              </div>
            `)
            $('.modal').append(html)
            $('.modal').append(`
              <div class="modal-bottom">
                <button class="first-btn select-prev">이전</button>
                <button class="add3-next-btn" id=${id}>다음</button>
              </div>
            `)
          }
        })
      }
    })
  })
})

function setModal() {
  $.ajax({
    url: '/product/select/category',
    type: "get",
    dataType: 'json',
    success: function(res) {
      let html = ""
      html += '<div class="order-section">'
      html += '<form id="add-product" enctype="multipart/form-data" onsubmit="addProduct()">'
      html += '<label id="file-label" for="file" style="display:none"><img src="/images/image.png" id="preview"/></label>'
      html += '<input type="file" name="file" id="file" style="display:none"/>'
      html += '<div class="category-wrap">'
      html += '<label>카테고리</label>'
      html += '<select class="category">'
      for(let i = 0; i < res.length; i++) {
        html += `<option value="${res[i].id}">${res[i].name}</option>`
      }
      html += '</select>'
      html += '</div>'
      html += '<div class="title-wrap">'
      html += '<label>상품명</label>'
      html += '<input type="text" name="name" id="name"/>'
      html += '</div>'
      html += '<div class="price-wrap">'
      html += '<label>상품 가격</label>'
      html += '<input type="text" name="price" id="price"/>'
      html += '</div>'
      html += '</form>'
      html += '</div>'
      $('.modal').append(`
        <div class="order-head">
          <div class="two now">제품 설정</div>
          <div class="two">이미지 추가</div>
        </div>
      `)
      $('.modal').append(html)
      $('.modal').append(`
        <div class="modal-bottom">
          <button class="first-btn select-prev">이전</button>
          <button class="add2-next-btn">다음</button>
        </div>
      `)
    }
  })
}

function selectModal() {
  $('.modal').append(`
    <div class="add-category">
      <img src="/images/category.png"/>
      <h4>카테고리 추가</h4>
    </div>
  `)
  $('.modal').append(`
    <div class="add-product">
      <img src="/images/product.png"/>
      <h4>제품 추가</h4>
    </div>
  `)
  $('.modal').append(`
    <div class="modal-bottom">
      <button class="first-btn" onclick="closeModal()">이전</button>
      <button class="add-next-btn">다음</button>
    </div>
  `)
}

function categorySetModal() {
  $('.modal').append(`
    <div class="order-section">
      <form id="add-category">
        <div class="category-name-wrap">
          <label for="name">카테고리</label>
          <input type="text" name="name" id="name"/>
        </div>
      </form>
    </div>
  `)
  $('.modal').append(`
    <div class="modal-bottom">
      <button class="first-btn" onclick="closeModal()">취소</button>
      <button id="add-category-btn">완료</button>
    </div>
  `)
}

function addCategory() {
  const data = 'name=' + $('#name').val();
  
  $.ajax({
    url: '/product/category',
    type: 'post',
    data: data,
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    success: function(res) {
      window.location.href = '/product'
    }
  })
}