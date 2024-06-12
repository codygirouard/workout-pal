import { styled } from '@mui/system';

export const Gif = styled('img')(({ theme }) => ({
	width: 400,
	maxWidth: '100%',
	maxHeight: '300px',
	aspectRatio: '1 / 1',
	[theme.breakpoints.up('md')]: {
		maxHeight: '100%',
	},
}));

export const Form = styled('form')(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	gap: 12,
	marginTop: 12,
	[theme.breakpoints.up('md')]: {
		flexDirection: 'row',
		justifyContent: 'center',
	},
}));

export const Content = styled('div')({
	alignSelf: 'center',
});
