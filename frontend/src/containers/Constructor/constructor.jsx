import React from "react";
import Block from "../Block/block.jsx";
import { useDispatch, useSelector } from "react-redux";
import { ConstructorContainer } from "./constructor.styles.js";
import Editor from "../../components/Editor/editor.jsx";
import Image from "../../components/Image/image.constructor.jsx";
import Carousel from "../../components/Carousel/carousel.constructor.jsx";
import Divider from "../../components/Divider/divider.jsx";
import Button from "../../components/Button/button.constructor.jsx";
import { AnimatePresence } from "framer-motion";
import Transition from "../../components/Transition/transition.jsx";
import { useParams } from "react-router";

const Constructor = () => {
  const dispatch = useDispatch();
  const { blocks, totalBlocks } = useSelector((state) => state.blocks);
  const hasBlocks = totalBlocks > 0;
  const { pageId } = useParams();

  const EXCLUDED_CLASSES = ["se-container", "se-btn-module", "se-wrapper"];

  const isExcludedClass = (classList) => {
    return EXCLUDED_CLASSES.some((excludedClass) =>
      classList.value.includes(excludedClass),
    );
  };

  const handleContainerClick = ({ target }) => {
    const containerElement = target.parentNode?.parentNode?.parentNode;

    if (!isExcludedClass(containerElement.classList)) {
      dispatch({ type: "RESET_EDITOR" });
    }
  };

  const CONSTRUCTOR_COMPONENTS = {
    text: Editor,
    image: Image,
    carousel: Carousel,
    divider: Divider,
    button: Button,
  };

  const renderBlocks = () =>
    blocks.map(({ id, items, styles }, blockIndex) => {
      return (
        <Block
          key={id}
          id={id}
          blockIndex={blockIndex}
          items={items}
          styles={styles}
          isItems={!!items}
          CONSTRUCTOR_COMPONENTS={CONSTRUCTOR_COMPONENTS}
        />
      );
    });

  return (
    <AnimatePresence mode="wait">
      <Transition key={pageId}>
        <ConstructorContainer onClick={handleContainerClick}>
          {hasBlocks ? renderBlocks(true) : <Block blockIndex={0} />}
        </ConstructorContainer>
      </Transition>
    </AnimatePresence>
  );
};

export default Constructor;
