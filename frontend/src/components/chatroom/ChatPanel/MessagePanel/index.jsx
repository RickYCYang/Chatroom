import { useRef, useEffect } from 'react';
/** redux */
import { useSelector } from 'react-redux';
/** components */
import Message from './Message';
import Toolbar from './Toolbar';

const MessagePanel = () => {
  /** store vars */
  const uid = useSelector((state) => state.user.uid);
  const receiver = useSelector((state) => state.chatroom.receiver);
  const users = useSelector((state) => state.chatroom.users);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const messages =
    useSelector((state) => state.chatroom.messages[receiver]) || [];

  /** vars for scrollbar */
  const panelRef = useRef(null);

  useEffect(() => {
    if (!panelRef.current) return;

    /** ttl height that includes the overflow area */
    const ttlHeight = panelRef.current?.scrollHeight;

    /** static height that not includes the overflow area */
    const staticHeight = panelRef.current.offsetHeight;

    /** position of Y axis position */
    const scrollTopPos = panelRef.current.scrollTop + staticHeight;
    const maxOffsetHeight = 1000;
    const autoScrollThreshold = Math.max(ttlHeight - maxOffsetHeight, 0);

    if (scrollTopPos >= autoScrollThreshold) {
      scrollToBottom();
    }
  }, [messages]);

  /** scroll to the bottom if receiver changed */
  useEffect(() => {
    if (!panelRef.current) return;
    scrollToBottom();
  }, [receiver]);

  const scrollToBottom = () => {
    /** ttl height that includes the overflow area */
    const ttlHeight = panelRef.current?.scrollHeight;
    panelRef.current.scrollTo({
      behavior: 'smooth',
      top: ttlHeight,
    });
  };

  return (
    <div
      className="overflow-y-auto px-4 py-3 d-flex flex-column flex-grow-1 position-relative"
      style={{ paddingBottom: '64px' }}
      ref={panelRef}
    >
      <Toolbar scrollToBottom={scrollToBottom} />
      {messages.map(
        ({ message, receiverUid, senderUid, timestamp, type }, index) => {
          return (
            <Message
              key={`${receiverUid}-${senderUid}-${timestamp}-${message}-${index}`}
              sender={users[senderUid].nickname}
              direction={senderUid === uid ? 'right' : 'left'}
              message={message}
              type={type}
              timestamp={timestamp}
            />
          );
        }
      )}
    </div>
  );
};

export default MessagePanel;
