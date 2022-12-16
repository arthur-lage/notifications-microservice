import { InMemoryNotificationRepository } from "../../../test/repositories/in-memory-notification-repository";
import { GetRecipientNotifications } from "./get-recipient-notifications";
import { makeNotification } from "../../../test/factories/notification-factory";

describe("Get Recipient Notifications", () => {
  it("should be able to retrive recipent's notifications", async () => {
    const notificationRepository = new InMemoryNotificationRepository();

    const getRecipientNotifications = new GetRecipientNotifications(
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
        recipientId: "recipient-1",
      })
    );

    const { notifications } = await getRecipientNotifications.execute({
      recipientId: "recipient-1",
    });

    expect(notifications).toHaveLength(3);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          recipientId: "recipient-1",
        }),
        expect.objectContaining({
          recipientId: "recipient-1",
        }),
      ])
    );
  });
});
