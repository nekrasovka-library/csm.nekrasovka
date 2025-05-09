import React, { useEffect, useState } from "react";
import { Container1 } from "./settings.styles.js";
import { useDispatch, useSelector } from "react-redux";
import Padding from "./padding.jsx";
import Header from "./header.jsx";
import Columns from "./columns.jsx";
import Color from "./color.jsx";
import Align from "./align.jsx";
import Radius from "./radius.jsx";

const Settings = () => {
  const dispatch = useDispatch();
  const { isSettingsOpen } = useSelector((state) => state.settings);
  const { selectedBlockIndex, blocks } = useSelector((state) => state.blocks);
  const [settings, setSettings] = useState(null);

  const saveSettings = () => {
    dispatch({ type: "UPDATE_BLOCK_STYLES", payload: settings });
  };

  const saveAndExitSettings = () => {
    dispatch({ type: "UPDATE_BLOCK_STYLES", payload: settings });
    dispatch({ type: "TOGGLE_SETTINGS" });
    dispatch({ type: "SET_BLOCK", payload: { blockIndex: null } });
  };

  const handleSettingsChange = (e) => {
    const { name, value } = e.target;
    setSettings((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (blocks[selectedBlockIndex]) {
      setSettings(blocks[selectedBlockIndex]?.styles);
    }
  }, [selectedBlockIndex, blocks]);

  return (
    <Container1 $isMenuOpen={isSettingsOpen}>
      <Header
        saveSettings={saveSettings}
        saveAndExitSettings={saveAndExitSettings}
      />
      <Columns
        maxWidth={settings?.maxWidth}
        handleSettingsChange={handleSettingsChange}
      />
      {/*<Align*/}
      {/*  textAlign={settings?.textAlign}*/}
      {/*  handleSettingsChange={handleSettingsChange}*/}
      {/*/>*/}
      <Padding
        paddingTop={settings?.paddingTop}
        paddingBottom={settings?.paddingBottom}
        handleSettingsChange={handleSettingsChange}
      />
      <Color
        backgroundColor={settings?.backgroundColor}
        handleSettingsChange={handleSettingsChange}
      />
      <Radius
        borderRadius={settings?.borderRadius}
        handleSettingsChange={handleSettingsChange}
      />
    </Container1>
  );
};

export default Settings;
