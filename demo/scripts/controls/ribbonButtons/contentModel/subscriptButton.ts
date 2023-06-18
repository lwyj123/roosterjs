import { isContentModelEditor } from 'lwyj123-roosterjs-content-model';
import { RibbonButton, SubscriptButtonStringKey } from 'roosterjs-react';
import { toggleSubscript } from 'lwyj123-roosterjs-content-model';

/**
 * @internal
 * "Subscript" button on the format ribbon
 */
export const subscriptButton: RibbonButton<SubscriptButtonStringKey> = {
    key: 'buttonNameSubscript',
    unlocalizedText: 'Subscript',
    iconName: 'Subscript',
    isChecked: formatState => formatState.isSubscript,
    onClick: editor => {
        if (isContentModelEditor(editor)) {
            toggleSubscript(editor);
        }
        return true;
    },
};
