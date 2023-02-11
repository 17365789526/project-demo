// 上面这个代码处理过度动画（默认加上不用管）
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.body.classList.add('sidenav-pinned')
    document.body.classList.add('ready')
  }, 200)
})


// 封装轻提示函数 tip
const toastBox = document.querySelector('#myToast')
  const toast = new bootstrap.Toast(toastBox, {
  animation: true,    // 开启过度动画
  autohide: true,     // 开启自动隐藏
 delay: 3000         // 3000ms后自动隐藏
})

const tip = (msg) => {
  toastBox.querySelector('.toast-body').innerHTML = msg
  toast.show()
}