import React, { useState } from "react";
import { Content } from "antd/es/layout/layout";
import ProjectContent from "./ProjectContent";
import EpicContent from "./EpicContent";
import StoriesComponent from "./StoriesComponent";

function ContentComponent(props) {
  const getComponentForLevel = (level) => {
    switch (level) {
      case 0:
        return <ProjectContent data={props.data} setTable={props.setTable} />;
        break;
      case 1:
        return <EpicContent data={props.data} setTable={props.setTable} />;
        break;
      case 2:
        return <StoriesComponent data={props.data} setTable={props.setTable} />;
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
