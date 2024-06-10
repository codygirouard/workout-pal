import React, { useState } from 'react';
import { WorkoutInfo, Stats } from '../types';

const createOrUpdateWorkout = async (
	weight: number,
	reps: number,
	workoutInfo: WorkoutInfo
) => {
	try {
		const body = { weight, reps, ...workoutInfo };
		await fetch('/api/workout', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body),
		});
	} catch (error) {
		console.error(error);
	}
};

const Exercise: React.FC<{
	workoutInfo: WorkoutInfo;
	previousStats: Stats;
	saveStats: boolean;
}> = ({ workoutInfo, previousStats, saveStats }) => {
	const [weight, setWeight] = useState(previousStats.weight);
	const [reps, setReps] = useState(previousStats.reps);
	const [saved, setSaved] = useState(false);

	const submitData = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		await createOrUpdateWorkout(weight, reps, workoutInfo);
		setSaved(true);
	};

	return (
		<div>
			<h2>{workoutInfo.name}</h2>
			{saveStats && (
				<form onSubmit={submitData}>
					<input
						autoFocus
						onChange={(e) => setWeight(Number(e.target.value))}
						placeholder="Weight"
						type="text"
						value={weight}
					/>
					<input
						autoFocus
						onChange={(e) => setReps(Number(e.target.value))}
						placeholder="Reps"
						type="text"
						value={reps}
					/>
					<input
						disabled={!reps || !weight || saved}
						type="submit"
						value="Create"
					/>
				</form>
			)}
		</div>
	);
};

export default Exercise;
