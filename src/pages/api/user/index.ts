import prisma from '../../../lib/prisma';
import { getServerSession } from 'next-auth';
import { authHandler } from '../auth/[...nextauth]';

interface Session {
	user?: {
		email?: string;
	};
}

// POST /api/user
export default async function handle(req, res) {
	const { workoutType } = req.body;

	const session: Session = await getServerSession(req, res, authHandler);
	const user = await prisma.user.update({
		where: { email: session?.user?.email },
		data: {
			lastWorkoutType: workoutType,
		},
		select: {
			name: true,
			lastWorkoutType: true,
		},
	});

	res.json(user);
}
