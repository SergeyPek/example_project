import React from "react";
import {Menu} from "antd";
import {NavLink} from "react-router-dom";

class AppMenu extends React.Component {
    render() {
        return (
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['table']}
                style={{ lineHeight: '64px' }}
            >
                <Menu.Item key="table"><NavLink to="/table">Table</NavLink></Menu.Item>
                <Menu.Item key="about"><NavLink to="/about">About</NavLink></Menu.Item>
            </Menu>
        );
    }
}
export default AppMenu;