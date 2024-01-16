import { test, chromium } from '@playwright/test';

const baseUrl = 'http://localhost:8080/engine-rest';
const workerSettings = {
  workerId: 'worker01', // some unique name for the current worker instance
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

test('Login test demo', async () => {
  // // trigger auto-test
  // const messageRes = await axios.post(`${baseUrl}/message`, { messageName });

  // console.log(messageRes);

  // // poll external tasks
  // const res = await axios.post(
  //   `${baseUrl}/external-task/fetchAndLock`,
  //   workerSettings
  // );

  // const externalTasks = res.data as ExternalTask[];

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://ecommerce-playground.lambdatest.io/');

  await page.hover(
    "//a[@data-toggle='dropdown']//span[contains(.,'My account')]"
  );

  await page.click("'Login'");

  await page.fill("input[name='email']", 'chris@gmail.com');
  await page.fill("input[name='password']", 'Pass123');
  await page.click("input[value='Login']");

  await page.close();
  await context.close();
  await browser.close();

  // const completedRes = await Promise.all(
  //   externalTasks.map((et) => {
  //     return axios.post(`${baseUrl}/external-task/${et.id}/complete`, {
  //       workerId: workerSettings.workerId,
  //       variables: { video: { value: et.processInstanceId } },
  //     });
  //   })
  // );

  // console.log(completedRes);
});

// test('test', async ({ page }) => {
//     await page.goto('https://ecommerce-playground.lambdatest.io/');
//     await page.getByRole('link', { name: 'Login' }).click();
//     await page.getByPlaceholder('E-Mail Address').click();
//     await page.getByPlaceholder('E-Mail Address').fill('chris@gmail.com');
//     await page.getByPlaceholder('Password').click();
//     await page.getByPlaceholder('Password').fill('Pass123');
//     await page.getByRole('button', { name: 'Login' }).click();
//     await page.getByRole('link', { name: ' Edit your account' }).click();
//     await page.getByPlaceholder('First Name').click();
//     await page.getByPlaceholder('First Name').fill('test');
//     await page.getByRole('button', { name: 'Continue' }).click();
//   });
