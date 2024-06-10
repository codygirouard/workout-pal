import prisma from '../../../lib/prisma';
import { getServerSession } from 'next-auth';
import { authHandler } from '../auth/[...nextauth]';

interface Session {
	user?: {
		email?: string;
	};
}

// POST /api/workout
export default async function handle(req, res) {
	const { name, type, weight, reps } = req.body;

	const session: Session = await getServerSession(req, res, authHandler);
	const savedWorkout = await prisma.workout.upsert({
		where: { name },
		update: {
			weight,
			reps,
		},
		create: {
			name,
			weight,
			reps,
			workoutType: type,
			athlete: { connect: { email: session?.user?.email } },
		},
	});

	res.json(savedWorkout);
}
