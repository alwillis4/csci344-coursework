import React from "react";
import { Card } from "antd";

const MyCard = () => (
  <Card title="Trafic Light" variant="borderless" style={{ width: 300 }}>
    <p style={{ color: "red" }}>Red Light</p>
    <p style={{ color: "yellow" }}>Yellow Light</p>
    <p style={{ color: "green" }}>Green Light</p>
  </Card>
);

export default MyCard;
