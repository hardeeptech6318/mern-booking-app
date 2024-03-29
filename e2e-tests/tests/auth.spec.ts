import { test, expect } from '@playwright/test';
const UI_URL="http://localhost:5173/"



test('should allow the user to sign in', async ({ page }) => {
  await page.goto(UI_URL);
  await page.getByRole("link",{name:"Sign In"}).click()
// get the sign in button
  await expect(page.getByRole("heading",{name:"Sign In"})).toBeVisible()
  await page.locator("[name-email]").fill("1@1.com");
  await page.locator("[name-password]").fill("password")

  await page.getByRole("button",{name:'Login'}).click()


  await expect(page.getByText("Sign in successfully")).toBeVisible()
  await expect(page.getByRole("link",{name:"My Bookings"})).toBeVisible()
  await expect(page.getByRole("link",{name:"My Hotels"})).toBeVisible()
  await expect(page.getByRole("button",{name:"Sign Out"})).toBeVisible()
});


