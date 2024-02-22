import React from 'react'
import Header from './CustomerHeader';
import CustomerSidebar from '../Layout/CustomerSidebar';


const CustomerDashboard = ({ children }) => {
  return (
    <div className="layout">
    <Header />
    <div className="container">
      <aside className="VendorSidebar">
        <CustomerSidebar />
      </aside>
      <main className="content">

        {children}
      </main>
    </div>
  </div>
  )
}

export default CustomerDashboard;