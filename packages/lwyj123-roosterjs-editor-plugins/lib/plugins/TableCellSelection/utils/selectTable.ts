import normalizeTableSelection from './normalizeTableSelection';
import { IEditor } from 'lwyj123-roosterjs-editor-types';
import { TableCellSelectionState } from '../TableCellSelectionState';

/**
 * @internal
 */
export function selectTable(editor: IEditor, state: TableCellSelectionState) {
    if (editor && state.vTable) {
        editor?.select(state.vTable.table, normalizeTableSelection(state.vTable));
    }
}
