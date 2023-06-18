import { isContentModelEditor } from 'lwyj123-roosterjs-content-model';
import { RibbonButton } from 'roosterjs-react';
import { setImageBorder } from 'lwyj123-roosterjs-content-model';

/**
 * @internal
 * "Remove Image Border" button on the format ribbon
 */
export const imageBorderRemoveButton: RibbonButton<'buttonNameImageBorderRemove'> = {
    key: 'buttonNameImageBorderRemove',
    unlocalizedText: 'Remove Image Border',
    iconName: 'Cancel',
    isDisabled: formatState => !formatState.canAddImageAltText,
    onClick: editor => {
        if (isContentModelEditor(editor)) {
            setImageBorder(editor, null);
        }
    },
};
