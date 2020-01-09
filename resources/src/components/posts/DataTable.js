import React from "react";
import {Button, Table} from 'antd';
import {connect} from "react-redux";
import {removeAndFetchPosts} from "../../store/posts/posts-actions";

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
                dataIndex: 'username',
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
    onDelete = (post) => {
        this.props.removeAndFetchPosts(post);
    }
    render() {
        return (
            <Table rowKey="id" columns={this.columns} dataSource={this.props.posts} />
        );
    }
};

export default connect(null, {removeAndFetchPosts})(DataTable);