import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { TicketPurchasePanel } from "./TicketPurchasePanel.jsx";

import { formatCurrency } from "../../../utils/currency.js";
import { SERVICE_FEE_AMOUNT } from "../../../features/events/config/ticketPurchaseConfig";
import { getCart } from "../../../features/cart/lib/cartStorage.js";
import { CART_STORAGE_KEY } from "../../../features/cart/config/cartConfig.js";

const mockEvent = {
  id: "evt_test",
  title: "Test Event",
  description: "Test description",
  startsAt: "2026-02-14T20:00:00Z",
  doorsAt: "2026-02-14T19:00:00Z",
  timezone: "America/New_York",
  imageUrl: "https://example.com/image.jpg",
  venue: {
    name: "Test Venue",
    city: "Philadelphia, PA",
    address: "123 Test St",
  },
  ticketTiers: [
    {
      id: "general",
      name: "General",
      description: "Access to the main floor and lower bowl seating.",
      price: 79,
      remaining: 10,
      perOrderLimit: 8,
    },
    {
      id: "vip",
      name: "VIP",
      description: "Priority entry with premium sightlines and a merch bundle.",
      price: 139,
      remaining: 0,
      perOrderLimit: 4,
    },
    {
      id: "meet-greet",
      name: "Meet & Greet",
      description:
        "Includes photo opportunity, early access, and exclusive laminate.",
      price: 229,
      remaining: 5,
      perOrderLimit: 2,
    },
  ],
};

function renderTicketPurchasePanel() {
  return render(
    <TicketPurchasePanel
      eventId={mockEvent.id}
      ticketTiers={mockEvent.ticketTiers}
    />,
  );
}

