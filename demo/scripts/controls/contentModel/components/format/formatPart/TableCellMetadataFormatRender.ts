import { createCheckboxFormatRenderer } from '../utils/createCheckboxFormatRenderer';
import { TableCellMetadataFormat } from 'lwyj123-roosterjs-editor-types';

export const TableCellMetadataFormatRender = createCheckboxFormatRenderer<TableCellMetadataFormat>(
    'BgColorOverride',
    format => format.bgColorOverride,
    (format, value) => (format.bgColorOverride = value)
);
