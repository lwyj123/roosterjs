import NodeInlineElement from './NodeInlineElement';
import { BlockElement } from 'lwyj123-roosterjs-editor-types';

/**
 * This is an inline element representing an Html image
 */
export default class ImageInlineElement extends NodeInlineElement {
    constructor(containerNode: Node, parentBlock: BlockElement) {
        super(containerNode, parentBlock);
    }
}
