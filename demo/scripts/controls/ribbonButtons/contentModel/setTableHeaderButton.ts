import { formatTable } from 'lwyj123-roosterjs-content-model';
import { getFormatState } from 'lwyj123-roosterjs-editor-api';
import { isContentModelEditor } from 'lwyj123-roosterjs-content-model';
import { RibbonButton } from 'roosterjs-react';

export const setTableHeaderButton: RibbonButton<'ribbonButtonSetTableHeader'> = {
    key: 'ribbonButtonSetTableHeader',
    unlocalizedText: 'Toggle table header',
    iconName: 'Header',
    isDisabled: formatState => !formatState.isInTable,
    onClick: editor => {
        if (isContentModelEditor(editor)) {
            const format = getFormatState(editor);
            formatTable(editor, { hasHeaderRow: !format.tableHasHeader }, true /*keepCellShade*/);
        }
    },
};
