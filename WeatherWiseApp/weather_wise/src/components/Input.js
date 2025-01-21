import React from 'react';
import PropTypes from 'prop-types';

export default function Input(props) {
    const {
        placeholder,
        type,
        preicon,
        posticon,
        prefun,
        postfun,
        value,
        onChange,
        className,
        ariaLabel,
        name
    } = props;

    return (
        <div className={`relative w-full ${className}`}>
            {preicon && (
                <div
                    onClick={prefun}
                    className="absolute text-secondary inset-y-0 flex items-center left-3 cursor-pointer"
                >
                    {preicon}
                </div>
            )}

            <input
                className={`outline-none w-full text-text placeholder-secondary  border border-border bg-transparent pe-3 ps-12 py-2 rounded-full`}
                type={type}
                placeholder={placeholder}
                value={value}
                name={name}
                onChange={onChange}
                aria-label={ariaLabel || placeholder}
            />

            {posticon && (
                <div
                    onClick={postfun}
                    className="absolute text-secondary inset-y-0 flex items-center right-3 cursor-pointer"
                >
                    {posticon}
                </div>
            )}
        </div>
    );
}

Input.propTypes = {
    placeholder: PropTypes.string,
    type: PropTypes.string,
    preicon: PropTypes.node,
    posticon: PropTypes.node,
    prefun: PropTypes.func,
    postfun: PropTypes.func,
    value: PropTypes.string,
    onChange: PropTypes.func,
    className: PropTypes.string,
    ariaLabel: PropTypes.string,
};

Input.defaultProps = {
    type: 'text',
    placeholder: '',
    preicon: null,
    posticon: null,
    prefun: null,
    postfun: null,
    value: '',
    onChange: null,
    className: '',
    ariaLabel: '',
};
