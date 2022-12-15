function login() {
  const data = {
    adminId: $('#adminId').val(),
    password: $('#password').val(),
  };

  $.ajax({
    type: "post",
    url: '/auth/login',
    data: data,
    success: function(res) {
      localStorage.setItem('token', res.token);
      window.location.href='/product'
    },
    error: function(res) {
      window.location.href='/product'
    }
  })
}