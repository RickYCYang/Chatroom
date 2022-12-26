import PropTypes from 'prop-types';
/** utils */
import { LEFT, RIGHT } from 'utils/consts';

const ContentWrapper = ({ direction, children }) => {
  /** for styling */
  const innerStyle = {
    borderRadius: '0rem 3rem 3rem 3rem',
    backgroundColor: '#fff',
  };
  if (direction === RIGHT) {
    innerStyle.borderRadius = '3rem 0rem 3rem 3rem';
    innerStyle.backgroundColor = '#1AA7EC';
    innerStyle.color = '#fff';
  }

  return (
    <div
      className={`mb-2 d-flex ${
        direction === RIGHT ? 'justify-content-end' : ''
      }`}
    >
      <div
        style={innerStyle}
        className={`py-3 px-4 word-wrap-break word-break-word d-inline-block `}
      >
        {children}
      </div>
    </div>
  );
};

ContentWrapper.propTypes = {
  direction: PropTypes.oneOf([LEFT, RIGHT]),
};

export default ContentWrapper;
