import { expect, test } from "@playwright/test";

test("completes checkout and shows generated ticket in My Tickets", async ({
  page,
}) => {
  await page.goto("/events/evt_003");

  await expect(
    page.getByRole("heading", { name: /indie sunset sessions/i }),
  ).toBeVisible();

  await page
    .getByRole("button", { name: /increase quantity of general/i })
    .click();

  await expect(
    page.getByRole("button", { name: /buy tickets/i }),
  ).toBeEnabled();

  await page.getByRole("button", { name: /buy tickets/i }).click();

  await expect(page.getByText(/tickets added to cart/i)).toBeVisible();
  await expect(page.getByRole("link", { name: /go to cart/i })).toBeVisible();

  await page.getByRole("link", { name: /go to cart/i }).click();

  await expect(page.getByRole("heading", { name: /checkout/i })).toBeVisible();

  await expect(page.getByText(/indie sunset sessions/i)).toBeVisible();
  await expect(page.getByText(/general/i)).toBeVisible();

  await page.getByRole("button", { name: /next: enter your details/i }).click();

  await page
    .getByRole("textbox", { name: /primary contact name/i })
    .fill("John Doe");
  await page
    .getByRole("textbox", { name: /email address/i })
    .fill("john@doe.com");
  await page.getByRole("textbox", { name: /phone number/i }).fill("5551234567");

  await page
    .getByRole("button", { name: /next: choose payment method/i })
    .click();

  await page
    .getByRole("textbox", { name: /card number/i })
    .fill("4242424242424242");
  await page.getByRole("textbox", { name: /expiry/i }).fill("0129");
  await page.getByRole("textbox", { name: /cvc/i }).fill("123");

  await page.getByRole("button", { name: /complete purchase/i }).click();

  await expect(
    page.getByRole("heading", { name: /order confirmed/i }),
  ).toBeVisible();

  await page.getByRole("link", { name: /go to tickets/i }).click();

  await expect(page).toHaveURL(/\/my-tickets$/);
  await expect(
    page.getByRole("heading", { name: /my tickets/i }),
  ).toBeVisible();
  await expect(page.getByText(/indie sunset sessions/i)).toBeVisible();
  await expect(page.getByText(/john doe/i)).toBeVisible();
  await expect(page.getByText(/tk-general-001/i)).toBeVisible();
});
