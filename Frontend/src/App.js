import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Layout from "./Controller/Layout/Layout";
import CreateCustomerForm from './Controller/Admin/CreateCustomerForm';
import LoginForm from './Components/LoginForm/LoginForm';

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
      <LoginForm/>
      <WrappedContent />
    </div>
    
  );
}



export default App;
