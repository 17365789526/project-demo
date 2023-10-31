// 调用判断是否登录的函数
checkLogin()

// 调用渲染用户名的函数
renderUsername()

// 调用退出登录函数 给退出按钮注册点击事件
registerLogout()

// 首页-统计数据
async function getData() {
  const token = localStorage.getItem('token')
  // 调用接口后(登录成功之后才可以调用)
  const res = await axios({
    url: '/dashboard',
    // 请求头中携带token
    // 不携带token,直接报错
    headers: {
      Authorization: token
    }
  })
  // console.log(res)
  const overview = res.data.data.overview
  console.log(overview)

  // 渲染数据
  Object.keys(overview).forEach(key => {
    document.querySelector(`.${key}`).innerHTML = overview[key]
  })
}

getData()