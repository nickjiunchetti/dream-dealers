import type { Meta, StoryObj } from '@storybook/react';
import { UiComponents } from './ui-components';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof UiComponents> = {
  component: UiComponents,
  title: 'UiComponents',
};
export default meta;
type Story = StoryObj<typeof UiComponents>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to UiComponents!/gi)).toBeTruthy();
  },
};
