import { test, expect, APIResponse } from '@playwright/test';
import { AuthRequestBody } from '../types/AuthRequestBody';
import { AuthResponseBody } from '../types/AuthResponseBody';

test.describe('Authentication tests', () => {
  let authResponse: APIResponse;
  
  test('Valid authentication', async ({ request }) => {
    await test.step('Send authentication request with valid credentials', async () => {
      const authRequestBody: AuthRequestBody = {
        username: "admin",
        password: "password123"
      }
    
      authResponse = await request.post('/auth', { data: authRequestBody });
    })
    
    await test.step('Verify response is 200 OK', async () => {
      expect(authResponse.ok()).toBeTruthy();
    });
  });

  test('Invalid authentication', async ({ request }) => {
    let authResponse: APIResponse;

    await test.step('Send authentication request with invalid credentials', async () => {
      const authRequestBody: AuthRequestBody = {
        username: "wrongusername",
        password: "wrongpassword"
      }
    
      authResponse = await request.post('/auth', { data: authRequestBody });
    })
    await test.step('Verify response is 401 Unauthorized', async () => {
      expect(authResponse.status(), "Status code should be 401").toBe(401);
    });
    
  });
});


