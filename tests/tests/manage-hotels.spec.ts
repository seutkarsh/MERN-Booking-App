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

test("should allow user to add a hotel", async ({page})=>{
    await page.goto(`${UI_URL}add-hotel`)

    await expect(page.getByRole("heading",{name:"Add Hotel"})).toBeVisible()

await page.locator("[name='name']").fill("Test Hotel")
    await page.locator("[name='city']").fill("Test City")
    await page.locator("[name='country']").fill("Test Country")
    await page.getByLabel("description").fill("Test Description")
    await page.locator("[name='pricePerNight']").fill("1000")
    await page.selectOption("select[name='starRating']","3")

    await page.getByText("Budget").click();
    await page.getByLabel("Free WiFi").check()
    await page.getByLabel("Parking").check()
    await page.locator("[name='adultCount']").fill("2")
    await page.locator("[name='childCount']").fill("1")

    await page.setInputFiles("[name='imageFiles']",[path.join(__dirname,"assets","hotel-1.jpeg"),path.join(__dirname,"assets","hotel-2.jpeg"),path.join(__dirname,"assets","hotel-3.jpeg")])

    await page.getByRole("button",{name:"Save"}).click();
    await expect(page.getByText("Hotel Added Successfully")).toBeVisible({timeout:30000})
})