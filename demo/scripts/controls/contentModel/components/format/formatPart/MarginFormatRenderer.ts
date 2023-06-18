import { createTextFormatRendererGroup } from '../utils/createTextFormatRenderer';
import { FormatRenderer } from '../utils/FormatRenderer';
import { MarginFormat } from 'lwyj123-roosterjs-content-model';

type MarginName = keyof MarginFormat;
const MarginNames: MarginName[] = ['marginTop', 'marginRight', 'marginBottom', 'marginLeft'];

export const MarginFormatRenderer: FormatRenderer<MarginFormat> = createTextFormatRendererGroup<
    MarginFormat,
    MarginName
>(
    MarginNames,
    format => MarginNames.map(name => format[name]),
    (format, name, value) => {
        format[name] = value;
    }
);
