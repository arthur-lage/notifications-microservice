import { Notification } from "./notification";
import { Content } from "./notifications-content";

describe("Notification", () => {
  it("should be able to create a new notification", () => {
    const notification = new Notification({
      category: "social",
      content: new Content("You have received a new friend request.").value,
      recipientId: "123123123",
      readAt: null,
    });

    expect(notification).toBeTruthy();
  });
});
