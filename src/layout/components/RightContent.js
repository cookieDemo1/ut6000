import {h} from 'preact'
import { Router } from 'preact-router';

import Device from "../../routes/Device";
import IpSetting from "../../routes/IpSetting";
import Mqtt from "../../routes/Mqtt";
import Reboot from "../../routes/Reboot";

const RightContent = ()=> {
  const routers = [
    {path: '/', component: Device},
    {path: '/ipsetting', component: IpSetting},
    {path: '/mqtt', component: Mqtt},
    {path: '/reboot', component: Reboot}
  ]

  const handelRoute = (e) => {}

  return(
    <div className="right">
      <Router onChange={handelRoute}>
        {
          routers.map(route => {
            const {component: MyComponent, path} = route
            return(
              <MyComponent path={path} ></MyComponent>
            )
          })
        }
      </Router>
    </div>
  )
}

export default RightContent