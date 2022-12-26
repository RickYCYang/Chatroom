/** components */
import MessagePanel from './MessagePanel';
import MessageSender from './MessageSender';
import ImageModal from './ImageModal';

const ChatPanel = () => {
  return (
    <div
      style={{ height: 'calc(100vh - 56px)' }}
      className="position-relative d-flex flex-column w-100"
    >
      <MessagePanel />
      <MessageSender />
      <ImageModal />
    </div>
  );
};

export default ChatPanel;
