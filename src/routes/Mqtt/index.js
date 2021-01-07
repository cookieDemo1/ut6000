import {h} from 'preact'
import {useEffect, useState} from "preact/hooks";
import {checkEmpty, checkGateway, checkIp, checkPort, objToFormData, request, transfrom, validate} from "../../utils";

const Mqtt = ()=> {

  // 校验
  const form_rule = {
    ip: {name:"ip", rules: [checkEmpty]},
    port: {name: "port", rules: [ checkEmpty, checkPort]},
    id: {name: "id", rules: [ checkEmpty]},
    username: {name: "username", rules: [ checkEmpty]},
    password: {name: "password", rules: [ checkEmpty]}
  }

  // 错误信息
  const [message, setMessage] = useState({ip: '', port: '', id: '', username: '', password: ''})


  const [form, setForm] = useState({
    ip: undefined,
    port: undefined,
    id: undefined,
    username: undefined,
    password: undefined
  })

  // 获取页面信息
  useEffect(()=>{
    getFormData()
  },[])
  const getFormData = ()=> {
    request({
      method: 'get',
      path: '/mqtt/getMqttData',
    }).then(res => {

      let data = transfrom(res, ',', ':')
      setForm({...form, ...data})

    }).catch(err => {
      console.log(err)
    })
  }


  // 设置值
  const  handleChange = (e) => {
    // 将原先的form设置成
    let temp_form = form
    temp_form[e.target.name] = e.target.value
    setForm(temp_form)
  }

  const apply = () => {

    console.log(form)
    // 1.校验数据
    let tags = checkDataAll(form)
    let keys = Object.keys(message)
    for(let i=0; i<keys.length; i++){
      // 如果message有消息代表数据不正确，
      if(message[keys[i]] !== ''){
        alert("请输入正确的数据！")
        return
      }
    }

    // 2.将js对象转换为表单对象
    let data = JSON.stringify(form)
    request({
      method: 'post',
      path: '/mqtt/setMqttData',
      data
    }).then(res => {
      alert("设置成功")
    }).catch(err => {
      alert("设置失败")
    })
  }

  // 提交的时候校验表单的全部数据
  const checkDataAll = (form) => {
    // tag标志，校验全部数据,1个数据校验成功就push一个true,1个失败就push一个false.

    let result = {}

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


  // 重置表单
  const reset = ()=> {
    getFormData()

    // setForm({
    //   ip: '',
    //   port: '',
    //   id: '',
    //   username: '',
    //   password: ''
    // })
  }


  return(
    <div id="ip">
      <div className={"ip-setting"}>
        <p>MQTT配置</p>

        <ul>
          <li>
            <span>IP地址</span>
            <input type="text" name="ip" value={form.ip} onChange={handleChange} onBlur={checkData} maxLength={128}/>
            <span id="err">{message.ip}</span>
          </li>
          <li>
            <span>端口</span>
            <input type="text" name="port" value={form.port} onChange={handleChange} onBlur={checkData} maxLength={5}/>
            <span id="err">{message.port}</span>
          </li>
          <li>
            <span>客户端ID</span>
            <input type="text" name="id" value={form.id} onChange={handleChange} onBlur={checkData} maxLength={32}/>
            <span id="err">{message.id}</span>
          </li>
          <li>
            <span>用户名</span>
            <input type="text" name="username" value={form.username} onChange={handleChange} onBlur={checkData} maxLength={32}/>
            <span id="err">{message.username}</span>
          </li>
          <li>
            <span>密码</span>
            <input type="text" name="password" value={form.password} onChange={handleChange} onBlur={checkData} maxLength={32}/>
            <span id="err">{message.password}</span>
          </li>
          <li>
            <span></span>
            <button className="cancel" onClick={reset}>取消</button>
            <button onClick={apply}>应用</button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Mqtt