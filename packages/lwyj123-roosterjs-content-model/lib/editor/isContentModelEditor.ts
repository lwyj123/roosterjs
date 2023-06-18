import { IContentModelEditor } from '../publicTypes/IContentModelEditor';
import { IEditor } from 'lwyj123-roosterjs-editor-types';

export default function isContentModelEditor(editor: IEditor): editor is IContentModelEditor {
    const contentModelEditor = editor as IContentModelEditor;

    return !!contentModelEditor.createContentModel;
}
