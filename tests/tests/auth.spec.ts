import { test, expect } from '@playwright/test';

const UI_URL = "http://localhost:3000/"
const testRegisterEmail: string = `testemail${Math.floor(Math.random()*90000)+10000}@test.com`

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


test("should allow user to register", async({page})=>{
  await page.goto(UI_URL)

  //get to register page using sign in then register link
  await page.getByRole("link",{name:"Sign In"}).click()
  await page.getByRole("link",{name:" Create an account here"}).click()
  await expect(page.getByRole("heading",{name:"Create an Account"})).toBeVisible();

  //add data to fields
  await page.locator("[name=firstName]").fill("TestFirstName")
  await page.locator("[name=lastName]").fill("TestLastName")
  await page.locator("[name=email]").fill(testRegisterEmail)
  await page.locator("[name=password]").fill("password")
  await page.locator("[name=confirmPassword]").fill("password")

  //click create account button
  await page.getByRole("button",{name:"Create Account"}).click()

  //assert registration successful
  await expect(page.getByText("Registration Successful")).toBeVisible();
})