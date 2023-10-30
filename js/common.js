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