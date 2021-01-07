import {h} from 'preact'

import './style.css'
import {useState} from "preact/hooks";
import {checkUsername, checkPassword, validate, request,setCookie} from "../../utils";

const Login = ({onLogin})=> {

  // 校验
  const form_rule = {
    username: {name: "username", rules: [checkUsername]},
    password: {name: "password", rules: [checkPassword]}
  }

  // 错误信息
  const [message, setMessage] = useState({username: '', password: ''})



  const [form, setForm] = useState({
    username: undefined,
    password: undefined,
  })

  // 设置值
  const  handleChange = (e) => {
    // 将原先的form设置成
    let temp_form = form
    temp_form[e.target.name] = e.target.value
    setForm(temp_form)
  }

  // 表单校验，失去焦点的时候校验
  const checkData = (e)=> {
    let name = e.target.name
    let value = e.target.value
    console.log(name, value)
    validate(value, form_rule[name].rules).then(res => {
      let message2 = {}
      Object.assign(message2, message)
      message2[name] = ''
      setMessage(message2)
    }).catch(err => {
      // console.log(err)
      let message2 = {}
      Object.assign(message2, message)
      message2[name] = err
      setMessage(message2)
    })
  }

  // 提交的时候校验表单的全部数据
  const checkDataAll = (form) => {

    return new Promise((resolve, reject) => {
      let result = {}
      // tag标志，校验全部数据,1个数据校验成功就push一个true,1个失败就push一个false.
      Object.keys(form).forEach(key => {
        validate(form[key], form_rule[key].rules).then(res =>{
          let message2 = {}
          Object.assign(message2, message)
          message2[key] = ''
          setMessage(message2)
        }).catch(err => {
          let message2 = {}
          message2[key] = err
          result = {...result, ...message2}
          setMessage(result)
        })
      })
      resolve()
    })
  }


  // 登录函数
  const login = async ()=> {
    // 验证用户和密码是否为空
    await checkDataAll(form)
    let keys = Object.keys(message)
    for(let i=0; i<keys.length; i++){
      // 如果message有消息代表数据不正确，
      if(message[keys[i]] !== ''){
        alert("请输入正确的用户名和密码！")
        return
      }
    }

    let data = JSON.stringify(form)
    let status = "status:success".split(":")[1]
    console.log(status)
    request({method:'post', path: '/login', data}).then(res => {
      let status = res.split(":")[1]
      if(status === 'success'){
        // 发送请求，将用户名和密码发送到后端，后端返回token,接收到token之后，跳转到首页
        // localStorage.setItem('token', 'X468S4R&GHJA09*TYU!')
        setCookie()
        // onLogin为登录
        onLogin()
      }else{
        alert("请输入正确的用户名和密码！")
      }
    }).catch(err => {
      alert("登录失败！")
    })

    // 本地运行打开，否则无法进入首页
    // localStorage.setItem('token', 'X468S4R&GHJA09*TYU!')
    setCookie()
    onLogin()
  }

  return(
    <div className={"root"}>
      <div className="login">
        <h3 className="login-tip">请登录</h3>
        <span>username</span>
        <input type="text"  name="username" value={form.username} maxLength={32}
               onChange={handleChange} onBlur={checkData} className="my-input"/>
        <p className="tip">{message.username}</p>


        <span>password</span>
        <input type="password"  name="password" value={form.password} maxLength={32}
               onChange={handleChange} onBlur={checkData} className="my-input"/>
        <p className="tip">{message.password}</p>
        <button onClick={login}>Sign In</button>
      </div>
    </div>
  )
}

export default Login