describe("TicketPurchasePanel", () => {
  describe("initial render", () => {
    it("renders the ticket selection panel heading", () => {
      renderTicketPurchasePanel();

      expect(
        screen.getByRole("heading", { name: /select your tickets/i }),
      ).toBeInTheDocument();
    });

    it("renders all ticket tiers for the event", () => {
      renderTicketPurchasePanel();

      const list = screen.getByRole("list", { name: /ticket tiers/i });
      const items = within(list).getAllByRole("listitem");

      expect(items).toHaveLength(mockEvent.ticketTiers.length);
    });

    it("renders each tier with name, description, and price", () => {
      renderTicketPurchasePanel();

      const list = screen.getByRole("list", { name: /ticket tiers/i });
      const items = within(list).getAllByRole("listitem");

      mockEvent.ticketTiers.forEach((tier, index) => {
        const tierItem = items[index];

        expect(within(tierItem).getByText(tier.name)).toBeInTheDocument();
        expect(
          within(tierItem).getByText(tier.description),
        ).toBeInTheDocument();
        expect(
          within(tierItem).getByText(formatCurrency(tier.price)),
        ).toBeInTheDocument();
      });
    });

    it("renders every tier count with default quantity as 0", () => {
      renderTicketPurchasePanel();

      const list = screen.getByRole("list", { name: /ticket tiers/i });
      const items = within(list).getAllByRole("listitem");

      mockEvent.ticketTiers.forEach((tier, index) => {
        const tierItem = items[index];

        expect(
          within(tierItem).getByLabelText(`${tier.name} quantity`),
        ).toHaveTextContent("0");
      });
    });

    it("renders every tier with no available tickets as soldOut and disabled", () => {
      renderTicketPurchasePanel();

      const list = screen.getByRole("list", { name: /ticket tiers/i });
      const items = within(list).getAllByRole("listitem");

      const soldOutTiers = mockEvent.ticketTiers.filter(
        (tier) => tier.remaining === 0,
      );

      soldOutTiers.forEach((tier) => {
        const tierItem = items.find((item) =>
          within(item).queryByText(tier.name),
        );

        expect(tierItem).toBeTruthy();
        expect(tierItem).toHaveAttribute("aria-disabled", "true");
        expect(within(tierItem).getByText(/sold out/i)).toBeInTheDocument();
      });
    });

    it("renders the cta buy button initially disabled when no tickets are selected", () => {
      renderTicketPurchasePanel();

      const panel = screen.getByRole("complementary", {
        name: /select your tickets/i,
      });
      const ctaButton = within(panel).getByRole("button", {
        name: /buy tickets/i,
      });

      expect(ctaButton).toBeDisabled();
    });
  });

  describe("ticket quantity interactions", () => {
    let user;

    beforeEach(() => {
      user = userEvent.setup();
      renderTicketPurchasePanel();
    });

    it("increments a tier quantity when the increase button is clicked", async () => {
      const list = screen.getByRole("list", { name: /ticket tiers/i });
      const generalTicketQuantity =
        within(list).getByLabelText(/general quantity/i);
      const increaseGeneralButton = within(list).getByRole("button", {
        name: /increase quantity of general/i,
      });

      expect(generalTicketQuantity).toHaveTextContent("0");
      await user.click(increaseGeneralButton);
      expect(generalTicketQuantity).toHaveTextContent("1");
    });

    it("disables the increase button when the tier quantity reaches the effective limit", async () => {
      const list = screen.getByRole("list", { name: /ticket tiers/i });
      const generalTicketQuantity =
        within(list).getByLabelText(/general quantity/i);
      const increaseGeneralButton = within(list).getByRole("button", {
        name: /increase quantity of general/i,
      });

      expect(generalTicketQuantity).toHaveTextContent("0");

      for (let i = 0; i < 8; i++) {
        await user.click(increaseGeneralButton);
      }
      expect(increaseGeneralButton).toBeDisabled();
    });

    it("does not increment above the tier effective tier limit", async () => {
      const list = screen.getByRole("list", { name: /ticket tiers/i });
      const generalTicketQuantity =
        within(list).getByLabelText(/general quantity/i);
      const increaseGeneralButton = within(list).getByRole("button", {
        name: /increase quantity of general/i,
      });

      expect(generalTicketQuantity).toHaveTextContent("0");

      for (let i = 0; i < 8; i++) {
        await user.click(increaseGeneralButton);
      }
      expect(generalTicketQuantity).toHaveTextContent("8");

      await user.click(increaseGeneralButton);
      expect(generalTicketQuantity).toHaveTextContent("8");
    });

    it("decrements a tier quantity when the decrease button is clicked", async () => {
      const list = screen.getByRole("list", { name: /ticket tiers/i });
      const generalTicketQuantity =
        within(list).getByLabelText(/general quantity/i);
      const increaseGeneralButton = within(list).getByRole("button", {
        name: /increase quantity of general/i,
      });
      const decreaseGeneralButton = within(list).getByRole("button", {
        name: /decrease quantity of general/i,
      });

      await user.click(increaseGeneralButton);
      expect(generalTicketQuantity).toHaveTextContent("1");

      await user.click(decreaseGeneralButton);
      expect(generalTicketQuantity).toHaveTextContent("0");
    });

    it("disables the decrease button when the tier quantity is 0", async () => {
      const list = screen.getByRole("list", { name: /ticket tiers/i });

      const increaseGeneralButton = within(list).getByRole("button", {
        name: /increase quantity of general/i,
      });
      const decreaseGeneralButton = within(list).getByRole("button", {
        name: /decrease quantity of general/i,
      });

      expect(decreaseGeneralButton).toBeDisabled();

      await user.click(increaseGeneralButton);
      expect(decreaseGeneralButton).not.toBeDisabled();

      await user.click(decreaseGeneralButton);
      expect(decreaseGeneralButton).toBeDisabled();
    });

    it("does not decrement below 0 when the decrease button is clicked", async () => {
      const list = screen.getByRole("list", { name: /ticket tiers/i });
      const generalTicketQuantity =
        within(list).getByLabelText(/general quantity/i);
      const increaseGeneralButton = within(list).getByRole("button", {
        name: /increase quantity of general/i,
      });
      const decreaseGeneralButton = within(list).getByRole("button", {
        name: /decrease quantity of general/i,
      });

      await user.click(increaseGeneralButton);
      expect(generalTicketQuantity).toHaveTextContent("1");

      await user.click(decreaseGeneralButton);
      await user.click(decreaseGeneralButton);
      expect(generalTicketQuantity).toHaveTextContent("0");
    });

    it("keeps sold out tier controls disabled", () => {
      const list = screen.getByRole("list", { name: /ticket tiers/i });
      const vipTicketQuantity = within(list).getByLabelText(/vip quantity/i);
      const increaseVipButton = within(list).getByRole("button", {
        name: /increase quantity of vip/i,
      });
      const decreaseVipButton = within(list).getByRole("button", {
        name: /decrease quantity of vip/i,
      });

      expect(increaseVipButton).toBeDisabled();
      expect(decreaseVipButton).toBeDisabled();
      expect(vipTicketQuantity).toHaveTextContent("0");
    });

    it("enables the buy tickets button when at least one ticket is selected", async () => {
      const list = screen.getByRole("list", { name: /ticket tiers/i });
      const buyTicketsButton = screen.getByRole("button", {
        name: /buy tickets/i,
      });

      const increaseGeneralButton = within(list).getByRole("button", {
        name: /increase quantity of general/i,
      });

      expect(buyTicketsButton).toBeDisabled();

      await user.click(increaseGeneralButton);
      expect(buyTicketsButton).not.toBeDisabled();
    });

    it("keeps the buy tickets button disabled when all selected quantities return to 0", async () => {
      const list = screen.getByRole("list", { name: /ticket tiers/i });
      const buyTicketsButton = screen.getByRole("button", {
        name: /buy tickets/i,
      });

      const increaseGeneralButton = within(list).getByRole("button", {
        name: /increase quantity of general/i,
      });

      const decreaseGeneralButton = within(list).getByRole("button", {
        name: /decrease quantity of general/i,
      });

      expect(buyTicketsButton).toBeDisabled();

      await user.click(increaseGeneralButton);
      expect(buyTicketsButton).not.toBeDisabled();

      await user.click(decreaseGeneralButton);
      expect(buyTicketsButton).toBeDisabled();
    });
  });

  describe("pricing summary", () => {
    let user;

    beforeEach(() => {
      user = userEvent.setup();
      renderTicketPurchasePanel();
    });

    it("displays 0 for subtotal, service fee, and total when no tickets are selected", () => {
      const subtotal = screen.getByRole("paragraph", { name: /subtotal/i });
      const serviceFee = screen.getByRole("paragraph", {
        name: /service fee/i,
      });
      const total = screen.getByRole("paragraph", { name: /pricing total/i });

      expect(subtotal).toHaveTextContent("$0.00");
      expect(serviceFee).toHaveTextContent("$0.00");
      expect(total).toHaveTextContent("$0.00");
    });

    it("displays the calculated subtotal for the selected tickets", async () => {
      const list = screen.getByRole("list", { name: /ticket tiers/i });

      const increaseGeneralButton = within(list).getByRole("button", {
        name: /increase quantity of general/i,
      });

      const generalPrice = mockEvent.ticketTiers.find(
        (tier) => tier.name === "General",
      ).price;

      await user.click(increaseGeneralButton);

      const subtotal = screen.getByRole("paragraph", { name: /subtotal/i });
      expect(subtotal).toHaveTextContent(formatCurrency(generalPrice));

      await user.click(increaseGeneralButton);

      expect(subtotal).toHaveTextContent(formatCurrency(generalPrice * 2));
    });

    it("displays the fixed service fee when at least one ticket is selected", async () => {
      const list = screen.getByRole("list", { name: /ticket tiers/i });

      const increaseGeneralButton = within(list).getByRole("button", {
        name: /increase quantity of general/i,
      });

      const feePrice = screen.getByRole("paragraph", {
        name: /service fee/i,
      });

      expect(feePrice).toHaveTextContent(formatCurrency(0));

      const serviceFee = SERVICE_FEE_AMOUNT;

      await user.click(increaseGeneralButton);
      expect(feePrice).toHaveTextContent(formatCurrency(serviceFee));
    });

    it("displays the calculated total for the selected tickets plus the service fee", async () => {
      const list = screen.getByRole("list", { name: /ticket tiers/i });

      const increaseGeneralButton = within(list).getByRole("button", {
        name: /increase quantity of general/i,
      });

      const generalPrice = mockEvent.ticketTiers.find(
        (tier) => tier.name === "General",
      ).price;

      const serviceFee = SERVICE_FEE_AMOUNT;

      await user.click(increaseGeneralButton);

      const total = screen.getByRole("paragraph", { name: /pricing total/i });
      expect(total).toHaveTextContent(
        formatCurrency(generalPrice + serviceFee),
      );

      await user.click(increaseGeneralButton);

      expect(total).toHaveTextContent(
        formatCurrency(generalPrice * 2 + serviceFee),
      );
    });
  });

  describe("add to cart", () => {
    let user;

    beforeEach(() => {
      localStorage.removeItem(CART_STORAGE_KEY);
      user = userEvent.setup();
      renderTicketPurchasePanel();
    });

    it("saves the selected event tickets to cart when buy tickets is clicked", async () => {
      const list = screen.getByRole("list", { name: /ticket tiers/i });

      const increaseGeneralButton = within(list).getByRole("button", {
        name: /increase quantity of general/i,
      });
      const buyTicketsButton = screen.getByRole("button", {
        name: /buy tickets/i,
      });

      await user.click(increaseGeneralButton);
      await user.click(buyTicketsButton);

      const cart = getCart();

      const generalTier = mockEvent.ticketTiers.find(
        (tier) => tier.id === "general",
      );
      expect(cart).toHaveLength(1);
      expect(cart[0]).toEqual({
        eventId: mockEvent.id,
        selectedTickets: [
          {
            tierId: generalTier.id,
            quantity: 1,
            unitPrice: generalTier.price,
            lineTotal: generalTier.price,
          },
        ],
        subtotal: generalTier.price,
        serviceFee: SERVICE_FEE_AMOUNT,
        total: generalTier.price + SERVICE_FEE_AMOUNT,
        addedAt: expect.any(String),
      });
    });

    it("builds the correct cart payload for multiple selected tiers", async () => {
      const list = screen.getByRole("list", { name: /ticket tiers/i });

      const increaseGeneralButton = within(list).getByRole("button", {
        name: /increase quantity of general/i,
      });
      const increaseMeetGreetButton = within(list).getByRole("button", {
        name: /increase quantity of meet & greet/i,
      });
      const buyTicketsButton = screen.getByRole("button", {
        name: /buy tickets/i,
      });

      await user.click(increaseGeneralButton);
      await user.click(increaseGeneralButton);
      await user.click(increaseMeetGreetButton);
      await user.click(buyTicketsButton);

      const cart = getCart();

      const generalTier = mockEvent.ticketTiers.find(
        (tier) => tier.id === "general",
      );
      const meetGreetTier = mockEvent.ticketTiers.find(
        (tier) => tier.id === "meet-greet",
      );

      const cartSubTotal = generalTier.price * 2 + meetGreetTier.price;
      const cartTotal = cartSubTotal + SERVICE_FEE_AMOUNT;

      expect(cart[0]).toEqual({
        eventId: mockEvent.id,
        selectedTickets: [
          {
            tierId: generalTier.id,
            quantity: 2,
            unitPrice: generalTier.price,
            lineTotal: generalTier.price * 2,
          },
          {
            tierId: meetGreetTier.id,
            quantity: 1,
            unitPrice: meetGreetTier.price,
            lineTotal: meetGreetTier.price,
          },
        ],
        subtotal: cartSubTotal,
        serviceFee: SERVICE_FEE_AMOUNT,
        total: cartTotal,
        addedAt: expect.any(String),
      });
    });

    it("replaces the existing cart selection when the same event is added again", async () => {
      const list = screen.getByRole("list", { name: /ticket tiers/i });

      const increaseGeneralButton = within(list).getByRole("button", {
        name: /increase quantity of general/i,
      });
      const buyTicketsButton = screen.getByRole("button", {
        name: /buy tickets/i,
      });

      await user.click(increaseGeneralButton);
      await user.click(buyTicketsButton);

      const generalPrice = mockEvent.ticketTiers.find(
        (tier) => tier.id === "general",
      ).price;

      const cart = getCart();
      expect(cart).toHaveLength(1);
      expect(cart[0].selectedTickets[0].quantity).toBe(1);
      expect(cart[0].subtotal).toBe(generalPrice);
      expect(cart[0].total).toBe(generalPrice + SERVICE_FEE_AMOUNT);

      await user.click(increaseGeneralButton);
      await user.click(buyTicketsButton);

      const updatedCart = getCart();
      expect(updatedCart).toHaveLength(1);
      expect(updatedCart[0].selectedTickets[0].quantity).toBe(2);
      expect(updatedCart[0].subtotal).toBe(generalPrice * 2);
      expect(updatedCart[0].total).toBe(generalPrice * 2 + SERVICE_FEE_AMOUNT);
    });

    it("shows confirmation feedback after adding tickets to cart", async () => {
      const list = screen.getByRole("list", { name: /ticket tiers/i });

      const increaseGeneralButton = within(list).getByRole("button", {
        name: /increase quantity of general/i,
      });
      const buyTicketsButton = screen.getByRole("button", {
        name: /buy tickets/i,
      });

      await user.click(increaseGeneralButton);
      await user.click(buyTicketsButton);

      expect(screen.getByRole("status")).toHaveTextContent(
        /tickets added to cart/i,
      );
    });

    it("disables the buy tickets button after adding the current selection to cart", async () => {
      const list = screen.getByRole("list", { name: /ticket tiers/i });

      const increaseGeneralButton = within(list).getByRole("button", {
        name: /increase quantity of general/i,
      });
      const buyTicketsButton = screen.getByRole("button", {
        name: /buy tickets/i,
      });

      expect(buyTicketsButton).toBeDisabled();

      await user.click(increaseGeneralButton);

      expect(buyTicketsButton).not.toBeDisabled();
      await user.click(buyTicketsButton);

      expect(buyTicketsButton).toBeDisabled();
    });

    it("enables the buy tickets button again when the selected quantities change", async () => {
      const list = screen.getByRole("list", { name: /ticket tiers/i });

      const increaseGeneralButton = within(list).getByRole("button", {
        name: /increase quantity of general/i,
      });
      const buyTicketsButton = screen.getByRole("button", {
        name: /buy tickets/i,
      });

      await user.click(increaseGeneralButton);
      await user.click(buyTicketsButton);

      expect(buyTicketsButton).toBeDisabled();

      await user.click(increaseGeneralButton);

      expect(buyTicketsButton).not.toBeDisabled();
    });
  });
});
