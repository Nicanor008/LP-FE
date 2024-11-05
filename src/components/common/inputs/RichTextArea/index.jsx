import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import 'react-quill/dist/quill.snow.css';

const RichTextArea = ({ name, control, placeholder = 'Enter text...' }) => {
    const [QuillEditor, setQuillEditor] = useState(null);

  useEffect(() => {
    import('react-quill').then((Quill) => {
      setQuillEditor(() => Quill.default);
    });
  }, []);

  if (!QuillEditor) {
    return null; // Render nothing until react-quill is loaded
  }

    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        ['clean']
    ];

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <QuillEditor
                    theme="snow"
                    placeholder={placeholder}
                    modules={{
                        toolbar: toolbarOptions,
                        clipboard: { matchVisual: false }
                    }}
                    onChange={field.onChange}
                    value={field.value}
                    style={{
                        minHeight: '60px',
                        marginBottom: "0.8rem"
                    }}
                    maxH="150px"
                    overflow="scroll"
                    // Custom CSS for minHeight, maxHeight, and overflow
                    className="custom-quill"
                />
            )}
        />
    );
};

RichTextArea.propTypes = {
    name: PropTypes.string.isRequired,          // Field name for react-hook-form
    control: PropTypes.object.isRequired,       // Control object from react-hook-form
    placeholder: PropTypes.string,              // Placeholder text for the editor
};

export default RichTextArea;
