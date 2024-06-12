import React, { Dispatch, SetStateAction } from 'react';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

type Props = {
	maxSteps: number;
	activeStep: number;
	setActiveStep: Dispatch<SetStateAction<number>>;
	finishWorkout: () => void;
};

const Stepper: React.FC<Props> = ({
	maxSteps,
	activeStep,
	setActiveStep,
	finishWorkout,
}) => {
	const handleNext = () => {
		setActiveStep((prevActiveStep) => {
			const step = prevActiveStep + 1;
			if (step === maxSteps) {
				finishWorkout();
				return prevActiveStep;
			}
			return step;
		});
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	return (
		<MobileStepper
			variant="progress"
			steps={maxSteps}
			position="bottom"
			activeStep={activeStep}
			nextButton={
				<Button
					size="small"
					onClick={handleNext}
					disabled={activeStep === maxSteps}
				>
					{activeStep < maxSteps - 1 ? 'Next' : 'Finish'}
					<KeyboardArrowRight />
				</Button>
			}
			backButton={
				<Button size="small" onClick={handleBack} disabled={activeStep === 0}>
					<KeyboardArrowLeft />
					Back
				</Button>
			}
		/>
	);
};

export default Stepper;
