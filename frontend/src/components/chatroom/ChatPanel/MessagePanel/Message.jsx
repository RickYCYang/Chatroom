import { memo } from 'react';
import PropTypes from 'prop-types';

/** components */
import ContentWrapper from './ContentWrapper';
import Content from './Content';
import Person from './Person';

/** hooks */
import useWindowSize from 'hooks/useWindowSize';

/** utils */
import { IMAGE, TEXT, LEFT, RIGHT } from 'utils/consts';

const Message = memo(({ sender, direction, message, timestamp, type }) => {
  /** hooks */
  const { width } = useWindowSize();

  let flexAlign = 'align-self-start';
  let maxWidth = '75%';

  if (direction === RIGHT) {
    flexAlign = 'align-self-end';
  }
  if (width > 576) {
    maxWidth = '50%';
  }

  return (
    <div className={`${flexAlign} mb-2`} style={{ maxWidth }}>
      <Person sender={sender} direction={direction} timestamp={timestamp} />
      <ContentWrapper direction={direction}>
        <Content type={type} message={message} />
      </ContentWrapper>
    </div>
  );
});

Message.propTypes = {
  sender: PropTypes.string.isRequired,
  direction: PropTypes.oneOf([LEFT, RIGHT]).isRequired,
  message: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
  type: PropTypes.oneOf([IMAGE, TEXT]).isRequired,
};

export default Message;
