import { isContentModelEditor } from 'lwyj123-roosterjs-content-model';
import { LtrButtonStringKey, RibbonButton } from 'roosterjs-react';
import { setDirection } from 'lwyj123-roosterjs-content-model';

/**
 * @internal
 * "Left to right" button on the format ribbon
 */
export const ltrButton: RibbonButton<LtrButtonStringKey> = {
    key: 'buttonNameLtr',
    unlocalizedText: 'Left to right',
    iconName: 'BidiLtr',
    onClick: editor => {
        if (isContentModelEditor(editor)) {
            setDirection(editor, 'ltr');
        }

        return true;
    },
};
