import React from 'react';
import { WorkoutType } from '../../types';
import ToggleButton from './ToggleButton';
import FingerEmoji from './FingerEmoji';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Button, Typography, useTheme } from '@mui/material';
import Router from 'next/router';
import * as Styled from './styles';

type Props = {
	lastWorkoutType: WorkoutType;
	signedIn: boolean;
};

const PickWorkout: React.FC<Props> = ({ lastWorkoutType, signedIn }) => {
	const { palette } = useTheme();
	const oppositeWorkoutType: WorkoutType = lastWorkoutType === 'a' ? 'b' : 'a';

	const [workoutType, setWorkoutType] = React.useState<WorkoutType | null>(
		lastWorkoutType ? oppositeWorkoutType : null
	);

	const handleChange = (
		event: React.MouseEvent<HTMLElement>,
		newWorkoutType: WorkoutType
	) => {
		setWorkoutType(newWorkoutType);
	};

	const handleStartWorkout = async () => {
		await Router.push(`/workouts/${workoutType}`);
	};

	const createAccountString = !signedIn
		? 'To keep track of your workouts, create an account. '
		: '';

	return (
		<Styled.Content>
			<Typography variant="h2" sx={{ textAlign: 'center' }}>
				&#x1F3CB;&#x1F3FB; Pick a workout split:
			</Typography>

			<Typography variant="h5" sx={{ textAlign: 'center' }}>
				{lastWorkoutType ? (
					<>
						<FingerEmoji workoutType={oppositeWorkoutType} position="left" />
						{`Your last workout split was ${lastWorkoutType.toUpperCase()}, you should do ${oppositeWorkoutType.toUpperCase()} today!`}
						<FingerEmoji workoutType={oppositeWorkoutType} position="right" />
					</>
				) : (
					createAccountString +
					"Since we don't have information on your last workout, feel free to pick either split!"
				)}
			</Typography>

			<ToggleButtonGroup
				color="primary"
				value={workoutType}
				exclusive
				onChange={handleChange}
				aria-label="Workout Type"
				size="large"
				fullWidth
				sx={{
					width: '40rem',
					maxWidth: '100%',
					border: `${palette.primary.main} 1px solid`,
				}}
			>
				<ToggleButton workoutType="a" />
				<ToggleButton workoutType="b" />
			</ToggleButtonGroup>
			<Button
				onClick={handleStartWorkout}
				disabled={workoutType === null}
				variant="outlined"
				size="large"
				sx={{
					color: palette.primary.main,
					border: `${palette.primary.main} 1px solid`,
					'&:hover': {
						border: `${palette.primary.main} 1px solid`,
						backgroundColor: palette.primary.main,
						color: palette.primary.light,
					},
				}}
			>
				Start Workout
			</Button>
		</Styled.Content>
	);
};

export default PickWorkout;
