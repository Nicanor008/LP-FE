import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const RichTextArea = ({ name, control, placeholder = 'Enter text...' }) => {
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
                <ReactQuill
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
