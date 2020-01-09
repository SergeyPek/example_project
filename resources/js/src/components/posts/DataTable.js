import React from "react";
import {Button, Table} from 'antd';
import {connect} from "react-redux";
import {reFetchPosts, removeAndFetchPosts} from "../../store/posts/posts-actions";

class DataTable extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id'
            },
            {
                title: 'Headline',
                dataIndex: 'headline',
                key: 'headline'
            },
            {
                title: 'Content',
                dataIndex: 'content',
                key: 'content'
            },
            {
                title: 'Username',
                dataIndex: 'user.username',
                key: 'username'
            },
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <Button shape="circle" icon="delete" onClick={(e) => { this.onDelete(record) }}/>
                    </span>
                ),
            },
        ];
    }

    initialPagination = {
        current: this.props.current,
        total: this.props.total,
        pageSize: this.props.per_page,
        hideOnSinglePage: true,
        onChange: (page)=>this.handleChange(page)
    };

    state = {
        pagination: {...this.initialPagination}
    }

    handleChange = (page) => {
        this.setState({
            pagination: {...this.initialPagination, ...this.props, current: page}
        });
        this.props.reFetchPosts(page);
    }
    onDelete = async (post) => {
        this.setState({
            pagination: {...this.initialPagination, ...this.props}
        });
        await this.props.removeAndFetchPosts(post, this.state.pagination.current);

        const {current} = this.state;
        if (this.props.posts.length === 0) {
            this.setState({
                pagination: {...this.initialPagination, ...this.props, current: current - 1}
            });
            this.props.reFetchPosts(current - 1);
        }
    }
    render() {
        return (
            <Table rowKey="id" columns={this.columns} dataSource={this.props.posts} pagination={this.state.pagination}/>
        );
    }
};

export default connect(null, {removeAndFetchPosts, reFetchPosts})(DataTable);
