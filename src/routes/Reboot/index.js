import {h} from 'preact'
import {request} from "../../utils";

const Reboot = ()=> {

  const reboot = () => {

    // 2.将js对象转换为表单对象
    let data = JSON.stringify({reboot: true})
    let res = confirm("确定重启吗？")
    res && request({
      method: 'post',
      path: '/reboot',
      data
    }).then(res => {
      alert("重启成功！")
    }).catch(err => {
      alert("重启失败！")
    })
  }

  return(
    <div id="ip">
      <div className={"ip-setting"}>
        <p>设备重启</p>
        <button onClick={reboot}>重启</button>
      </div>
    </div>
  )
}

export default Reboot