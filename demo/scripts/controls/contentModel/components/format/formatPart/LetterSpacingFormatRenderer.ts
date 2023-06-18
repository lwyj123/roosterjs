import { createTextFormatRenderer } from '../utils/createTextFormatRenderer';
import { FormatRenderer } from '../utils/FormatRenderer';
import { LetterSpacingFormat } from 'lwyj123-roosterjs-content-model';

export const LetterSpacingFormatRenderer: FormatRenderer<LetterSpacingFormat> = createTextFormatRenderer<
    LetterSpacingFormat
>(
    'Letter spacing',
    format => format.letterSpacing,
    (format, value) => {
        format.letterSpacing = value;
    }
);
