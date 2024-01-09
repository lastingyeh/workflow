import { test, expect } from '@playwright/test';
import WorkflowService from '../services/workflowService';
import { ExternalTask, WorkerSettings } from '../util/type';

let workflowService: WorkflowService;
let externalTasks: ExternalTask[];

const workerSettings: WorkerSettings = {
  workerId: 'worker01',
  maxTasks: 5,
  topics: [
    {
      topicName: 'create-process-instance',
      lockDuration: 10000, // How much time the worker thinks he needs to process the task
      variables: ['video'], // Which variables should be returned in the response (to avoid additional REST calls to read data)
    },
  ],
};
const messageName = 'auto-test-message';

test.beforeAll('publish', async () => {
  workflowService = new WorkflowService(workerSettings);

  // message trigger
  await workflowService.sendAutoTestMessage(messageName);

  // fetch lock external tasks
  externalTasks = await workflowService.startExternalTasks();
});

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.hover("//a[contains(text(),'tasks-learning')]");
  await page.getByRole('link', { name: 'tasks-learning' }).click();

  await page.hover("(//ul[@class='ant-card-actions']//span)[1]");
  await page.getByRole('button', { name: 'send' }).click();

  await page.hover(
    "//a[@class='ant-typography css-dev-only-do-not-override-1nvnawg']"
  );
  await page.getByRole('link', { name: 'process started: tasks-' }).click();
  await page.hover("//a[contains(text(),'review')]");
  await page.getByText('review').click();
  await page.getByRole('button', { name: 'OK' }).click();

  await page.hover("//span[text()='Histories']");
  await page.locator("//span[text()='Histories']").click();

  await page.close();
});

test.afterAll('complete', async () => {
  const results = await workflowService.completeExternalTasks(externalTasks, {
    video: externalTasks[0].processInstanceId,
  });

  console.log(results);
  console.log('test completed');
});
