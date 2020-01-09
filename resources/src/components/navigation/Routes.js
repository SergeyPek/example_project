import React from "react";
import {Switch, Route} from "react-router-dom";
import TablePage from '../pages/TablePage'
import AboutPage from '../pages/AboutPage'

const Routes = () => {
    return (
        <Switch>
            <Route path={'/table'} component={TablePage} />
            <Route path={'/about'} component={AboutPage} />
        </Switch>
    );
}
export default Routes;