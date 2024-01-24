import { PrismaClient } from "@prisma/client";

type ClipboardItem = {
  name: string;
  image?: string | null;
  comments?: string | null;
};

const dbConnection = new PrismaClient();

export class ClipboardsSource {
  async createClipboard(owner: string) {
    const response = await dbConnection.clipboard.create({
      data: {
        address: owner,
        name: "My Clipboard",
      },
    });
    return response;
  }

  async getClipboard(owner: string) {
    const response = await dbConnection.clipboard.findUnique({
      where: {
        address: owner,
      },
      include: {
        items: true,
      },
    });
    return response;
  }

  async addItem(owner: string, item: ClipboardItem) {
    const clipboardCreated = await dbConnection.clipboard.findMany({
      where: {
        address: owner,
      },
    });
    if (clipboardCreated.length === 0) {
      await this.createClipboard(owner);
    }
    const response = await dbConnection.clipboard.update({
      where: {
        address: owner,
      },
      data: {
        items: {
          create: {
            name: item.name,
            image: item.image,
            comments: item.comments,
          },
        },
      },
      include: {
        items: true,
      },
    });

    return response;
  }

  async updateItem(owner: string, id: string, item: ClipboardItem) {
    const response = await dbConnection.clipboard.update({
      where: {
        address: owner,
      },
      data: {
        items: {
          update: {
            where: {
              id: Number(id),
            },
            data: {
              name: item.name,
              image: item.image,
              comments: item.comments,
            },
          },
        },
      },
      include: {
        items: true,
      },
    });

    return response;
  }

  async deleteItem(owner: string, id: string) {
    const response = await dbConnection.clipboard.update({
      where: {
        address: owner,
      },
      data: {
        items: {
          delete: {
            id: Number(id),
          },
        },
      },
      include: {
        items: true,
      },
    });

    return response;
  }
}
