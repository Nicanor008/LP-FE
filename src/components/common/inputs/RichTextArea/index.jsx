import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import { FaSmile } from '@react-icons/all-files/fa/FaSmile';
import { FaMicrophone } from '@react-icons/all-files/fa/FaMicrophone';
import { FaMicrophoneAltSlash } from '@react-icons/all-files/fa/FaMicrophoneAltSlash'
import 'react-quill/dist/quill.snow.css';
import { Box, Flex, IconButton, Tooltip, useToast } from '@chakra-ui/react';
import { EmojiPicker } from '../..';

const RichTextArea = ({ name, control, placeholder = 'Enter text...' }) => {
  const [QuillEditor, setQuillEditor] = useState(null);
  const [isPickerOpen, setPickerOpen] = useState(false);
  const quillRef = useRef(null);
  const [recognition, setRecognition] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const toast = useToast();

  useEffect(() => {
    import('react-quill').then((Quill) => {
      setQuillEditor(() => Quill.default);
    });

    if ('webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = true; // Keep listening until stopped
      recognitionInstance.interimResults = true; // Provide real-time updates
      recognitionInstance.lang = 'en-US';
      setRecognition(recognitionInstance);
    } else {
      toast({
        title: 'Speech Recognition Not Supported',
        description: 'Your browser does not support speech recognition.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [toast]);

  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ size: ['small', false, 'large', 'huge'] }],
    ['clean'],
  ];

  const handleSelectEmoji = (emoji, field) => {
    const currentValue = field.value || '';
    field.onChange(currentValue + emoji.native);
    setPickerOpen(false); // Close the picker after selecting an emoji
  };

  const handleSpeechRecognition = (field) => {
    if (!recognition) return;

    if (isListening) {
      recognition.stop();
      setIsListening(false);
      return;
    }

    recognition.start();
    setIsListening(true);

    recognition.onresult = (event) => {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript; // Get the recognized speech
      }
      field.onChange(transcript); // Update the form field in real-time
    };

    recognition.onerror = (event) => {
      toast({
        title: 'Speech Recognition Error',
        description: event.error,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  };

  if (!QuillEditor) {
    return null; // Render nothing until react-quill is loaded
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Box position="relative" width="100%" mb={3}>
          <QuillEditor
            theme="snow"
            placeholder={placeholder}
            modules={{
              toolbar: toolbarOptions,
              clipboard: { matchVisual: false },
            }}
            onChange={(content) => field.onChange(content)}
            value={field.value}
            ref={quillRef}
            style={{
              minHeight: '60px',
              overflow: 'auto',
              width: '100%',
            }}
            className="custom-quill"
          />
          <Flex position="absolute" right={["12px", "8px"]} top={["27px", "1px"]} gap={2}>
            <Tooltip
              label={isListening ? 'Click to stop speech-to-text' : 'Click to start speech-to-text'}
              aria-label="Speech tooltip"
              hasArrow
            >
            <IconButton
              icon={isListening ? <FaMicrophoneAltSlash size={24} /> : <FaMicrophone size={24} />}
              onClick={() => handleSpeechRecognition(field)}
              aria-label="Speech to Text"
              color={'#796FED'}
              minW="auto"
              bg="transparent"
              _hover={{
                bg: "transparent"
              }}
            />
            </Tooltip>
            <IconButton
              icon={<FaSmile size={24} />}
              onClick={() => setPickerOpen(!isPickerOpen)}
              aria-label="Add Emoji"
              h="auto"
              minW="auto"
              color="#796FED"
              bg="transparent"
              _hover={{
                bg: "transparent"
              }}
            />
          </Flex>
          {/* Emoji Picker */}
          <EmojiPicker
            isOpen={isPickerOpen}
            onSelectEmoji={(emoji) => handleSelectEmoji(emoji, field)}
            onClose={() => setPickerOpen(false)}
          />
        </Box>
      )}
    />
  );
};

RichTextArea.propTypes = {
  name: PropTypes.string.isRequired, // Field name for react-hook-form
  control: PropTypes.object.isRequired, // Control object from react-hook-form
  placeholder: PropTypes.string, // Placeholder text for the editor
};

export default RichTextArea;
