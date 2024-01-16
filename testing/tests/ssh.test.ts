import 'dotenv/config';
import { test, expect } from '@playwright/test';
import SSHService from '../services/sshService';

const { SSH_HOST, SSH_USERNAME, SSH_PASSWORD } = process.env;

const client = new SSHService({
  host: SSH_HOST,
  username: SSH_USERNAME,
  password: SSH_PASSWORD,
});

test.beforeAll(async () => {
  await client.connect();
  await client.exec("TZ=Asia/Taipei sudo date -s '2020-12-11 08:30:00'");
});

test('ssh test', async ({ page }) => {
  await page.waitForTimeout(2 * 1000);
  console.log('test');
});

test.afterAll(async () => {
  await client.exec(`TZ=Asia/Taipei sudo date -s '${new Date()}'`);
  await client.close();
});
