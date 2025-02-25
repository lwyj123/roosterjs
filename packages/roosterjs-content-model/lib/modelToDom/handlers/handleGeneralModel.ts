import { applyFormat } from '../utils/applyFormat';
import { ContentModelBlockHandler } from '../../publicTypes/context/ContentModelHandler';
import { ContentModelGeneralBlock } from '../../publicTypes/group/ContentModelGeneralBlock';
import { isGeneralSegment } from '../../modelApi/common/isGeneralSegment';
import { isNodeOfType } from '../../domUtils/isNodeOfType';
import { ModelToDomContext } from '../../publicTypes/context/ModelToDomContext';
import { NodeType } from 'roosterjs-editor-types';
import { reuseCachedElement } from '../utils/reuseCachedElement';
import { wrap } from 'roosterjs-editor-dom';

/**
 * @internal
 */
export const handleGeneralModel: ContentModelBlockHandler<ContentModelGeneralBlock> = (
    doc: Document,
    parent: Node,
    group: ContentModelGeneralBlock,
    context: ModelToDomContext,
    refNode: Node | null
) => {
    let element: Node = group.element;

    if (refNode && element.parentNode == parent) {
        refNode = reuseCachedElement(parent, element, refNode);
    } else {
        element = element.cloneNode();
        group.element = element as HTMLElement;

        parent.insertBefore(element, refNode);
    }

    if (isGeneralSegment(group) && isNodeOfType(element, NodeType.Element)) {
        if (!group.element.firstChild) {
            context.regularSelection.current.segment = element;
        }

        const span = wrap(element, 'span');

        applyFormat(span, context.formatAppliers.segment, group.format, context);

        context.modelHandlers.segmentDecorator(doc, span, group, context);
    }

    context.modelHandlers.blockGroupChildren(doc, element, group, context);

    context.onNodeCreated?.(group, element);

    return refNode;
};
