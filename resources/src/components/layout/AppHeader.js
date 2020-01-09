import React from "react";
import {Layout} from "antd";
import AppMenu from "../navigation/AppMenu";

const AppHeader = () => {
    return  (
        <Layout.Header>
            <AppMenu />
        </Layout.Header>
    );
};

export default AppHeader;