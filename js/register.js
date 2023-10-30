// 测试配置结果(axios基地址)
document.querySelector('#btn-register').addEventListener('click', () => {
  axios({
    url: '/register',
    method: 'POST',
    data: {
      username: 'xiaomi002',
      password: '123456'
    }
  })
})