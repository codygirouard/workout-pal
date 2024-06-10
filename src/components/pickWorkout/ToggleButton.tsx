import React from 'react';
import { default as MUIToggleButton } from '@mui/material/ToggleButton';
import { WorkoutType } from '../../types';
import { useTheme } from '@mui/material';

const ToggleButton: React.FC<{ workoutType: WorkoutType }> = ({
	workoutType,
}) => {
	const { palette } = useTheme();

	return (
		<MUIToggleButton
			value={workoutType}
			sx={{
				border: `${palette.primary.main} 1px solid`,
				fontSize: 200,
				'&.Mui-selected, &.Mui-selected:hover': {
					backgroundColor: palette.primary.main,
					color: palette.primary.light,
				},
			}}
		>
			{workoutType}
		</MUIToggleButton>
	);
};

export default ToggleButton;
