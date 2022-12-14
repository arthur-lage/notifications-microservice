import { PrismaService } from "./prisma/prisma.service";
import { Get, Post, Controller, Body } from "@nestjs/common";
import { CreateNotificationDTO } from "./create-notification.dto";

@Controller("notifications")
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  list() {
    return this.prisma.notification.findMany();
  }

  @Post()
  async create(@Body() body: CreateNotificationDTO) {
    const { content, category, recipientId } = body;

    await this.prisma.notification.create({
      data: {
        content,
        category,
        recipientId,
      },
    });
  }
}
