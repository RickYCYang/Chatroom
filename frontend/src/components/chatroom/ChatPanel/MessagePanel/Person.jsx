import PropTypes from 'prop-types';

/* third-party components */
import { MdPerson } from 'react-icons/md';

/** utils */
import { LEFT, RIGHT } from 'utils/consts';

const Person = ({ sender, direction, timestamp }) => {
  let colorClass = 'text-success';
  let alignClass = 'justify-content-start';

  if (direction === RIGHT) {
    colorClass = 'text-primary';
    alignClass = 'justify-content-end';
  }

  return (
    <div className={`d-flex align-items-center mb-1 ${alignClass}`}>
      <MdPerson className={`me-2 ${colorClass}`} size={26} />
      <div>
        <p className="mb-0">{sender}</p>
        <p className="mb-0" style={{ fontSize: '0.6rem' }}>
          ({timestamp})
        </p>
      </div>
    </div>
  );
};

Person.propTypes = {
  sender: PropTypes.string.isRequired,
  direction: PropTypes.oneOf([LEFT, RIGHT]).isRequired,
  timestamp: PropTypes.string,
};

export default Person;
