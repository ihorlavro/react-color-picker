import React from 'react';
import PropTypes from 'prop-types';

import './ColorPicker.scss';

const ColorPicker = ({ value, onChange, colors }) => {
  return (
    <div className="color-picker">
      <div className="color-picker__hex-code">{value}</div>
      <button type="button" className="color-picker__visual">
        <span className="color-picker__visual-square" style={{ backgroundColor: value }} />
      </button>
      <button type="button" className="color-picker__arrow">
        <ul className="color-picker__colors">
          {colors.map(({ label, hexCode }) => {
            return (
              <li className="color-picker__colors-item" key={`colors-item-${hexCode}`}>
                <span className="color-picker__colors-item-label">{label}</span>
                <span
                  className="color-picker__colors-item-square"
                  style={{ backgroundColor: hexCode }}
                />
              </li>
            );
          })}
        </ul>
      </button>
    </div>
  );
};

ColorPicker.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  colors: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      hexCode: PropTypes.string.isRequired,
    }),
  ),
};

ColorPicker.defaultProps = {
  onChange: () => {},
  colors: [],
};

export default ColorPicker;
