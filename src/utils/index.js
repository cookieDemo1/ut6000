export function setItem(key,value){
  localStorage.setItem(key,value)
}

export function getItem(key){
  return JSON.parse(localStorage.getItem(key))
}

export function getQuery(obj){
  if(typeof obj !== 'object'){
    return ''
  }
  return Object.keys(obj).reduce((res, key, index) => {return res + (index === 0?'':'&') + (`${key}=${obj[key]}`)}, '')
}

// 导出请求函数，该函数返回一个promise
export function request(options){
  return new Promise((resolve, reject) => {
    // 从options中获取到path(请求路径), method(请求方法，不穿默认是GET), data(请求体数据), success(成功回调), fail(失败回调)
    const {path, method='GET', data={}, success, fail} = options
    // eslint-disable-next-line no-undef
    let request = window.XMLHttpRequest ? new XMLHttpRequest():new ActiveXObject('Microsoft.XMLHTTP')

    request.onreadystatechange = () => {
      if(request.readyState === 4){
        if(request.status >=200 && request.status < 300){
          // debugger
          let jsonStart = request.responseText.indexOf("{")
          if(jsonStart === -1){
            resolve(request.responseText)
          }else{
            resolve(request.responseText)
            // resolve(JSON.parse(request.responseText.slice(jsonStart)))
          }
        }else if(request.status >= 400){
          reject(request)
        }
      }
    }

    request.open(method, path, true)
    request.setRequestHeader('Content-Type', 'application/json;charset=utf-8')
    request.send(data)
  })
}

// Js对象转换为表单对象
export function objToFormData(obj) {
  let data = new FormData()
  for(let key in obj){
    data.append(key, obj[key])
  }
  return data
}


// 表单校验

// 校验mac地址（返回true为验证通过，返回false为验证不通过）
export function checkMac(mac){
  let reg=/^[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}$/;
  return new Promise((resolve, reject) => {
    if(reg.test(mac)){
      resolve("校验成功")
    }else{
      reject("MAC地址格式错误！")
    }
  })
}

// 端口校验
export function checkPort(port) {
  let reg = /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/
  return new Promise((resolve, reject) => {
    if(reg.test(port)){
      resolve("校验成功")
    }else{
      reject("端口值为0~65535！")
    }
  })

}

// 校验ip地址
export  function checkIp(ip) {
  let reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
  return new Promise((resolve, reject) => {
    if(reg.test(ip)){
      resolve("校验成功")
    }else{
      reject("IP地址格式错误！")
    }
  })
}

// 校验网关
export  function checkGateway(gateway) {
  let reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
  return new Promise((resolve, reject) => {
    if(reg.test(gateway)){
      resolve("校验成功")
    }else{
      reject("网关格式错误！")
    }
  })
}


// 校验子网掩码
export function checkNetmask(netmask){
  let reg = /^(254|252|248|240|224|192|128|0)\.0\.0\.0|255\.(254|252|248|240|224|192|128|0)\.0\.0|255\.255\.(254|252|248|240|224|192|128|0)\.0|255\.255\.255\.(255|254|252|248|240|224|192|128|0)$/
  return new Promise((resolve, reject) => {
    if(reg.test(netmask)){
      resolve("校验成功")
    }else{
      reject("子网掩码格式错误！")
    }
  })
}

// 校验不能为空
export function checkEmpty(value) {
  return new Promise((resolve, reject) => {
     if(value === undefined || value===''){
       reject("不能为空！")
     }else{
       resolve("校验成功！")
     }
  })
}

export function checkUsername(value) {
  return new Promise((resolve, reject) => {
    if(value === undefined || value===''){
      reject("用户名不能为空！")
    }else{
      resolve("校验成功！")
    }
  })
}

export function checkPassword(value) {
  return new Promise((resolve, reject) => {
    if(value === undefined || value===''){
      reject("密码不能为空！")
    }else{
      resolve("校验成功！")
    }
  })
}




export function validate(value, rules) {
  // console.log(value)
  // let ruless = rules.map(rule => rule(value))
  // console.log(ruless)
  console.log('validate',value, rules)
  return Promise.all(rules.map(rule => rule(value)))
}

// 将字符串准换成对象
// "ip:192.168.1.10,port:8080,id:1aed,username:root,password:123456"
// arg1: 传入的字符串， arg2:分隔符1(,), arg2:分隔符2(:)
export function transfrom(str, re1, re2){
  let ls1 = str.split(re1)

  let ls2 = ls1.map(item => {
    return item.split(re2)
  })

  let data = {}
  ls2.forEach(item => {
    data[item[0]] = item[1]
  });

  return data

}

export function getCookie(){
  return document.cookie
}

export function  setCookie() {
  document.cookie = "token=X468S4R&GHJA09*TYU!"
}

export function removeCookie() {
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
}


