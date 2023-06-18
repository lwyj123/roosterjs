import { AlignLeftButtonStringKey, RibbonButton } from 'roosterjs-react';
import { isContentModelEditor } from 'lwyj123-roosterjs-content-model';
import { setAlignment } from 'lwyj123-roosterjs-content-model';

/**
 * @internal
 * "Align left" button on the format ribbon
 */
export const alignLeftButton: RibbonButton<AlignLeftButtonStringKey> = {
    key: 'buttonNameAlignLeft',
    unlocalizedText: 'Align left',
    iconName: 'AlignLeft',
    onClick: editor => {
        if (isContentModelEditor(editor)) {
            setAlignment(editor, 'left');
        }
        return true;
    },
};
