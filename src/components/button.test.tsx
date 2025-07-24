import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { Button } from './button.tsx';

describe('<Button />', () => {
    test('renders the button text', () => {
        render(<Button>Hello World</Button>);

        expect(screen.getByText('Hello World')).toBeInTheDocument();
    });
});
