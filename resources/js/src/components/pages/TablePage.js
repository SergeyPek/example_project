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
                <SideBar current_page={this.props.current}/>
                <Layout.Content>
                    {!this.props.pending && <DataTable {...this.props}/>}
                </Layout.Content>
            </Layout>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        posts: state.posts.data,
        current: state.posts.current_page,
        total: state.posts.total,
        per_page: state.posts.per_page,
        pending: state.posts.pending
    }
};

export default connect(mapStateToProps, {reFetchPosts})(TablePage);
