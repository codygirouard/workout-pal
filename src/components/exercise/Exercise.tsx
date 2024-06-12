import React, { useState } from 'react';
import { WorkoutInfo, Stats } from '../../types';
import { TextField, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Workout } from '@prisma/client';
import * as Styled from './styles';

const createOrUpdateWorkout = async (
	weight: number,
	reps: number,
	workoutInfo: WorkoutInfo
) => {
	try {
		const body = { weight, reps, ...workoutInfo };
		const res = await fetch('/api/workout', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body),
		});
		const workout = await res.json();
		return workout;
	} catch (error) {
		console.error(error);
	}
};

type Props = {
	workoutInfo: WorkoutInfo;
	previousStats: Stats;
	saveStats: boolean;
	nextExercise: () => void;
	updateWorkoutData: (workout: Workout) => void;
};

const Exercise: React.FC<Props> = ({
	workoutInfo,
	previousStats,
	saveStats,
	nextExercise,
	updateWorkoutData,
}) => {
	const [weight, setWeight] = useState<number>(previousStats.weight);
	const [reps, setReps] = useState<number>(previousStats.reps);
	const [loading, setLoading] = useState<boolean>(false);

	const submitData = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		setLoading(true);
		const workout = await createOrUpdateWorkout(weight, reps, workoutInfo);
		updateWorkoutData(workout);
		nextExercise();
	};

	const image = require(`../../assets/${workoutInfo.image}.gif`).default.src;

	return (
		<Styled.Content>
			<Typography variant="h5">{workoutInfo.name}</Typography>
			<Styled.Gif src={image} alt={workoutInfo.name} />
			<Typography>{workoutInfo.details}</Typography>
			{saveStats && (
				<Styled.Form onSubmit={submitData}>
					<TextField
						id="outlined-basic"
						label="Weight (lbs)"
						variant="outlined"
						value={weight}
						onChange={(e) => setWeight(Number(e.target.value))}
					/>
					<TextField
						id="outlined-basic"
						label="Reps"
						variant="outlined"
						value={reps}
						onChange={(e) => setReps(Number(e.target.value))}
					/>
					<LoadingButton
						disabled={!reps}
						loading={loading}
						variant="contained"
						type="submit"
					>
						Save
					</LoadingButton>
				</Styled.Form>
			)}
		</Styled.Content>
	);
};

export default Exercise;
