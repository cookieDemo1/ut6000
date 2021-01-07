import {h} from 'preact'
import { Link } from 'preact-router/match';

const LeftNav = () => {

  const links = [
    {path: '/', name: '设备管理'},
    {path: '/ipsetting', name: 'IP地址配置'},
    {path: '/mqtt', name:'MQTT配置'},
    {path: '/reboot', name:'设备重启'}

  ]

  return(
    <div className="left">
      <nav className={"nav"}>
        {
          links.map(link => (<Link className="link-item" activeClassName={"active"} href={link.path}>{link.name}</Link>))
        }
      </nav>
    </div>
  )
}

export default  LeftNav

