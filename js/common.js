// 配置axios基地址
axios.defaults.baseURL = 'https://hmajax.itheima.net'

// 抽取请提示函数
function showToast(msg) {
  const toastDom = document.querySelector('.my-toast')
  // 实列化toast组件
  const toast = new bootstrap.Toast(toastDom)
  // 修改内容并显示
  document.querySelector('.toast-body').innerText = msg
  toast.show()
}
// showToast('你好吗？')

// 抽取校验函数 (判断是否登录)
function checkLogin() {
  // 判断token
  const token = localStorage.getItem('token')
  // console.log(token)
  // token为null说明没有缓存
  if (token === null) {
    showToast('请先登录')
    setTimeout(() => {
      location.href = 'login.html'
    },1500)
  }
}

// 抽取渲染函数 (渲染缓存中的用户名)
function renderUsername() {
  // 读取并渲染用户名
  const username = localStorage.getItem('username')
  // console.log(username)
  document.querySelector('.username').innerText = username
}

// 抽取退出登录函数
function registerLogout() {
  document.querySelector('#logout').addEventListener('click', () => {
    // console.log('退出了')
    // 删除缓存并跳转登录页
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    location.href = 'login.html'
  })
}

