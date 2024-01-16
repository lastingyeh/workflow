import * as ssh from 'ssh2';

export default class SSHServer {
  config: ssh.ConnectConfig;
  sshClient: ssh.Client;
  username: string;
  password: string;

  constructor(config: ssh.ConnectConfig) {
    this.config = config;
    this.sshClient = new ssh.Client();
  }

  async connect() {
    this.sshClient.connect(this.config);

    return new Promise((resolve, reject) => {
      this.sshClient
        .on('ready', () => {
          console.log('Connected via SSH!');
          resolve(this.sshClient);
        })
        .on('error', (err) => {
          console.log('Error connecting via SSH:', err);
          reject(err);
        });
    });
  }

  async exec(command: string) {
    return new Promise((resolve, reject) => {
      this.sshClient.exec(command, (err, stream) => {
        if (err) {
          return reject(err);
        }

        stream
          .on('close', (code, signal) => {
            return resolve('close');
          })
          .on('data', (data) => {
            console.log('STDOUT: ' + data);
          })
          .stderr.on('data', (data) => {
            console.log('STDERR: ' + data);
          });
      });
    });
  }

  async close() {
    return new Promise((resolve, reject) => {
      if (this.sshClient) {
        this.sshClient.end();
        this.sshClient.destroy();

        return resolve('destroy');
      }
      return reject('sshClient not exist');
    });
  }
}
