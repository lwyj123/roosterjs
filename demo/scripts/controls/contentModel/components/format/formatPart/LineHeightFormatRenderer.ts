import { createTextFormatRenderer } from '../utils/createTextFormatRenderer';
import { FormatRenderer } from '../utils/FormatRenderer';
import { LineHeightFormat } from 'lwyj123-roosterjs-content-model';

export const LineHeightFormatRenderer: FormatRenderer<LineHeightFormat> = createTextFormatRenderer<
    LineHeightFormat
>(
    'LineHeight',
    format => format.lineHeight,
    (format, value) => (format.lineHeight = value)
);
