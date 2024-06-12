import React from 'react';
import { GetServerSideProps } from 'next';
import Layout from '../../components/layout/Layout';
import { getSession } from 'next-auth/react';
import prisma from '../../lib/prisma';
import { User, Workout } from '@prisma/client';
import { WorkoutType } from '../../types';
import WorkoutSplit from '../../components/workoutSplit/WorkoutSplit';

export const getServerSideProps: GetServerSideProps = async ({
	req,
	params,
}) => {
	const session = await getSession({ req });
	const workoutType = String(params?.type);
	if (!session) {
		return { props: { workoutType } };
	}

	const savedWorkouts = await prisma.workout.findMany({
		where: {
			athlete: { email: session.user.email },
			workoutType,
		},
	});

	return {
		props: {
			workoutType,
			savedWorkouts,
			athlete: session.user,
		},
	};
};

type Props = {
	workoutType: WorkoutType;
	savedWorkouts?: Workout[];
	athlete?: User;
};

const Workouts: React.FC<Props> = ({ workoutType, athlete, savedWorkouts }) => {
	return (
		<Layout>
			<WorkoutSplit
				workoutType={workoutType}
				athlete={athlete}
				savedWorkouts={savedWorkouts}
			/>
		</Layout>
	);
};

export default Workouts;
