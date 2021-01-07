import {h} from 'preact'
import {request, transfrom} from "../../utils";
import {useEffect, useState} from "preact/hooks";

import fsURL from '../../style/fs2.png'
import fsLight from '../../style/fs-light.png'
import deviceURL from '../../style/device.png'
import glURL from '../../style/gl.png'
import wdURL from '../../style/wd2.png'
import sdURL from '../../style/sd2.png'
import czURL from '../../style/cz.png'
import gxURL from '../../style/gx.png'
import gxLight from '../../style/gx-light.png'
import dkURL from '../../style/dk.png'
import dkLight from '../../style/dk-linght.png'
import czLight from '../../style/cz-linght.png'
import xm from '../../style/xm.png'
import xmLight from '../../style/xm-light.png'
import led from '../../style/led.png'
import ledLight from '../../style/led-light.png'
import dy from '../../style/dy.png'
import dyLight from '../../style/dy-light.png'



const Device = ()=> {

  const [form, setForm] = useState({
    top_fun: undefined,
    side_fun: undefined,
    box_door: undefined,
    box_led: undefined,
    v5: undefined,
    v200: undefined,
    box_sd: 0,
    box_wd: 0,
    device_power: 0,
    light_port: undefined,
    port1: undefined,
    port2: undefined,
    port3: undefined,
    port4: undefined,
    port5: undefined,
    socket1: undefined,
    socket2: undefined,
    socket3: undefined,
    socket4: undefined,
    socket5: undefined,
    socket6: undefined,
    socket7: undefined,
    socket8: undefined,
  })

  // 获取首页数据
  useEffect(()=>{
    getDeviceData()
  },[])

  const getDeviceData = ()=> {
    request({
      method: 'get',
      path: '/home/getHomeData',
    }).then(res => {
      let data = transfrom(res, ',', ':')
      // 将data中的字符串true或者false转换成布尔值的true或者false
      for(let [key, value] of Object.entries(data)){
        data[key] = eval(value)
      }
      console.log(data)
      setForm(data)
    }).catch(err => {
      console.log(err)
    })
  }

  const  handleChange = (e) => {


    let data = {}
    // 后端要的true或者false是字符串
    data[e.target.name] =  String(e.target.checked)
    data = JSON.stringify(data)
    request({
      method: 'post',
      path:'/home/setHomeData',
      data
    }).then(res => {
      // 设置成功重新获取数据
      getDeviceData()
      console.log("设置成功！")
    }).catch(err => {
      // 设置失败重新获取数据
      getDeviceData()
      console.log("设置失败！")
    })
  }

  return(
    <div id="device">
      <div className="top">
        <div id="fan-control">
          <p style={{fontSize: '16px', fontWeight: '700', marginLeft: '40px', letterSpacing: '1px'}}>风扇控制</p>
          <div className="fan-img">
            <img src={form.top_fun ? fsLight : fsURL} alt="" className={'up-fan'} width={48} height={48}/>
            <div>
              <img src={form.side_fun ? fsLight : fsURL} alt="" style={{marginLeft: '30px'}} width={48} height={48} />
              <img src={form.side_fun ? fsLight : fsURL} alt="" style={{float: 'right', marginRight: '30px'}} width={48} height={48} />
            </div>
          </div>

          <div className="fan-switch">
            <div>
              <div style={{marginBottom: '10px'}}>顶部风扇</div>
              <div className="div" style={{borderRight: '0'}}>
                <input type="checkbox" className="switch" checked={form.top_fun} name={'top_fan'} onChange={handleChange} />
              </div>
            </div>

            <div>
              <div style={{marginBottom: '10px'}}>两边双风扇</div>
              <div>
                <input type="checkbox" className="switch" checked={form.side_fun} onChange={handleChange} name={'side_fan'} />
              </div>
            </div>
          </div>
        </div>
        <div id="device-info">
          <div className="box">
            <div className="box-item">
              <img src={form.box_door ? xmLight: xm} alt="" />
              <div>
                <span style={{marginLeft: '30px'}}>箱门状态</span>
                <input type="checkbox" className="switch box-switch" name="box_door" checked={form.box_door} onChange={handleChange}/>
              </div>
            </div>
            <div className="box-item">
              <img src={form.v200 ? dyLight : dy} alt="" />
              <div>
                <span style={{marginLeft: '30px'}}>220V电压</span>
                <input type="checkbox" className="switch box-switch" name="v220" checked={form.v200} onChange={handleChange}/>
              </div>
            </div>
            <div className="box-item">
              <img src={form.v5 ? dyLight : dy} alt="" />
              <div>
                <span style={{marginLeft: '30px'}}>5V电压</span>
                <input type="checkbox" className="switch box-switch" name="v5" checked={form.v5} onChange={handleChange}/>
              </div>
            </div>
            <div className="box-item last">
              <img src={form.box_led ? ledLight: led} alt="" />
              <div>
                <span style={{marginLeft: '30px'}}>箱内LED灯</span>
                <input type="checkbox" className="switch box-switch" name="box_led" disabled={true} title={"此开关不可修改！"} checked={form.box_led} onChange={handleChange}/>
              </div>
            </div>
          </div>
          <div className="info">
            <div className="info-item">
              <p>设备功率</p>
              <div className={"info-item-child"}>
                <div className={"info-img"}>
                  <img src={glURL} alt="" />
                </div>
                <div className={"info-value"}>
                  <span style={{fontSize: '24px'}}>{form.device_power}</span>
                  <span style= {{fontSize: '14px', marginLeft: '3px'}}>W</span>
                </div>
              </div>

            </div>
            <div className="info-item">
              <p>箱内温度</p>
              <div className={"info-item-child"}>
                <div className={"info-img"}>
                  <img src={wdURL} alt="" />
                </div>
                <div className={"info-value"}>
                  <span style={{fontSize: '24px'}}>{form.box_wd}</span>
                  <span style={{fontSize: '14px', marginLeft: '3px'}}>℃</span>
                </div>
              </div>
            </div>
            <div className="info-item last">
              <p>箱内湿度</p>
              <div className={"info-item-child"}>
                <div className={"info-img"}>
                  <img src={sdURL} alt="" />
                </div>
                <div className={"info-value"}>
                  <span style={{fontSize: '24px'}}>{form.box_sd}</span>
                  <span style= {{fontSize: '14px', marginLeft: '3px'}}>%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="center">
        <div className="center-item">
          <p>12V</p>
          <div className={"center-item-child"}>
            <div>
              <img src={form.socket1 ? czLight : czURL} alt="" width="45" height="45" />
            </div>
            <div className={"control"}>
              <span>插座1</span>
              <input type="checkbox" className="switch box-switch" name="socket1" checked={form.socket1} onChange={handleChange}/>
            </div>
          </div>
        </div>
        <div className="center-item">
          <p>12V</p>
          <div className={"center-item-child"}>
            <div>
              <img src={form.socket2 ? czLight : czURL} alt="" width="45" height="45" />
            </div>
            <div className={"control"}>
              <span>插座2</span>
              <input type="checkbox" className="switch box-switch" name="socket2" checked={form.socket2} onChange={handleChange}/>
            </div>
          </div>
        </div>
        <div className="center-item">
          <p>12V</p>
          <div className={"center-item-child"}>
            <div>
              <img src={form.socket3? czLight : czURL} alt="" width="45" height="45" />
            </div>
            <div className={"control"}>
              <span>插座3</span>
              <input type="checkbox" className="switch box-switch" name="socket3" checked={form.socket3} onChange={handleChange}/>
            </div>
          </div>
        </div>
        <div className="center-item">
          <p>24V</p>
          <div className={"center-item-child"}>
            <div>
              <img src={form.socket4 ? czLight : czURL} alt="" width="45" height="45" />
            </div>
            <div className={"control"}>
              <span>插座4</span>
              <input type="checkbox" className="switch box-switch" name="socket4" checked={form.socket4} onChange={handleChange} />
            </div>
          </div>
        </div>
        <div className="center-item">
          <p>12V</p>
          <div className={"center-item-child"}>
            <div>
              <img src={form.socket5 ? czLight : czURL} alt="" width="45" height="45" />
            </div>
            <div className={"control"}>
              <span>插座5</span>
              <input type="checkbox" className="switch box-switch" name="socket5" checked={form.socket5} onChange={handleChange} />
            </div>
          </div>
        </div>
        <div className="center-item">
          <p>12V</p>
          <div className={"center-item-child"}>
            <div>
              <img src={form.socket6 ? czLight : czURL} alt="" width="45" height="45" />
            </div>
            <div className={"control"}>
              <span>插座6</span>
              <input type="checkbox" className="switch box-switch" name="socket6" checked={form.socket6} onChange={handleChange} />
            </div>
          </div>
        </div>
        <div className="center-item">
          <p>12V</p>
          <div className={"center-item-child"}>
            <div>
              <img src={form.socket7 ? czLight : czURL} alt="" width="45" height="45" />
            </div>
            <div className={"control"}>
              <span>插座7</span>
              <input type="checkbox" className="switch box-switch" name="socket7" checked={form.socket7} onChange={handleChange} />
            </div>
          </div>
        </div>
        <div className="center-item last">
          <p>24V</p>
          <div className={"center-item-child"}>
            <div>
              <img src={form.socket8  ? czLight : czURL} alt="" width="45" height="45" />
            </div>
            <div className={"control"}>
              <span>插座8</span>
              <input type="checkbox" className="switch box-switch" name="socket8" checked={form.socket8} onChange={handleChange} />
            </div>
          </div>
        </div>
      </div>
      <div className="bottom">
        <div className="bottom-item">
          <p>FIBER</p>
          <div className={"bottom-item-child"}>
            <div>
              <img src={form.light_port ?gxLight : gxURL} alt="" width="45" height="45" />
            </div>
            <div className={"control"}>
              <span>光纤口</span>
              {/*<input type="checkbox" className="switch box-switch" name="light_port" checked={form.light_port} onChange={handleChange} />*/}
            </div>
          </div>
        </div>
        <div className="bottom-item hide"></div>
        <div className="bottom-item hide"></div>
        <div className="bottom-item">
          <p>1000M</p>
          <div className={"bottom-item-child"}>
            <div>
              <img src={form.port5 ? dkLight : dkURL} alt="" width="45" height="45" />
            </div>
            <div className={"control"}>
              <span>端口5</span>
              {/*<input type="checkbox" className="switch box-switch" name="port1" checked={form.port1} onChange={handleChange} />*/}
            </div>
          </div>
        </div>
        <div className="bottom-item">
          <p>100M | PoE:48V</p>
          <div className={"bottom-item-child"}>
            <div>
              <img src={form.port1 ? dkLight : dkURL} alt="" width="45" height="45" />
            </div>
            <div className={"control"}>
              <span>端口1</span>
              {/*<input type="checkbox" className="switch box-switch" name="port2" checked={form.port2} onChange={handleChange} />*/}
            </div>
          </div>
        </div>
        <div className="bottom-item">
          <p>100M | PoE:48V</p>
          <div className={"bottom-item-child"}>
            <div>
              <img src={form.port2 ? dkLight : dkURL} alt="" width="45" height="45" />
            </div>
            <div className={"control"}>
              <span>端口2</span>
              {/*<input type="checkbox" className="switch box-switch" name="port3" checked={form.port3} onChange={handleChange} />*/}
            </div>
          </div>
        </div>
        <div className="bottom-item">
          <p>100M | PoE:48V</p>
          <div className={"bottom-item-child"}>
            <div>
              <img src={form.port3 ? dkLight : dkURL} alt="" width="45" height="45" />
            </div>
            <div className={"control"}>
              <span>端口3</span>
              {/*<input type="checkbox" className="switch box-switch" name="port4" checked={form.port4} onChange={handleChange} />*/}
            </div>
          </div>
        </div>
        <div className="bottom-item last">
          <p>100M | PoE:48V</p>
          <div className={"bottom-item-child"}>
            <div>
              <img src={form.port4 ? dkLight : dkURL} alt="" width="45" height="45" />
            </div>
            <div className={"control"}>
              <span>端口4</span>
              {/*<input type="checkbox" className="switch box-switch" name="port5" checked={form.port5} onChange={handleChange} />*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Device