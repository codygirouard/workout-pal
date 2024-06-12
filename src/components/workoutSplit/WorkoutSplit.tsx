import React, { useState } from 'react';
import Exercise from '../exercise/Exercise';
import Stepper from '../Stepper';
import { User, Workout } from '@prisma/client';
import { Stats, WorkoutType } from '../../types';
import { exercisesList } from '../../lib/exercisesList';
import Router from 'next/router';
import * as Styled from './styles';

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

type Props = {
	workoutType: WorkoutType;
	savedWorkouts?: Workout[];
	athlete?: User;
};

const WorkoutSplit: React.FC<Props> = ({
	workoutType,
	athlete,
	savedWorkouts,
}) => {
	const [activeStep, setActiveStep] = useState<number>(0);

	const finishWorkout = async () => {
		await updateLastWorkoutType(workoutType, athlete);
		await Router.push('/');
	};

	const updateWorkoutData = (workout: Workout) => {
		const savedWorkout = savedWorkouts?.find(
			(savedWorkout) => savedWorkout.name === workout.name
		);
		if (savedWorkout) {
			savedWorkout.weight = workout.weight;
			savedWorkout.reps = workout.reps;
		} else {
			savedWorkouts.push(workout);
		}
	};

	const exercises = exercisesList.filter(
		(exercise) => exercise.type === workoutType
	);

	const workout = exercises[activeStep];

	const userWorkoutData = savedWorkouts?.find(
		(savedWorkout) => savedWorkout.name === workout.name
	);

	const previousStats: Stats = {
		weight: userWorkoutData?.weight || 0,
		reps: userWorkoutData?.reps || 0,
	};
	return (
		<div>
			<Styled.Content>
				<Exercise
					key={workout.name}
					workoutInfo={workout}
					previousStats={previousStats}
					updateWorkoutData={updateWorkoutData}
					saveStats={!!athlete}
					nextExercise={() =>
						setActiveStep((prevActiveStep) => prevActiveStep + 1)
					}
				/>
			</Styled.Content>
			<Stepper
				maxSteps={exercises.length}
				activeStep={activeStep}
				setActiveStep={setActiveStep}
				finishWorkout={finishWorkout}
			/>
		</div>
	);
};

export default WorkoutSplit;
