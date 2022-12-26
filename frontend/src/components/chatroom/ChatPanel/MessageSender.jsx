import { useContext, useState, useRef } from 'react';

/* third-party components */
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { MdSend, MdImage } from 'react-icons/md';

/** context */
import { WebSocketContext } from 'context/WebSocketContext';

/** redux */
import { useSelector } from 'react-redux';

/** utils */
import { compressImage, transformToBase64 } from 'utils/fileTransform';
import { TEXT, IMAGE } from 'utils/consts';

const MessageSender = () => {
  const [text, setText] = useState('');
  const inputRef = useRef(null);
  /** context var */
  const ws = useContext(WebSocketContext);
  /** store vars */
  const receiver = useSelector((state) => state.chatroom.receiver);
  const uid = useSelector((state) => state.user.uid);
  const nickname = useSelector((state) => state.user.nickname);

  const sendMessageHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    ws.sendMessage(nickname, uid, receiver, text, TEXT);
    setText('');
  };

  const sendImage = async (_e) => {
    if (!inputRef.current.files) return;
    const imageFile = inputRef.current.files[0];
    try {
      const compressedFile = await compressImage(imageFile);
      /* Convert Image to base64 decode */
      const fileBase64 = await transformToBase64(compressedFile);
      ws.sendMessage(nickname, uid, receiver, fileBase64, IMAGE);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <Form onSubmit={sendMessageHandler} className="w-100">
      <InputGroup>
        <Form.Control
          placeholder="Enter your message"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="py-3"
        ></Form.Control>
        <Button
          variant="outline-light"
          style={{ borderColor: '#ced4da', color: '#2e86c1' }}
          onClick={() => inputRef.current.click()}
        >
          <MdImage size={24} />
        </Button>
        <Button
          className="d-flex align-items-center px-4 rounded-3"
          type="submit"
        >
          SEND
          <MdSend className="ms-2" />
        </Button>
      </InputGroup>
      <input
        type="file"
        hidden={true}
        ref={inputRef}
        accept="image/*"
        onChange={sendImage}
      />
    </Form>
  );
};

export default MessageSender;
