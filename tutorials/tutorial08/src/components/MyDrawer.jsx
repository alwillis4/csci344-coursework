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
        Open Table of Contents
      </Button>
      <Drawer
        title="Basic Drawer"
        placement="right"
        onClose={onClose}
        open={open}
      >
        <p>Here's what is on my webpage!</p>
        <p>A carousel with uniqe pictures.</p>
        <p>Of couse this Drawer</p>
        <p>Traffic Light Car</p>
        <p>Lastly theres the Photo Gallery</p>
      </Drawer>
    </>
  );
};

export default MyDrawer;
