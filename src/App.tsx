import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { LinearProgramming } from './pages/LinearProgramming';
import { Layout } from './components/Layout';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/linear-programming" element={<LinearProgramming />} />
          {/* Add more routes as we implement them */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;