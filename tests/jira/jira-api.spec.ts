import 'dotenv/config';
import test, { APIResponse } from '@playwright/test';

test.describe('Jira API', () => {
  test('Auth', async({ request }) => {
    const response: APIResponse = await request.get('https://fertavora.atlassian.net/rest/api/2/project/10000', {
      headers: {
        "Authorization": `Basic ${process.env.JIRA_BASIC_AUTH}`
      }
    });

    const responseJson = await response.json();
    console.log(await response.status());
    console.log(await response.statusText());
    console.dir(responseJson);
  });
});
