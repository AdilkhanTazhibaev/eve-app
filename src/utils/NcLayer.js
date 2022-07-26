export class NcLayerClient {
  constructor(options) {
      this.url = options.url;
      this.wsConnection = null;
      this.responseProcessed = false;

      // Используются для упрощения тестирования
      this.onRequestReady = null;
      this.onResponseReady = null;
  }

  static get fileStorageType() {
      return 'PKCS12';
  }

  async connect() {
      if (this.wsConnection) {
          throw new Error('Подключение уже выполнено.');
      }
      this.wsConnection = new WebSocket(this.url);

      return new Promise((resolve, reject) => {
          
          this.setHandlers(resolve, reject);

          this.wsConnection.onmessage = (msg) => {
              if (this.responseProcessed) {
                  return;
              }
              this.responseProcessed = true;

              if (this.onResponseReady) {
                  this.onResponseReady(msg.data);
              }

              const response = JSON.parse(msg.data);

              if (response.result && response.result.version) {
                  resolve(response.result.version);
                  return;
              }

              reject(new Error('Ошибка взаимодействия с NCALayer.'));
          };
      });
  }

  async getKeyInfo(storageType) {
      const request = {
          module: 'kz.gov.pki.knca.commonUtils',
          method: 'getKeyInfo',
          args: [
              storageType,
          ],
      };

      this.sendRequest(request);

      return new Promise((resolve, reject) => {
          this.setHandlers(resolve, reject);
      });
  }

  setHandlers(resolve, reject) {
      this.responseProcessed = false;

      this.wsConnection.onerror = () => {
          if (this.responseProcessed) {
              return;
          }
          this.responseProcessed = true;

          reject(new Error('Ошибка взаимодействия с NCALayer. В том случае, если на вашем компьютере не установлен NCALayer, пожалуйста установите его c портала НУЦ РК (https://pki.gov.kz/ncalayer/). Если же NCALayer установлен, но портал выдает ошибку, свяжитесь, пожалуйста, с нашей технической поддержкой.'));
      };

      this.wsConnection.onclose = () => {
          if (this.responseProcessed) {
              return;
          }
          this.responseProcessed = true;

          reject(new Error('NCALayer закрыл соединение.'));
      };

      this.wsConnection.onmessage = (msg) => {
          if (this.responseProcessed) {
              return;
          }
          this.responseProcessed = true;

          if (this.onResponseReady) {
              this.onResponseReady(msg.data);
          }

          const response = JSON.parse(msg.data);

          if (response.code !== '200') {
              reject(new Error(`${response.code}: ${response.message}`));
              return;
          }

          resolve(response.responseObject);
      };
  }

  sendRequest(request) {
      if (!this.wsConnection) {
          throw new Error('Подключение к NCALayer не установлено.');
      }

      const jsonRequest = JSON.stringify(request);
      if (this.onRequestReady) {
          this.onRequestReady(jsonRequest);
      }

      this.wsConnection.send(jsonRequest);
  }
}