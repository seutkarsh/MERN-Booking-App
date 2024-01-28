import { test, expect } from '@playwright/test';

const UI_URL = "http://localhost:3000/"

test('should allow the user to sign in', async ({ page }) => {
  await page.goto(UI_URL)

  //get signin button
  await page.getByRole("link",{name:"Sign In"}).click();

  //assert that we have reached sign in page
  await expect(page.getByRole("heading",{name:"Login Into Your Account"})).toBeVisible()

  //enter email and password
  await page.locator("[name=email]").fill("test@test.com");
  await page.locator("[name=password]").fill("password");

  //click button
  await page.getByRole("button",{name:"Login"}).click();

  //assert that user have logged in
  await expect(page.getByText("Login Successful")).toBeVisible();
  await expect(page.getByRole("link",{name:"My Bookings"})).toBeVisible();
  await expect(page.getByRole("link",{name:"My Hotels"})).toBeVisible();
});

