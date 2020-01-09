import React from "react";
import {Button, Layout} from "antd";
import {connect} from "react-redux";
import {reFetchPosts} from "../../store/posts/posts-actions";

class SideBar extends React.Component {
    onReload = (e) => {
        this.props.reFetchPosts(1);
    }
    render() {
        return (
            <Layout.Sider className="sidebar">
                <Button icon="reload" onClick={this.onReload}>Reload</Button>
            </Layout.Sider>
        )
    };
}
export default connect(null, {reFetchPosts})(SideBar);