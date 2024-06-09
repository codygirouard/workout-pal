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

const Blog: React.FC<Props> = (props) => {
	return (
		<Layout>
			<div className="page">
				<h1>Public Feed</h1>
				<main>
					<p>{props.lastWorkoutType}</p>
					<button onClick={() => Router.push('/workout/a', `/workout/a`)} />
				</main>
			</div>
			<style jsx>{`
				.post {
					background: white;
					transition: box-shadow 0.1s ease-in;
				}

				.post:hover {
					box-shadow: 1px 1px 3px #aaa;
				}

				.post + .post {
					margin-top: 2rem;
				}
			`}</style>
		</Layout>
	);
};

export default Blog;
