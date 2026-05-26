const prisma = require("../lib/prisma.js");

const getAdminStats = async () => {
  // Total messages
  const totalMessages = await prisma.contact.count();

  // Unread messages
  const unreadMessages = await prisma.contact.count({
    where: { status: "unread" },
  });

  // Read messages
  const readMessages = await prisma.contact.count({
    where: { status: "read" },
  });

  // Daily submissions for the last 30 days
  // Prisma doesn't have a direct grouping by date function that fills in missing days easily,
  // but we can query records from the last 30 days and group them in JavaScript.
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const recentContacts = await prisma.contact.findMany({
    where: {
      createdAt: {
        gte: thirtyDaysAgo,
      },
    },
    select: {
      createdAt: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  // Group by YYYY-MM-DD
  const dailyDataMap = {};
  recentContacts.forEach((contact) => {
    const dateStr = contact.createdAt.toISOString().split("T")[0];
    if (!dailyDataMap[dateStr]) {
      dailyDataMap[dateStr] = 0;
    }
    dailyDataMap[dateStr]++;
  });

  const dailySubmissions = Object.keys(dailyDataMap).map((date) => ({
    date,
    count: dailyDataMap[date],
  }));

  return {
    totalMessages,
    unreadMessages,
    readMessages,
    dailySubmissions,
  };
};

module.exports = {
  getAdminStats,
};
