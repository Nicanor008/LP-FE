import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Picker from '@emoji-mart/react';
import { Box } from '@chakra-ui/react';

const EmojiPickerComponent = ({ onSelectEmoji, isOpen, onClose }) => {
    const pickerRef = useRef(null);
  
    useEffect(() => {
        // Close picker when clicking outside
        const handleClickOutside = (event) => {
          if (pickerRef.current && !pickerRef.current.contains(event.target)) {
            onClose();
          }
        };
    
        if (isOpen) {
          document.addEventListener("mousedown", handleClickOutside);
        } else {
          document.removeEventListener("mousedown", handleClickOutside);
        }
    
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <Box position={"absolute"} top="50px" right={0} zIndex={1} ref={pickerRef}>
      <Picker onEmojiSelect={onSelectEmoji} theme="light" />
    </Box>
  );
};

EmojiPickerComponent.propTypes = {
  onSelectEmoji: PropTypes.func.isRequired, // Callback function to handle emoji selection
  isOpen: PropTypes.bool.isRequired,        // Controls visibility of the picker
  position: PropTypes.string,               // Positioning style, e.g., "absolute" or "fixed"
  top: PropTypes.string,                    // Top position for the picker
  right: PropTypes.string,                  // Right position for the picker
};

export default EmojiPickerComponent;
