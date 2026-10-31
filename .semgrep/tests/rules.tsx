// Synthetic fixtures only; no real credentials.
function money(amount: number | null) {
  // ruleid: plumb-money-unknown-is-not-zero
  const lost = <Money amount={amount ?? 0} />;
  // ruleid: plumb-money-unknown-is-not-zero
  const alsoLost = <Money amount={amount || 0} />;
  // ok: plumb-money-unknown-is-not-zero
  const preserved = <Money amount={amount} />;
  // ok: plumb-money-unknown-is-not-zero
  const known = <Money amount={0} />;
}
function toCustomerPayload(estimate: Estimate) {
  // ruleid: plumb-customer-private-field
  return { total: estimate.total, internalRate: estimate.internalRate };
}
function toCustomerPayload(estimate: Estimate) {
  // ruleid: plumb-customer-private-field
  return { contractorNotes: estimate.contractorNotes };
}
function toCustomerPayload(estimate: Estimate) {
  // ok: plumb-customer-private-field
  return { total: estimate.total, revision: estimate.revision };
}
function toContractorPayload(estimate: Estimate) {
  // ok: plumb-customer-private-field
  return { internalRate: estimate.internalRate };
}
const styles = stylex.create({
  button: {
    // ruleid: plumb-stylex-raw-brand-color
    color: '#5c87b8',
    // ok: plumb-stylex-raw-brand-color
    backgroundColor: tokens.surface,
  },
});
// ok: plumb-stylex-raw-brand-color
const suppliedPaletteAnchor = { color: '#5c87b8' };
// ruleid: plumb-client-secret-env
const forbidden = import.meta.env.VITE_AWS_SECRET_ACCESS_KEY;
// ok: plumb-client-secret-env
const publicOrigin = import.meta.env.VITE_PUBLIC_ORIGIN;
// ok: plumb-client-secret-env
const text = 'VITE_API_SECRET is a forbidden name';
