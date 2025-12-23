import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { Layout, Typography } from "antd";

const { Header, Content } = Layout;

const USER_ID = "user-1766388127080";

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
            <Route path="/" element={<HomePage userId={USER_ID} />} />
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
};

export default App;
