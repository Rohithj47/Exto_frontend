import React, { useState } from "react";
import { Content } from "antd/es/layout/layout";
import ProjectContent from "./ProjectContent";
import StoriesComponent from "./StroriesComponent";
import ItemComponent from "./ItemComponent";
// import StoriesComponent from "./xComponent";

function ContentComponent(props) {
  const getComponentForLevel = (level) => {
    switch (level) {
      case 0:
        return <ProjectContent data={props.data} setTable={props.setTable} parentID = {props.parentID} />;
        break;
      case 1:
        return <StoriesComponent data={props.data} setTable={props.setTable} parentID = {props.parentID} />;
        break;
      case 2:
        return <ItemComponent data={props.data} setTable={props.setTable} parentID = {props.parentID} />;
        break;
      default:
        return null;
        break;
    }
  };
  return (
    <Content
      className="site-layout"
      style={{ padding: "0 50px", marginTop: 64 }}
    >
      <div
        className="site-layout-background"
        style={{ padding: 24, minHeight: 600 }}
      >
        {/* TODO: Based on level, render appropriate components */}
        {getComponentForLevel(props.level)}
      </div>
    </Content>
  );
}

export default ContentComponent;
