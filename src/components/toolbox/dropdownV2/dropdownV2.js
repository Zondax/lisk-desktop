import React from 'react';
import PropTypes from 'prop-types';
import styles from './dropdownV2.css';
import { flattenArray } from '../../../utils/helpers';

const DropdownV2 = ({
  showDropdown, className, showArrow, active, children,
}) => {
  const isSelectionList = children && Array.isArray(children);

  return (
    <div className={`${styles.dropdown} ${showDropdown ? styles.show : ''} ${className}`}>
      {showArrow && <span className={`${styles.dropdownArrow} dropdown-arrow`}>
        <svg stroke="inherit" fill="currentColor" viewBox="0 0 36 9">
          <path d="M2 9c9-2 11-7.5 16-7.5S27 7 34 9"/>
        </svg>
      </span>}
      <div className={`${styles.dropdownContent} dropdown-content ${isSelectionList ? 'options' : ''}`}>
        { isSelectionList ? flattenArray(children).map((child, key) => (
          React.cloneElement(child, { className: ` ${styles.option} ${active === key ? styles.active : ''} ${child.props.className || ''}`, key })
        )) : children }
      </div>
    </div>
  );
};


DropdownV2.displayName = 'Dropdown';

DropdownV2.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.arrayOf(PropTypes.arrayOf),
  ]).isRequired,
  showDropdown: PropTypes.bool,
  className: PropTypes.string,
  showArrow: PropTypes.bool,
  active: PropTypes.number,
};

DropdownV2.defaultProps = {
  showDropdown: false,
  className: '',
  showArrow: true,
  active: -1,
};

DropdownV2.Separator = () => <span className={styles.separator} />;
DropdownV2.Separator.displayName = 'Dropdown.Separator';

export default DropdownV2;
