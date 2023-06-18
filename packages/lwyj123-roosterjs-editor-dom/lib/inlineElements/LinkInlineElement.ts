import NodeInlineElement from './NodeInlineElement';
import { BlockElement } from 'lwyj123-roosterjs-editor-types';

/**
 * This is inline element presenting an html hyperlink
 */
export default class LinkInlineElement extends NodeInlineElement {
    constructor(containerNode: Node, parentBlock: BlockElement) {
        super(containerNode, parentBlock);
    }
}
