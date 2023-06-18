import { createCheckboxFormatRenderer } from '../utils/createCheckboxFormatRenderer';
import { SpacingFormat } from 'lwyj123-roosterjs-content-model';

export const SpacingFormatRenderer = createCheckboxFormatRenderer<SpacingFormat>(
    'BorderCollapsed',
    format => format.borderCollapse,
    (format, value) => (format.borderCollapse = value)
);
