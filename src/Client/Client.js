'use strict';

const EventEmitter = require('events').EventEmitter;
const ClientManager = require('./ClientManager');
const WebSocketManager = require('./websocket/WebSocketManager');

class Client extends EventEmitter {
    constructor(options = {}) {
        super();
           this.manager = new ClientManager(this);

           this.ws = new WebSocketManager(this);
        // Gonna add more stuff here later
    }
    
    login(token) {
          return new Promise((resolve, reject) => {
          if (!token || typeof token !== 'string') throw new Error('TOKEN_INVALID');
          this.manager.connectToWebSocket(token, resolve, reject);
        }).catch(e => {
          this.destroy();
          return Promise.reject(e);
        });
    }
};

module.exports = Client;
