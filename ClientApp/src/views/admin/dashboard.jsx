import React from "react";
import Layout from "./../layouts/admin";
import {Helmet} from "react-helmet";

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Layout>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>داشبورد</title>
                </Helmet>
            </Layout>
        );
    };
}