import {expect, test} from "@playwright/test";
import * as path from "path";

const UI_URL = "http://localhost:3000/"
test.beforeEach(async ({page})=>{
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
})

test("should show hotel search results", async ({page})=>{
    await page.goto(UI_URL)

    await page.getByPlaceholder("Where are you going?").fill("Jaipur");
    await page.getByRole("button", { name: "Search" }).click();

    await expect(page.getByText("Hotels found in Jaipur")).toBeVisible();
    await expect(page.getByText("Test Hotel Updated")).toBeVisible();
})

test("should show hotel detail", async ({ page }) => {
    await page.goto(UI_URL);

    await page.getByPlaceholder("Where are you going?").fill("Jaipur");
    await page.getByRole("button", { name: "Search" }).click();

    await page.getByText("Hotel - 123").click();
    await expect(page).toHaveURL(/detail/);
    await expect(page.getByRole("button", { name: "Book now" })).toBeVisible();
});