import React from 'react';
import { GetServerSideProps } from 'next';
import Layout from '../../components/Layout';
import { WorkoutProps } from '../../components/Workout';
import { getSession } from 'next-auth/react';
import prisma from '../../lib/prisma';

export const getServerSideProps: GetServerSideProps = async ({
	req,
	params,
}) => {
	const session = await getSession({ req });
	if (!session) {
		return { props: { workouts: [] } };
	}

	const workouts = await prisma.workout.findMany({
		where: {
			athlete: { email: session.user.email },
			workoutType: String(params?.type),
		},
		select: {
			name: true,
			weight: true,
			reps: true,
		},
	});

	return {
		props: { workouts },
	};
};

type Props = {
	workouts?: WorkoutProps[];
};

const Workouts: React.FC<Props> = (props) => {
	return (
		<Layout>
			<div>
				<h2>workouts</h2>
				{props.workouts.map((workout) => {
					return (
						<p
							key={workout.name}
						>{`${workout.name},${workout.weight},${workout.reps}`}</p>
					);
				})}
			</div>
		</Layout>
	);
};

export default Workouts;
