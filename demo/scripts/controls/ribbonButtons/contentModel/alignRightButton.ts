import { AlignRightButtonStringKey, RibbonButton } from 'roosterjs-react';
import { isContentModelEditor } from 'lwyj123-roosterjs-content-model';
import { setAlignment } from 'lwyj123-roosterjs-content-model';

/**
 * @internal
 * "Align right" button on the format ribbon
 */
export const alignRightButton: RibbonButton<AlignRightButtonStringKey> = {
    key: 'buttonNameAlignRight',
    unlocalizedText: 'Align right',
    iconName: 'AlignRight',
    onClick: editor => {
        if (isContentModelEditor(editor)) {
            setAlignment(editor, 'right');
        }
        return true;
    },
};
