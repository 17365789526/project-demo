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

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 可以通过headers,查看+设置请求头
  // config.headers['info'] = 'itheima66'
  // 每次发送请求,都会执行这个回调函数
  // console.log(config)
  // 在发送请求之前做些什么,比如: 统一设置token
  const token = localStorage.getItem('token')
  // token存在,才携带
  if (token) {
    config.headers['Authorization'] = token
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});