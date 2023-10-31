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
})

// 添加响应拦截器
// 统一处理token过期
axios.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么,比如: 数据剥离
  return response;
}, function (error) {
  // console.dir(error)
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么: 比如统一处理token失效
  // 统一处理token失效
  if (error.response.status === 401) {
    // 弹框提示用户
    showToast('请重新登录')
    // 删除缓存
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    // 返回登录页
    setTimeout(() => {
      location.href = 'login.html'
    }, 1500)
  }
  return Promise.reject(error);
})