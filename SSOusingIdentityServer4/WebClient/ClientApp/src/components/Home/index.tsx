import { useState } from 'react';
import axios from 'axios';

interface Props {
  addErrorMessage: (message: string) => void;
}

const Home = (props: Props) => {
  const [message, setMessage] = useState('');
  const [messageFromProtectedApi, setMessageFromProtectedApi] = useState('');
  
  const onGetMessageHandler = async () => {
    try {
      const response = await axios.get(
        '/api/message/greetings',
        {
          baseURL: 'https://localhost:6001'
        });
      setMessage(response.data);
    } catch (e) {
      props.addErrorMessage(`失敗：GET /api/message/greetings\n${e.message}`);
    }
  };

  const onGetMessageFromProtectedApiHandler = async () => {
    try {
      const response = await axios.get(
        '/api/message/protected',
        {
          baseURL: 'https://localhost:6001'
        });
      setMessageFromProtectedApi(response.data);
    } catch (e) {
      props.addErrorMessage(`失敗：GET /api/message/protected\n${e.message}`);
    }
  };

  return (
    <div>
      <h2>Home</h2>

      <div>
        <div>URI: <a href='https://localhost:6001/api/message/greetings'>https://localhost:6001/api/message/greetings</a></div>
        <div>Message: <span style={{ color: 'green', fontWeight: 'bold' }}>{message}</span></div>
        <button onClick={onGetMessageHandler}>メッセージを取得</button>
      </div>

      <div style={{ marginTop: '20px' }}>
        <div>URI: <a href='https://localhost:6001/api/message/protected'>https://localhost:6001/api/message/protected</a></div>
        <div>Message: <span style={{ color: 'green', fontWeight: 'bold' }}>{messageFromProtectedApi}</span></div>
        <button onClick={onGetMessageFromProtectedApiHandler}>保護されたAPIからメッセージを取得</button>
      </div>
    </div>
  );
};

export default Home;