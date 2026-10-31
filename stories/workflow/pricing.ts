// One pricing source so the estimate, proposal, and Framed stories agree to the cent.
import { lineItems } from "./fixtures";

export const OVERHEAD = 0.1;
export const MARKUP = 0.15;
const round = (n: number) => Math.round(n * 100) / 100;

export function price(items = lineItems) {
  const priced = items.filter((i) => i.qty !== null);
  const cost = round(priced.reduce((s, i) => s + (i.qty ?? 0) * i.rate, 0));
  const overhead = round(cost * OVERHEAD);
  const markup = round((cost + overhead) * MARKUP);
  const total = round(cost + overhead + markup);
  // Customer amounts: overhead and markup folded in proportionally; rounding remainder to the largest line.
  // Allowances stay at face value for the customer; overhead and markup fold into fixed lines only.
  const isAllowance = (i: (typeof items)[number]) => i.id === "fin";
  const fixedCost = priced.filter((i) => !isAllowance(i)).reduce((s, i) => s + (i.qty ?? 0) * i.rate, 0);
  const fold = total - priced.filter(isAllowance).reduce((s, i) => s + (i.qty ?? 0) * i.rate, 0);
  const customer = priced.map((i) => ({ ...i, allowance: isAllowance(i), amount: isAllowance(i) ? (i.qty ?? 0) * i.rate : round(((i.qty ?? 0) * i.rate * fold) / fixedCost) }));
  const drift = round(total - customer.reduce((s, i) => s + i.amount, 0));
  const largest = customer.filter((i) => !i.allowance).reduce((a, b) => (b.amount > a.amount ? b : a));
  largest.amount = round(largest.amount + drift);
  return {
    cost, overhead, markup, total,
    margin: total ? (total - cost) / total : 0,
    unpriced: items.length - priced.length,
    customer,
    breakdown: [
      { id: "labour", label: "Labour", amount: 2040, formula: "24 hr × $85.00" },
      { id: "materials", label: "Materials", amount: round(cost - 2040 - 4200) },
      { id: "allowance", label: "Finish materials", kind: "allowance" as const, amount: 4200, note: "customer to select" },
      { id: "overhead", label: "Overhead", amount: overhead, formula: `${OVERHEAD * 100}%`, private: true },
      { id: "markup", label: "Markup", amount: markup, formula: `${MARKUP * 100}%`, private: true },
    ],
  };
}
