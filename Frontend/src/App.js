import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Layout from "./Controller/Layout/Layout";
import CreateCustomerForm from './Controller/Admin/CreateCustomerForm';

function Content() {
  return (
    <Router>
      <Layout>
        <Route path="/create-customer-form">
          <CreateCustomerForm />
        </Route>
      </Layout>
    </Router>
  );
}

function App() {
  const WrappedContent = Layout(Content);
  
  return (
    <div>
      <WrappedContent />
    </div>
  );
}

export default App;
