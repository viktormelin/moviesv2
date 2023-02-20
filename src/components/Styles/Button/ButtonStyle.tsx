import { menuAtom } from '@/store/atoms';
import { createStyles, Button } from '@mantine/core';
import { useAtomValue } from 'jotai';

const buttonStyle = createStyles((theme) => ({
	root: {
		padding: '0 0.5rem',
		'&:disabled': {
			backgroundColor: 'unset',
			color: theme.colors.dark[3],
		},
	},
	inner: {
		display: 'flex',
		justifyContent: 'flex-start',
	},
	label: {
		display: 'flex',
		gap: '0.5rem',
		fontSize: '1rem',
	},
	active: {
		padding: '0 0.5rem',
		backgroundColor: 'rgba(0, 82, 129, 0.25)',
	},
}));

const ButtonStyled: React.FC<{
	name: string;
	disabled?: boolean;
	onClick: (name: string) => void;
	children: React.ReactNode;
}> = ({ name, disabled, onClick, children }) => {
	const { classes } = buttonStyle();
	const currentMenu = useAtomValue(menuAtom);

	return (
		<Button
			disabled={disabled ?? false}
			onClick={() => onClick(name)}
			size='lg'
			classNames={{
				root: currentMenu === name ? classes.active : classes.root,
				inner: classes.inner,
				label: classes.label,
			}}
			variant='subtle'
		>
			{children}
		</Button>
	);
};

export default ButtonStyled;
