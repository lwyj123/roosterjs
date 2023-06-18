import { createTextFormatRenderer } from '../utils/createTextFormatRenderer';
import { WordBreakFormat } from 'lwyj123-roosterjs-content-model';

export const WordBreakFormatRenderer = createTextFormatRenderer<WordBreakFormat>(
    'Word break',
    format => format.wordBreak,
    (format, value) => (format.wordBreak = value)
);
