import React from 'react';
import { GetServerSideProps } from 'next';
import ReactMarkdown from 'react-markdown';
import Layout from '../../components/Layout';
import { PostProps } from '../../components/Post';
import { getSession } from 'next-auth/react';
import prisma from '../../lib/prisma';
import { Workout } from '@prisma/client';

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const session = await getSession({ req });
	if (!session) {
		return { props: { drafts: [] } };
	}

	const workouts = await prisma.workout.findMany({
		where: {
			athlete: { email: session.user.email },
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
	workouts?: Workout[];
};

const Post: React.FC<Props> = (props) => {
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
			<style jsx>{`
				.page {
					background: white;
					padding: 2rem;
				}

				.actions {
					margin-top: 2rem;
				}

				button {
					background: #ececec;
					border: 0;
					border-radius: 0.125rem;
					padding: 1rem 2rem;
				}

				button + button {
					margin-left: 1rem;
				}
			`}</style>
		</Layout>
	);
};

export default Post;
