import { isContentModelEditor } from 'lwyj123-roosterjs-content-model';
import { RibbonButton, RtlButtonStringKey } from 'roosterjs-react';
import { setDirection } from 'lwyj123-roosterjs-content-model';

/**
 * @internal
 * "Right to left" button on the format ribbon
 */
export const rtlButton: RibbonButton<RtlButtonStringKey> = {
    key: 'buttonNameRtl',
    unlocalizedText: 'Right to left',
    iconName: 'BidiRtl',
    onClick: editor => {
        if (isContentModelEditor(editor)) {
            setDirection(editor, 'rtl');
        }
        return true;
    },
};
