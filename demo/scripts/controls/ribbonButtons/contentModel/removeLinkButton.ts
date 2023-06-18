import { isContentModelEditor } from 'lwyj123-roosterjs-content-model';
import { removeLink } from 'lwyj123-roosterjs-content-model';
import { RemoveLinkButtonStringKey, RibbonButton } from 'roosterjs-react';

/**
 * @internal
 * "Remove link" button on the format ribbon
 */
export const removeLinkButton: RibbonButton<RemoveLinkButtonStringKey> = {
    key: 'buttonNameRemoveLink',
    unlocalizedText: 'Remove link',
    iconName: 'RemoveLink',
    isDisabled: formatState => !formatState.canUnlink,
    onClick: editor => {
        if (isContentModelEditor(editor)) {
            removeLink(editor);
        }
    },
};
