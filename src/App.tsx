import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { Layout, Typography } from "antd";

const { Header, Content } = Layout;

const App = () => {
  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <Header>
          <Typography.Title level={3} style={{ color: "white", margin: 0 }}>
            Ticket Booking System
          </Typography.Title>
        </Header>
        <Content style={{ padding: "24px" }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
};

export default App;
