import React, { createContext, useEffect, useState } from 'react';
// import { w3cwebsocket as WebSocket } from 'websocket';
import WebSocket from '@drayber/adonis-websocket-client';

export const SocketContext = createContext(null);
const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  const connect = () => {
    try {
      console.tron.log('OPEN1');
      const ws = WebSocket('ws://192.168.1.99:3333');
      console.tron.log('OPEN2');
      ws.connect();
      ws.on('open', () => {
        console.tron.log('open', ws);
        setSocket(ws);
        // setReady(readyState?.[ws.readyState] || 'NULL');
      });
      ws.on('ready', (data) => {
        console.tron.log('ready', data);
        // setSocket(ws);
        // setReady(readyState?.[ws.readyState] || 'NULL');
      });
      ws.on('error', (data) => {
        console.tron.log('error', data);
        // setSocket(ws);
        // setReady(readyState?.[ws.readyState] || 'NULL');
      });
      ws.on('close', (data) => {
        console.tron.log('close', data);
        setSocket(null);
        // setReady(readyState?.[ws.readyState] || 'NULL');
      });
    } catch (e) {
      console.tron.log('ERRO');
      console.log(e);
    }
  };

  useEffect(() => {
    connect();
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
