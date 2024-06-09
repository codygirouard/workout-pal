import React from 'react';

export type WorkoutProps = {
	name: string;
	weight?: number;
	reps?: number;
};

const Workout: React.FC<{ workout: WorkoutProps }> = ({ workout }) => {
	return (
		<div>
			<h2>{workout.name}</h2>
			<p>{workout?.weight}</p>
			<p>{workout?.reps}</p>
		</div>
	);
};

export default Workout;
