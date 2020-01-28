import React, { FC } from 'react'
import { LogoutOutlined, UserOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import { Layout, Dropdown, Menu } from 'antd'
import { useHistory } from 'react-router-dom'
import HeaderNoticeComponent from './notice'
import { useDispatch, useSelector } from 'react-redux'
import { logoutAsync } from '~/actions/user.action'
import Avator from '~/assets/header/avator.jpeg'
import { AppState } from '~/stores'
import { ReactComponent as LanguageSvg } from '~/assets/header/language.svg'
import { setGlobalItem } from '~/actions/global.action'
import { LocaleFormatter } from '~/locales'

const { Header } = Layout

interface Props {
  collapsed: boolean
  toggle: () => void
}

type Action = 'userInfo' | 'userSetting' | 'logout'

const HeaderComponent: FC<Props> = ({ collapsed, toggle }) => {
  const { username } = useSelector((state: AppState) => state.userReducer)
  const { locale } = useSelector((state: AppState) => state.globalReducer)
  const history = useHistory()
  const dispatch = useDispatch()

  const onActionClick = async (action: Action) => {
    switch (action) {
      case 'userInfo':
        return
      case 'userSetting':
        return
      case 'logout':
        const res = Boolean(await dispatch(logoutAsync()))
        res && history.push('/login')
        return
    }
  }
  const menu = (
    <Menu>
      <Menu.Item key="1">
        <span>
          <UserOutlined />
          <span onClick={() => history.push('/dashboard')}>
            <LocaleFormatter id="header.avator.account" />
          </span>
        </span>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2">
        <span>
          <LogoutOutlined />
          <LocaleFormatter id="header.avator.account" />
          <span onClick={() => onActionClick('logout')}>
            <LocaleFormatter id="header.avator.logout" />
          </span>
        </span>
      </Menu.Item>
    </Menu>
  )
  return (
    <Header className="layout-page-header">
      <span onClick={toggle}>{collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}</span>
      <div className="actions">
        <HeaderNoticeComponent />
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item
                disabled={locale.split('-')[0] === 'zh'}
                key="1"
                onClick={() => dispatch(setGlobalItem({ locale: 'zh-CN' }))}
              >
                简体中文
              </Menu.Item>
              <Menu.Item
                disabled={locale.split('-')[0] === 'en'}
                key="2"
                onClick={() => dispatch(setGlobalItem({ locale: 'en-US' }))}
              >
                English
              </Menu.Item>
            </Menu>
          }
        >
          <LanguageSvg />
        </Dropdown>
        <Dropdown overlay={menu}>
          <span className="user-action">
            <img src={Avator} className="user-avator" />
            {username}
          </span>
        </Dropdown>
      </div>
    </Header>
  )
}

export default HeaderComponent
