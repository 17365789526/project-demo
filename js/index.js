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

// 渲染薪资走势
function renderYearSalary(year) {
  // console.log(year)

  // 初始化ECharts实例
  const dom = document.querySelector('#line')
  const myChart = echarts.init(dom)

  // 定义选项和数据
  option = {
    // 标题
    title: {
      text: '2022年薪资走势',
      // left,top分别设置，距离容器左侧和顶部的距离
      left: '12',
      top: '15'
    },
    // 绘图网格
    gird: {
      top: '20%'
    },
    // y轴
    yAxis: {
      // 坐标轴类型 value，连续数据
      type: 'value',
      // 调整分割线为虚线
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
    },
    // x轴
    xAxis: {
      // 坐标轴类型，类目轴
      type: 'category',
      // 坐标轴线相关设置
      axisLine: {
        // 线段样式
        type: 'dashed',
        // 线的颜色，修改之后，文字也会一起变色
        color: '#ccc'
      },
      // 数据
      data: year.map(v => v.month)
      // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    // 系列图表
    series: [
      {
        // 数据，随机的统计数据，每次刷新图表都可能不一样
        data: year.map(v => v.salary),
        // data: [820, 932, 901, 934, 1290, 1330, 1320],
        // 标记的大小
        symbolSize: 10,
        // 线的样式
        liseStyle: {
          // 线宽
          width: 8,
          // 颜色
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [{
              offset: 0, color: '#479dee' // 0% 处的颜色
            }, {
              offset: 1, color: '#5c75f0' // 100% 处的颜色
            }],
            global: false // 缺省为 false
          }
        },
        // 折线图
        type: 'line',
        // 平滑曲线。true开启
        smooth: true,
        // 区域填充样式
        areaStyle: {
          // 填充颜色
          // 线性渐变，前四个参数分别是 x0, y0, x2, y2, 范围从 0 - 1，相当于在图形包围盒中的百分比，如果 globalCoord 为 `true`，则该四个值是绝对的像素位置
          color:
          {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: '#b2d7f7' // 0% 处的颜色
            }, {
              offset: 1, color: 'rgba(255,255,255,0)' // 100% 处的颜色
            }],
            global: false // 缺省为 false
          }
        }
      }
    ],
     // 提示框
     tooltip: {
      // 如果要show生效，需要设置tooltip属性，默认就是显示
      show: true, // false隐藏
      // 触发方式坐标轴
      trigger: 'axis'
    }
  }

  // 基于选项和数据绘制图表
  myChart.setOption(option)
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

    // 调用函数-渲染薪资走势
    renderYearSalary(year)

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