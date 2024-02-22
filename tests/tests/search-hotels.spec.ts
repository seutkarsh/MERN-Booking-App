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

test("should book hotel", async ({ page }) => {
    await page.goto(UI_URL);

    await page.getByPlaceholder("Where are you going?").fill("Jaipur");

    const date = new Date();
    date.setDate(date.getDate() + 3);
    const formattedDate = date.toISOString().split("T")[0];
    await page.getByPlaceholder("Check-out Date").fill(formattedDate);

    await page.getByRole("button", { name: "Search" }).click();

    await page.getByText("Hotel - 123").click();
    await page.getByRole("button", { name: "Book now" }).click();

    await expect(page.getByText("Total Cost: £4080.00")).toBeVisible();

    const stripeFrame = page.frameLocator("iframe").first();
    await stripeFrame
        .locator('[placeholder="Card number"]')
        .fill("4242424242424242");
    await stripeFrame.locator('[placeholder="MM / YY"]').fill("04/30");
    await stripeFrame.locator('[placeholder="CVC"]').fill("242");
    await stripeFrame.locator('[placeholder="ZIP"]').fill("24225");

    await page.getByRole("button", { name: "Confirm Booking" }).click();
    await expect(page.getByText("Booking Saved!")).toBeVisible();

    await page.getByRole("link", { name: "My Bookings" }).click();
    await expect(page.getByText("Hotel - 123")).toBeVisible();
});