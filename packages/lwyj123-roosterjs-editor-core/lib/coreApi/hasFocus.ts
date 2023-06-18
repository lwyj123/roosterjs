import { contains } from 'lwyj123-roosterjs-editor-dom';
import { EditorCore, HasFocus } from 'lwyj123-roosterjs-editor-types';

/**
 * @internal
 * Check if the editor has focus now
 * @param core The EditorCore object
 * @returns True if the editor has focus, otherwise false
 */
export const hasFocus: HasFocus = (core: EditorCore) => {
    let activeElement = core.host.activeElement;
    return !!(
        activeElement && contains(core.contentDiv, activeElement, true /*treatSameNodeAsContain*/)
    );
};
