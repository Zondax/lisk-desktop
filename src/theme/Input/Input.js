import PropTypes from 'prop-types';
import React from 'react';
import Feedback from 'src/theme/feedback/feedback';
import Icon from 'src/theme/Icon';
import Spinner from '../Spinner';
import styles from './input.css';

const statusIconNameMap = {
  ok: 'okIcon',
  error: 'iconWarning',
};

const updateStatus = ({
  status, isLoading, value, error, readOnly,
}) => {
  if (isLoading) {
    status = 'pending';
  }
  if (!value || readOnly) {
    status = undefined;
  }
  if (error) {
    status = 'error';
  }
  return status;
};

const getInputClass = ({
  className, dark, icon, isMasked, status,
}) =>
  [
    styles.input,
    status === 'error' && styles.error,
    isMasked && styles.mask,
    className,
    icon && styles.withIcon,
    dark && styles.dark,
  ]
    .filter(Boolean)
    .join(' ');

const Input = ({
  className,
  setRef,
  size,
  error,
  isLoading,
  icon,
  status,
  feedback,
  dark,
  label,
  type,
  isMasked,
  feedbackType,
  iconClassName,
  endComponent,
  ...props
}) => {
  status = updateStatus({
    status,
    isLoading,
    error,
    ...props,
  });
  const Component = type === 'textarea' ? type : 'input';
  return (
    <>
      {label && (
        <label className={[styles.label, styles[size]].join(' ')}>
          {label}
        </label>
      )}
      <span className={`${styles.wrapper} ${styles[size]}`}>
        {icon
          && (typeof icon === 'string' ? (
            <Icon name={icon} className={`${styles.icon} ${iconClassName}`} />
          ) : (
            <span className={styles.icon}>{icon}</span>
          ))}
        {status === 'pending' && (
          <Spinner
            className={`${styles.loading} ${styles.status} node-connection-loading-spinner`}
          />
        )}
        {statusIconNameMap[status] && (
          <Icon
            name={statusIconNameMap[status]}
            className={`${styles.status}`}
          />
        )}

        {
          !!endComponent && (
          <div className={`${styles.status}`}>
            {endComponent}
          </div>
          )
        }
        <Component
          {...props}
          type={type}
          ref={setRef}
          className={getInputClass({
            className,
            dark,
            icon,
            isMasked,
            status,
          })}
        />
        <Feedback message={feedback} size={size} status={status} />
      </span>
    </>
  );
};

Input.propTypes = {
  size: PropTypes.oneOf(['l', 'm', 's', 'xs']),
  status: PropTypes.oneOf(['ok', 'error', 'pending', undefined]),
  type: PropTypes.oneOf(['text', 'textarea', 'password']),
  feedback: PropTypes.string,
  dark: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func,
  isMasked: PropTypes.bool,
};

Input.defaultProps = {
  className: '',
  setRef: null,
  error: false,
  isLoading: false,
  size: 'l',
  status: undefined,
  feedback: '',
  dark: false,
  label: '',
  type: 'text',
  onChange: /* istanbul ignore next */ () => {},
  isMasked: false,
};

export default Input;
