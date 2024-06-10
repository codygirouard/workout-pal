import React from 'react';
import { GetServerSideProps } from 'next';
import Layout from '../../components/Layout';
import { getSession } from 'next-auth/react';
import prisma from '../../lib/prisma';
import { User, Workout } from '@prisma/client';
import Exercise from '../../components/Exercise';
import { Stats, WorkoutType } from '../../types';
import { exercisesList } from '../../lib/exercisesList';
import Router from 'next/router';

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

const updateLastWorkoutType = async (workoutType: WorkoutType, user?: User) => {
	if (user) {
		try {
			const body = { workoutType: workoutType };
			await fetch('/api/user', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body),
			});
		} catch (error) {
			console.error(error);
		}
	}
};

const Workouts: React.FC<Props> = (props) => {
	const finishWorkout = async () => {
		await updateLastWorkoutType(props.workoutType, props.athlete);
		await Router.push('/');
	};

	return (
		<Layout>
			<div>
				<h2>workouts</h2>
				{exercisesList
					.filter((exercise) => exercise.type === props.workoutType)
					.map((workout) => {
						const userWorkoutData = props?.savedWorkouts?.find(
							(savedWorkout) => savedWorkout.name === workout.name
						);

						const previousStats: Stats = {
							weight: userWorkoutData?.weight || 0,
							reps: userWorkoutData?.reps || 0,
						};

						return (
							<Exercise
								key={workout.name}
								workoutInfo={workout}
								previousStats={previousStats}
								saveStats={!!props.athlete}
							/>
						);
					})}
				<button onClick={finishWorkout}>Finished!</button>
			</div>
		</Layout>
	);
};

export default Workouts;
