import { Content } from "./notifications-content";

describe("Notification Content", () => {
  it("should be able to create a new content", () => {
    expect(
      () => new Content("You have received a new friend request.")
    ).toBeTruthy();
  });

  it("should not be able to create a new content with a value less than 5 characters", () => {
    expect(() => new Content("aaa")).toThrow();
  });

  it("should not be able to create a new content with a value greater than 240 characters", () => {
    expect(() => new Content("a".repeat(250))).toThrow();
  });
});
