import { createTextFormatRenderer } from '../utils/createTextFormatRenderer';
import { DisplayFormat } from 'lwyj123-roosterjs-content-model';
import { FormatRenderer } from '../utils/FormatRenderer';

export const DisplayFormatRenderer: FormatRenderer<DisplayFormat> = createTextFormatRenderer<
    DisplayFormat
>(
    'Display',
    format => format.display,
    (format, value) => (format.display = value)
);
