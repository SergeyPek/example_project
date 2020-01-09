import {message} from "antd";

const Error = (props) => props.errors.map((error) => message.error(error));

export default Error;