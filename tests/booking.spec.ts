import test, { APIResponse, expect } from "@playwright/test";
import { BookingsResponseBody } from "../types/BookingResponseBody";

test.describe('Booking', () => {
  test('Get all bookings', async ({ request }) => {
    let bookingResponse: APIResponse;
    await test.step('Send request to get all bookings', async () => {
      bookingResponse = await request.get('/booking');
    });

    await test.step('Verify response is 200 OK', () => {
      expect(bookingResponse.ok()).toBeTruthy();
    });

    await test.step('Bookings list is not empty', async () => {
      const bookingsResponseBody: BookingsResponseBody[] = await bookingResponse.json();
      console.dir(bookingsResponseBody);
      expect(bookingsResponseBody.length).not.toBe(0);
    });
  });
});
