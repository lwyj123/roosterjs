import { isContentModelEditor } from 'lwyj123-roosterjs-content-model';
import { RibbonButton, StrikethroughButtonStringKey } from 'roosterjs-react';
import { toggleStrikethrough } from 'lwyj123-roosterjs-content-model';

/**
 * @internal
 * "Strikethrough" button on the format ribbon
 */
export const strikethroughButton: RibbonButton<StrikethroughButtonStringKey> = {
    key: 'buttonNameStrikethrough',
    unlocalizedText: 'Strikethrough',
    iconName: 'Strikethrough',
    isChecked: formatState => formatState.isStrikeThrough,
    onClick: editor => {
        if (isContentModelEditor(editor)) {
            toggleStrikethrough(editor);
        }
        return true;
    },
};
