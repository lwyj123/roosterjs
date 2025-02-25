import ContentModelBeforePasteEvent from '../../publicTypes/event/ContentModelBeforePasteEvent';
import domToContentModel from '../../domToModel/domToContentModel';
import { BeforePasteEvent, NodePosition } from 'roosterjs-editor-types';
import { formatWithContentModel } from './formatWithContentModel';
import { getOnDeleteEntityCallback } from '../../editor/utils/handleKeyboardEventCommon';
import { IContentModelEditor } from '../../publicTypes/IContentModelEditor';
import { mergeModel } from '../../modelApi/common/mergeModel';
import {
    createDefaultHtmlSanitizerOptions,
    getPasteType,
    handleImagePaste,
    handleTextPaste,
    moveChildNodes,
    Position,
    retrieveMetadataFromClipboard,
    sanitizePasteContent,
} from 'roosterjs-editor-dom';
import {
    ChangeSource,
    ClipboardData,
    GetContentMode,
    PasteType,
    PluginEventType,
} from 'roosterjs-editor-types';

/**
 * Paste into editor using a clipboardData object
 * @param clipboardData Clipboard data retrieved from clipboard
 * @param pasteAsText Force pasting as plain text. Default value is false
 * @param applyCurrentStyle True if apply format of current selection to the pasted content,
 * false to keep original format.  Default value is false. When pasteAsText is true, this parameter is ignored
 */
export default function paste(
    editor: IContentModelEditor,
    clipboardData: ClipboardData,
    pasteAsText: boolean = false,
    applyCurrentFormat: boolean = false,
    pasteAsImage: boolean = false
) {
    if (clipboardData.snapshotBeforePaste) {
        // Restore original content before paste a new one
        editor.setContent(clipboardData.snapshotBeforePaste);
    } else {
        clipboardData.snapshotBeforePaste = editor.getContent(GetContentMode.RawHTMLWithSelection);
    }

    const range = editor.getSelectionRange();
    const position = range && Position.getStart(range);
    const event = createBeforePasteEvent(
        editor,
        clipboardData,
        getPasteType(pasteAsText, applyCurrentFormat, pasteAsImage)
    );

    const fragment = createFragmentFromClipboardData(
        editor,
        clipboardData,
        position,
        pasteAsText,
        pasteAsImage,
        event
    );

    const pasteModel = domToContentModel(
        fragment,
        {
            isDarkMode: editor.isDarkMode(),
            darkColorHandler: editor.getDarkColorHandler(),
            defaultFormat: editor.getDefaultFormat(),
        },
        {
            ...event.domToModelOption,
            disableCacheElement: true,
        }
    );

    if (pasteModel) {
        formatWithContentModel(
            editor,
            'Paste',
            model => {
                mergeModel(model, pasteModel, getOnDeleteEntityCallback(editor), {
                    mergeCurrentFormat: applyCurrentFormat,
                });
                return true;
            },
            {
                changeSource: ChangeSource.Paste,
                getChangeData: () => clipboardData,
            }
        );
    }
}

function createBeforePasteEvent(
    editor: IContentModelEditor,
    clipboardData: ClipboardData,
    pasteType: PasteType
): ContentModelBeforePasteEvent {
    const options = createDefaultHtmlSanitizerOptions();

    // Remove "caret-color" style generated by Safari to make sure caret shows in right color after paste
    options.cssStyleCallbacks['caret-color'] = () => false;

    return {
        eventType: PluginEventType.BeforePaste,
        clipboardData,
        fragment: editor.getDocument().createDocumentFragment(),
        sanitizingOption: options,
        htmlBefore: '',
        htmlAfter: '',
        htmlAttributes: {},
        domToModelOption: {},
        pasteType: pasteType,
    };
}

function createFragmentFromClipboardData(
    editor: IContentModelEditor,
    clipboardData: ClipboardData,
    position: NodePosition | null,
    pasteAsText: boolean,
    pasteAsImage: boolean,
    event: BeforePasteEvent
) {
    const { fragment } = event;
    const { rawHtml, text, imageDataUri } = clipboardData;
    const trustedHTMLHandler = editor.getTrustedHTMLHandler();

    let doc: Document | undefined = rawHtml
        ? new DOMParser().parseFromString(trustedHTMLHandler(rawHtml), 'text/html')
        : undefined;

    // Step 2: Retrieve Metadata from Html and the Html that was copied.
    retrieveMetadataFromClipboard(doc, event, editor.getTrustedHTMLHandler());

    // Step 3: Fill the BeforePasteEvent object, especially the fragment for paste
    if ((pasteAsImage && imageDataUri) || (!pasteAsText && !text && imageDataUri)) {
        // Paste image
        handleImagePaste(imageDataUri, fragment);
    } else if (!pasteAsText && rawHtml && doc ? doc.body : false) {
        moveChildNodes(fragment, doc?.body);
    } else if (text) {
        // Paste text
        handleTextPaste(text, position, fragment);
    }

    // Step 4: Trigger BeforePasteEvent so that plugins can do proper change before paste
    editor.triggerPluginEvent(PluginEventType.BeforePaste, event, true /* broadcast */);

    // Step 5. Sanitize the fragment before paste to make sure the content is safe
    sanitizePasteContent(event, position);

    return fragment;
}
