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