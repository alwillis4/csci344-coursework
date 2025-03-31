import React, { useState } from "react";
import { Button, Drawer } from "antd";

const MyDrawer = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        Open Drawer
      </Button>
      <Drawer
        title="Basic Drawer"
        placement="right"
        onClose={onClose}
        open={open}
      >
        <p>Some contents...</p>
        <p>More details here...</p>
        <p>Additional information...</p>
      </Drawer>
    </>
  );
};

export default MyDrawer;
