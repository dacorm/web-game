import { render, screen } from '@testing-library/react';
import Button from './Button';
import { ButtonSize, ButtonTheme } from '../shared/shared.button.types';

describe('button', () => {
    test('first', () => {
        render(<Button size={ButtonSize.M} theme={ButtonTheme.GREEN}>TEST</Button>);
        expect(screen.getByText('TEST')).toBeInTheDocument();
    });

    test('with theme', () => {
        render(<Button size={ButtonSize.X} theme={ButtonTheme.GREEN}>TEST</Button>);
        expect(screen.getByText('TEST')).toHaveClass('button green x');
        screen.debug();
    });
});
