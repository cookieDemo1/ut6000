import {h} from 'preact'
import {useEffect, useState} from "preact/hooks";
import {validate, checkIp, checkNetmask, checkEmpty, checkGateway, objToFormData, transfrom} from "../../utils";
import {request} from "../../utils";

const IpSetting = () => {

  // 错误信息
  const form_rule = {
    ip_mode: {name: "ip_mode", rules: []},
    ip: {name: "ip", rules: [checkEmpty, checkIp]},
    netmask: {name: "netmask", rules: [checkEmpty, checkNetmask]},
    gateway: {name: "gateway", rules: [checkEmpty, checkGateway]}
  }

  const [message, setMessage] = useState({ip_mode: '', ip: '', netmask: '', gateway: ''})

  const [form, setForm] = useState({
    ip_mode: "dhcp",
    ip: undefined,
    netmask: undefined,
    gateway: undefined,
  })

  // 获取数据
  useEffect(() => {
    getFormData()
  }, [])

  const getFormData = () => {
    request({
      method: 'get',
      path: '/ip/getIpData',
    }).then(res => {
      let data = transfrom(res, ',', ':')
      setForm({...form, ...data})
    }).catch(err => {
      console.log(err)
    })
  }


  // 设置值
  const handleChange = (e) => {

    // 将原先的form设置成
    let temp_form = form
    console.log(e.target.value)
    temp_form[e.target.name] = e.target.value
    setForm({...temp_form})
    console.log(form)
  }


  // 发送请求
  const apply = () => {
    let data = {}
    // data = JSON.stringify(form)
    // 1.校验数据
    if (form.ip_mode !== 'dhcp') {

      // 刷到设备上会多一个key,把这个key删除
      let temp_form = {...form}
      if(temp_form["{\"ip_mode\""]){
        delete temp_form["{\"ip_mode\""]
      }
      // temp_form[" "] = undefined


      if(temp_form[" "] == undefined){
        delete temp_form[" "]
      }
      // delete temp_form[" "]


      let tags = checkDataAll(temp_form)
      let keys = Object.keys(message)
      for (let i = 0; i < keys.length; i++) {
        // 如果message有消息代表数据不正确，
        // console.log(message[keys[i]])
        // console.log(message)
        if (message[keys[i]] !== '') {
          alert("请输入正确的数据！")
          return
        }
      }
      // 2.将js对象转换为表单对象
      data = JSON.stringify(temp_form)
    } else {

      data = JSON.stringify({ip_mode: form.ip_mode})
    }

    request({
      method: 'post',
      path: '/ip/setIpData',
      data
    }).then(res => {
      // 设置成功后重新请求数据
      getFormData()
      alert("设置成功")
    }).catch(err => {
      alert("设置失败")
    })
  }

  // 提交的时候校验表单的全部数据
  const checkDataAll = (form) => {
    // tag标志，校验全部数据,1个数据校验成功就push一个true,1个失败就push一个false.
    let result = {}

    console.log("keys", Object.keys(form))

    Object.keys(form).forEach(key => {
      // console.log(key)
      // console.log(form_rule[key])
      // console.log(form_rule[key]["rules"])
      validate(form[key], form_rule[key]['rules']).then(res => {
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

  /**
   // 提交的时候校验表单的全部数据
   const checkDataAll = (form) => {
    // tag标志，校验全部数据,1个数据校验成功就push一个true,1个失败就push一个false.
    return new Promise((resolve, reject) => {

    })
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

   */


    // 重置表单 (两种形式：1.重新获取数据， 2.将表单置位空)
  const reset = () => {
      getFormData()
      // setForm({
      //   ip_mode: 'static',
      //   ip: '',
      //   netmask: '',
      //   gateway: '',
      // })
    }

  // 表单校验，失去焦点的时候校验
  const checkData = (e) => {
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

  return (
    <div id="ip">
      <div className={"ip-setting"}>
        <p>IP地址配置</p>
        <ul>
          <li>
            <span>IP模式设置</span>
            <select name="ip_mode" id="" onChange={handleChange} value={form.ip_mode}>
              <option style={{height: '34px'}} value="dhcp" defaultChecked={form.ip_mode === 'dhcp'}>DHCP/AutoIP
              </option>
              <option style={{height: '34px'}} value="static" defaultChecked={form.ip_mode === 'static'}>Static IP
              </option>
            </select>
          </li>
          { form.ip_mode === 'static' &&
          (<div>
            <li>
            <span>静态IP地址</span>
            <input type="text" name="ip" value={form.ip} onChange={handleChange} onBlur={checkData}
                   disabled={form.ip_mode == 'dhcp'}/>
            <span id="err">{message.ip}</span>
          </li>
          <li>
            <span>子网掩码</span>
            <input type="text" name="netmask" value={form.netmask} onChange={handleChange} onBlur={checkData}
                   disabled={form.ip_mode == 'dhcp'}/>
            <span id="err">{message.netmask}</span>
          </li>
          <li>
            <span>网关</span>
            <input type="text" name="gateway" value={form.gateway} onChange={handleChange} onBlur={checkData}
                   disabled={form.ip_mode == 'dhcp'}/>
            <span id="err">{message.gateway}</span>
          </li>
            </div>
            )
          }
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

export default IpSetting