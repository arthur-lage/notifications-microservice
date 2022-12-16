import { makeNotification } from "@test/factories/notification-factory";
import { InMemoryNotificationRepository } from "@test/repositories/in-memory-notification-repository";
import { CountRecipientNotifications } from "./count-recipient-notifications";
describe("Count Recipient Notifications", () => {
  it("should be able to return the number of notifications the recipient has", async () => {
    const notificationRepository = new InMemoryNotificationRepository();

    const countRecipientNotifications = new CountRecipientNotifications(
      notificationRepository
    );

    await notificationRepository.create(
      makeNotification({
        recipientId: "recipient-1",
      })
    );

    await notificationRepository.create(
      makeNotification({
        recipientId: "recipient-1",
      })
    );

    await notificationRepository.create(
      makeNotification({
        recipientId: "recipient-2",
      })
    );

    const notificationCountRes = await countRecipientNotifications.execute({
      recipientId: "recipient-1",
    });

    expect(notificationCountRes.count).toBe(2);
  });
});
