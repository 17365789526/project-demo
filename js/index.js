// 调用判断是否登录的函数
checkLogin()

// 调用渲染用户名的函数
renderUsername()

// 调用退出登录函数 给退出按钮注册点击事件
registerLogout()

// 渲染顶部数据的函数
function renderOverview(overview) {
  Object.keys(overview).forEach(key => {
    document.querySelector(`.${key}`).innerHTML = overview[key]
  })
}

// 首页-统计数据
async function getData() {
  // const token = localStorage.getItem('token')
  // try {
    // 调用接口后(登录成功之后才可以调用)
    const res = await axios({
      url: '/dashboard',
      // 请求头中携带token
      // 不携带token,直接报错
      // headers: {
      //   Authorization: token
      // }
    })
    // console.log(res)
    // const overview = res.data.overview
    const { overview, year, salaryData, groupData, provinceData } = res.data
    // console.log(overview)
  
    //  调用函数-渲染顶部数据
    renderOverview(overview)
  // } catch (error) {
  //   // 首页-登录状态过期
  //   // 判断token失效 (状态码401) :token过期,token被篡改
  //   if (error.response.status === 401) {
  //     // 删除缓存并提示用户
  //     localStorage.removeItem('token')
  //     localStorage.removeItem('username')
  //     // 使用普通用户可以理解的方式提示他们
  //     showToast('请重新登录')

  //     // 返回登录页
  //     setTimeout(() => {
  //       location.href = 'login.html'
  //     }, 1500)
  //   }
  // }
}

getData()