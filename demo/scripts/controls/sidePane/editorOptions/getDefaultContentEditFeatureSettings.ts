import { ContentEditFeatureSettings } from 'lwyj123-roosterjs-editor-types';
import { getAllFeatures } from 'lwyj123-roosterjs-editor-plugins/lib/ContentEdit';
import { getObjectKeys } from 'lwyj123-roosterjs-editor-dom';

export default function getDefaultContentEditFeatureSettings(): ContentEditFeatureSettings {
    const allFeatures = getAllFeatures();
    return {
        ...getObjectKeys(allFeatures).reduce((settings, key) => {
            settings[key] = !allFeatures[key].defaultDisabled;
            return settings;
        }, <ContentEditFeatureSettings>{}),
        indentWhenAltShiftRight: true,
        outdentWhenAltShiftLeft: true,
    };
}
