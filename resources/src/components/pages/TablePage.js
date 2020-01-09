import React from "react";
import {Layout} from "antd";
import DataTable from "../posts/DataTable";
import SideBar from "../layout/SideBar";
import {connect} from "react-redux";
import {reFetchPosts} from "../../store/posts/posts-actions";

class TablePage extends React.Component {
    componentDidMount() {
        this.props.reFetchPosts(1);
    }
    render() {
        return (
            <Layout className="layout">
                <SideBar/>
                <Layout.Content>
                    <DataTable posts={this.props.posts}/>
                </Layout.Content>
            </Layout>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        posts: state.posts.data,
        page: state.posts.current_page,
        last_page: state.posts.last_page
    }
};

export default connect(mapStateToProps, {reFetchPosts})(TablePage);