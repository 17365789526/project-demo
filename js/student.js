// 整合函数-登录校验
checkLogin()

// 整合函数-渲染用户名
renderUsername()

// 整合函数-退出登录逻辑
registerLogout()

// 抽取函数-获取学员数据
async function getData() {
  const res = await axios.get('/students')
  // console.log(res)
  // 渲染数据
  const html = res.data.map(v => {
    const { name, age, gender, group, hope_salary, salary, province, city, area, id } =v
    return `
      <tr>
        <td>${name}</td>
        <td>${age}</td>
        <td>${gender === 0 ? '男' : '女'}</td>
        <td>第${group}组</td>
        <td>${hope_salary}</td>
        <td>${salary}</td>
        <td>${province + city + area}</td>
        <td data-id="${id}">
          <a href="javascript:;" class="text-success mr-3"><i class="bi bi-pen"></i></a>
          <a href="javascript:;" class="text-danger"><i class="bi bi-trash"></i></a>
        </td>
      </tr>
    `
  }).join('')

  document.querySelector('.list').innerHTML = html

  document.querySelector('.total').innerText = res.data.length
}

getData()