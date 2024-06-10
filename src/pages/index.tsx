import React from 'react';
import { GetServerSideProps } from 'next';
import Layout from '../components/Layout';
import { getSession } from 'next-auth/react';
import prisma from '../lib/prisma';
import Router from 'next/router';

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	let lastWorkoutType = null;
	const session = await getSession({ req });

	if (session?.user) {
		const user = await prisma.user.findUnique({
			where: { email: session.user.email },
		});

		lastWorkoutType = user?.lastWorkoutType;
	}

	return {
		props: { lastWorkoutType },
	};
};

type Props = {
	lastWorkoutType?: String;
};

const Home: React.FC<Props> = (props) => {
	return (
		<Layout>
			<div className="page">
				<h1>Home</h1>
				<main>
					<p>{props.lastWorkoutType}</p>
					<button onClick={() => Router.push('/workouts/a')}>a</button>
					<button onClick={() => Router.push('/workouts/b')}>b</button>
				</main>
			</div>
		</Layout>
	);
};

export default Home;
