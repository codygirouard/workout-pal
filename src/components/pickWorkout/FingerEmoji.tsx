import React from 'react';
import { WorkoutType } from '../../types';

const FingerEmoji: React.FC<{ workoutType: WorkoutType; position: string }> = ({
	workoutType,
	position,
}) => {
	if (
		(workoutType === 'a' && position === 'left') ||
		(workoutType === 'b' && position === 'right')
	) {
		return <span>&#x1F447;</span>;
	} else {
		return null;
	}
};

export default FingerEmoji;
