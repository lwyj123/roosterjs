import { changeFontSize } from 'lwyj123-roosterjs-content-model';
import { IncreaseFontSizeButtonStringKey, RibbonButton } from 'roosterjs-react';
import { isContentModelEditor } from 'lwyj123-roosterjs-content-model';

/**
 * @internal
 * "Increase font size" button on the format ribbon
 */
export const increaseFontSizeButton: RibbonButton<IncreaseFontSizeButtonStringKey> = {
    key: 'buttonNameIncreaseFontSize',
    unlocalizedText: 'Increase font size',
    iconName: 'FontIncrease',
    onClick: editor => {
        if (isContentModelEditor(editor)) {
            changeFontSize(editor, 'increase');
        }
    },
};
