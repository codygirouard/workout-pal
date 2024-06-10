import React from 'react';
import { GetServerSideProps } from 'next';
import Layout from '../components/layout/Layout';
import { getSession } from 'next-auth/react';
import prisma from '../lib/prisma';
import PickWorkout from '../components/pickWorkout/PickWorkout';
import { WorkoutType } from '../types';

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	let lastWorkoutType = null;
	const session = await getSession({ req });
	const signedIn = !!session?.user;

	if (signedIn) {
		const user = await prisma.user.findUnique({
			where: { email: session.user.email },
		});

		lastWorkoutType = user?.lastWorkoutType;
	}

	return {
		props: { lastWorkoutType, signedIn },
	};
};

type Props = {
	lastWorkoutType?: WorkoutType;
	signedIn: boolean;
};

const Home: React.FC<Props> = (props) => {
	return (
		<Layout>
			<PickWorkout
				lastWorkoutType={props.lastWorkoutType}
				signedIn={props.signedIn}
			/>
		</Layout>
	);
};

export default Home;
