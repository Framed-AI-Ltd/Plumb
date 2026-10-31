import { describe, expect, it } from "vitest";
import { settled } from "../src/patterns/framed";

describe("async form callbacks", () => {
  it("recovers from a synchronous exception before any promise exists", async () => {
    expect(await settled(() => { throw new Error("offline"); })).toBe(false);
  });
  it("recovers from a rejected save", async () => {
    expect(await settled(() => Promise.reject(new Error("offline")))).toBe(false);
  });
  it("preserves the public promise and plain-result API", async () => {
    expect(await settled(Promise.resolve())).toBe(true);
    expect(await settled(Promise.reject(new Error("offline")))).toBe(false);
    expect(await settled(undefined)).toBe(true);
  });
  it("accepts synchronous and asynchronous successful saves", async () => {
    expect(await settled(() => undefined)).toBe(true);
    expect(await settled(() => Promise.resolve())).toBe(true);
  });
});
