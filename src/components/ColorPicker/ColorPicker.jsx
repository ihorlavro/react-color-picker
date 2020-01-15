import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import RangeSlider from 'react-rangeslider';
import { rgbToHex, hexToRgb } from '../../utils';

import 'react-rangeslider/lib/index.css';
import './ColorPicker.scss';

const ColorPicker = ({ value, onChange, colors }) => {
  const [currentColor, setCurrentColor] = useState(value);
  const [savedColor, setSavedColor] = useState(currentColor);
  const [dropdownColorsListShow, setDropdownColorsListShow] = useState(false);
  const [dropdownRGBSliderShow, setDropdownRGBSliderShow] = useState(false);
  const { r, g, b } = hexToRgb(currentColor);
  const [tempR, setTempR] = useState(r);
  const [tempG, setTempG] = useState(g);
  const [tempB, setTempB] = useState(b);
  const colorPickerNode = useRef();
  const dropdownRGBSliderNode = useRef(null);
  const dropdownListNode = useRef(null);

  const handleClickOutside = e => {
    if (
      dropdownRGBSliderNode.current !== null &&
      !dropdownRGBSliderNode.current.contains(e.target)
    ) {
      setDropdownRGBSliderShow(false);
      setCurrentColor(savedColor);
    }

    if (dropdownListNode.current !== null && !dropdownListNode.current.contains(e.target)) {
      setDropdownColorsListShow(false);
    }
  };

  useEffect(() => {
    colorPickerNode.current.style.setProperty('--red-color', r);
    colorPickerNode.current.style.setProperty('--green-color', g);
    colorPickerNode.current.style.setProperty('--blue-color', b);

    document.addEventListener('mousedown', handleClickOutside, false);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside, false);
    };
  });

  const togglerDropdownColorsListHandler = () => {
    if (dropdownColorsListShow === true) {
      setDropdownColorsListShow(false);
    } else {
      setDropdownColorsListShow(true);
    }
  };

  const colorListItemHandler = hexCode => {
    setCurrentColor(hexCode);
    setDropdownColorsListShow(false);

    if (currentColor !== hexCode) {
      setSavedColor(hexCode);
      onChange();
    }
  };

  const togglerRGBSliderHandler = () => {
    if (!dropdownRGBSliderShow) setDropdownRGBSliderShow(true);
  };

  const rgbRangeHandler = (setValue, value, cssVar) => {
    setValue(value);
    setCurrentColor(rgbToHex(tempR, tempG, tempB));
    colorPickerNode.current.style.setProperty(cssVar, value);
  };

  const componentsRGB = [
    {
      letter: 'R',
      value: tempR,
      setValue: setTempR,
      classWord: 'red',
      cssVar: '--red-color',
    },
    {
      letter: 'G',
      value: tempG,
      setValue: setTempG,
      classWord: 'green',
      cssVar: '--green-color',
    },
    {
      letter: 'B',
      value: tempB,
      setValue: setTempB,
      classWord: 'blue',
      cssVar: '--blue-color',
    },
  ];

  const dropdownRGBSliderElement = dropdownRGBSliderShow && (
    <div className="color-picker__dropdown color-picker__dropdown--rgb" ref={dropdownRGBSliderNode}>
      {componentsRGB.map(({ letter, value, setValue, classWord, cssVar }) => {
        return (
          <div
            className={`color-picker__slider color-picker__slider--${classWord}`}
            key={`input-range-wrap-${classWord}`}
          >
            {letter}
            <RangeSlider
              min={0}
              max={255}
              value={value}
              tooltip={false}
              onChange={value => rgbRangeHandler(setValue, value, cssVar)}
            />
          </div>
        );
      })}
      <div className="color-picker__dropdown-btn-group">
        <button
          type="button"
          className="color-picker__dropdown-btn color-picker__dropdown-btn--grey"
          onClick={() => {
            setDropdownRGBSliderShow(false);
            setCurrentColor(savedColor);
          }}
        >
          Cancel
        </button>
        <button
          type="button"
          className="color-picker__dropdown-btn"
          onClick={() => {
            setDropdownRGBSliderShow(false);
            if (currentColor !== savedColor) {
              setSavedColor(currentColor);
              onChange();
            }
          }}
        >
          Ok
        </button>
      </div>
    </div>
  );

  const dropdownColorsListElement = dropdownColorsListShow && (
    <ul
      className="color-picker__dropdown color-picker__dropdown--list color-picker-list"
      ref={dropdownListNode}
    >
      {colors.map(({ label, hexCode }) => {
        return (
          <li className="color-picker-list__item" key={`color-picker-list-${hexCode}`}>
            <input
              type="radio"
              name="color"
              id={`color-picker-list-${hexCode}`}
              onChange={() => colorListItemHandler(hexCode)}
            />
            <label
              htmlFor={`color-picker-list-${hexCode}`}
              className={classNames({ 'is-active': hexCode === currentColor })}
            >
              <span className="color-picker-list__item-label">{label}</span>
              <span
                className="color-picker-list__item-color"
                style={{ backgroundColor: hexCode }}
              />
            </label>
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className="color-picker" ref={colorPickerNode}>
      <div className="color-picker__hex-code">{currentColor}</div>
      <div className="color-picker__with-dropdown">
        <button
          type="button"
          className={classNames('color-picker__current-color', {
            'is-open': dropdownRGBSliderShow,
          })}
          onClick={() => togglerRGBSliderHandler()}
        >
          <span className="color-picker__square-icon" style={{ backgroundColor: currentColor }} />
        </button>
        {dropdownRGBSliderElement}
      </div>
      <div className="color-picker__with-dropdown">
        <button
          aria-label="Toggle"
          type="button"
          className={classNames('color-picker__arrow', { 'is-rotate': dropdownColorsListShow })}
          onClick={togglerDropdownColorsListHandler}
        />
        {dropdownColorsListElement}
      </div>
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
