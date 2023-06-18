import { chainSanitizerCallback } from 'lwyj123-roosterjs-editor-dom';
import { DeprecatedColorList } from './deprecatedColorList';
import { HtmlSanitizerOptions } from 'lwyj123-roosterjs-editor-types';

/**
 * @internal
 * Remove the deprecated colors from pasted content
 * @param sanitizingOption the sanitizingOption of BeforePasteEvent
 * */
export default function sanitizeHtmlColorsFromPastedContent(
    sanitizingOption: Required<HtmlSanitizerOptions>
) {
    ['color', 'background-color'].forEach(property => {
        chainSanitizerCallback(
            sanitizingOption.cssStyleCallbacks,
            property,
            (value: string) => DeprecatedColorList.indexOf(value) < 0
        );
    });
}
