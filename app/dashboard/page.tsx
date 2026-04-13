import { auth, currentUser } from '@clerk/nextjs/server';
import { prisma } from '@/libs/prisma';
import DashboardClient from './dashboard-client';

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId)
    return (
      <div className="bg-google-light text-google-dark flex min-h-screen items-center justify-center font-medium">
        Error: Unauthorized Access
      </div>
    );

  let user = await prisma.user.findUnique({
    where: { clerkId: userId },
    include: { watchlists: true, priceAlerts: true },
  });

  if (!user) {
    const clerkUser = await currentUser();
    if (!clerkUser)
      return (
        <div className="bg-google-light text-google-dark flex min-h-screen items-center justify-center font-medium">
          Error: Unauthorized Access
        </div>
      );

    user = await prisma.user.create({
      data: {
        clerkId: userId,
        email: clerkUser.emailAddresses[0].emailAddress,
      },
      include: { watchlists: true, priceAlerts: true },
    });
  }

  return <DashboardClient user={user} />;
}
