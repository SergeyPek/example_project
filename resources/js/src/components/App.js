import React from 'react';
import {BrowserRouter} from "react-router-dom";
import Routes from './navigation/Routes'
import AppHeader from "./layout/AppHeader";
import Error from "./errors/Error";
import {connect} from "react-redux";

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <AppHeader />
                <Routes />
                <Error errors={this.props.errors}/>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        errors: state.errors.errors
    }
}

export default connect(mapStateToProps)(App);
