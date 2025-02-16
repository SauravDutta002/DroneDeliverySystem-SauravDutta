import React from "react";
import Card from "../components/Card";
import "./OrderPage.css"; // Import the CSS

const OrderPage = () => {
  return (
    <div className="order-page">
      <h1>Order Page</h1>
      <p>Select an item to proceed:</p>

      <div className="card-container">
        <Card title="Item 1" description="Description of Item 1" link="/order/item1" />
        <Card title="Item 2" description="Description of Item 2" link="/order/item2" />
        <Card title="Item 2" description="Description of Item 2" link="/order/item2" />
        <Card title="Item 2" description="Description of Item 2" link="/order/item2" />
        <Card title="Item 2" description="Description of Item 2" link="/order/item2" />
        <Card title="Item 2" description="Description of Item 2" link="/order/item2" />
      </div>

  


    </div>
  );
};

export default OrderPage;
