import React from "react";
import {Layout} from "antd";

const AboutPage = () => {
    return (
        <Layout className="layout">
            <Layout.Content
                className="video"
                style={{
                    position: "relative",
                    paddingBottom: "56.25%",
                    paddingTop: 25
                }}
            >
                <iframe title="The Last Kingdom of Dragons"
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%"
                        }} src="https://www.youtube.com/embed/C3k1h1VA7iM" frameBorder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen></iframe>
            </Layout.Content>
        </Layout>
    );
};

export default AboutPage;