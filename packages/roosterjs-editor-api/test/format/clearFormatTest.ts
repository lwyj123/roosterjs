import * as clearFormatLib from '../../lib/format/clearFormat';
import * as TestHelper from '../TestHelper';
import clearFormat from '../../lib/format/clearFormat';
import { ClearFormatMode, IEditor } from 'roosterjs-editor-types';

describe('clearFormat()', () => {
    let testID = 'clearFormat';
    let originalContent =
        '<div id="text" style="font-size: 12pt; font-family: Calibri, Arial, Helvetica, sans-serif; color: rgb(0, 0, 0);">text</div>';
    let editor: IEditor;

    beforeEach(() => {
        editor = TestHelper.initEditor(testID);
    });

    afterEach(() => {
        editor.dispose();
        TestHelper.removeElement(testID);
    });

    it('triggers the removeformat command in document', () => {
        let document = editor.getDocument();
        spyOn(editor, 'addUndoSnapshot').and.callThrough();
        spyOn(document, 'execCommand').and.callThrough();

        clearFormat(editor);

        expect(editor.addUndoSnapshot).toHaveBeenCalled();
        expect(document.execCommand).toHaveBeenCalledWith('removeFormat', false, null);
    });

    it('removes the existing formats', () => {
        // Arrange
        editor.setContent(originalContent);
        TestHelper.selectNode(document.getElementById('text'));

        // Act
        clearFormat(editor);

        // Assert
        expect(editor.getContent()).toBe(
            '<div id="text" style=""><span style="font-family: arial; font-size: 12pt; color: black;">text</span></div>'
        );
    });

    it('calls clearBlockFormat when passing Block as the formatting strategy', () => {
        const spy: jasmine.Spy = spyOn(clearFormatLib, 'default');
        editor.setContent(originalContent);

        clearFormat(editor, ClearFormatMode.Block);
        expect(spy).toHaveBeenCalledTimes(1);
    });
});

describe('clearAutodetectFormat tests', () => {
    const ALL_CONTENT_TEST =
        '<div id="start"><p style="margin:0in 0in 8pt;line-height:107%;font-size:11pt;font-family:Calibri, sans-serif"><o:p></o:p></p></div><div><span style="font-size: 13.5pt; font-family: Arial, sans-serif;">Text in Arial font-family</span><span style="font-family: Calibri, sans-serif; font-size: 13.5pt;"><o:p>&nbsp;</o:p></span><br></div><p style="margin:0in 0in 8pt;line-height:107%;font-size:11pt;font-family:Calibri, sans-serif"><span style="font-size:13.5pt;color:black">Text in paragraph<o:p>&nbsp;</o:p></span></p><h1 style="margin-right:0in;margin-left:0in;font-size:24pt;font-family:&quot;Times New Roman&quot;, serif"><span style="font-family:&quot;Arial&quot;,sans-serif;color:black">Header middle text 1<span style="mso-tab-count:1">&nbsp;&nbsp; </span></span><span style="color:black"><o:p>&nbsp;</o:p></span></h1><ul type="disc" style="margin-bottom:0in"> <li style="margin:0in 0in 8pt;font-size:11pt;font-family:Calibri, sans-serif;color:black;mso-margin-top-alt:auto;mso-margin-bottom-alt:auto;mso-list:l0 level1 lfo1;tab-stops:list .5in"><span style="font-size:13.5pt;font-family:&quot;Arial&quot;,sans-serif">item 1</span><span style="font-size:13.5pt"><o:p>&nbsp;</o:p></span></li> <li style="margin:0in 0in 8pt;font-size:11pt;font-family:Calibri, sans-serif;color:black;mso-margin-top-alt:auto;mso-margin-bottom-alt:auto;mso-list:l0 level1 lfo1;tab-stops:list .5in"><span style="font-size:13.5pt;font-family:&quot;Arial&quot;,sans-serif">Item 2</span><span style="font-size:13.5pt"><o:p>&nbsp;</o:p></span></li> <li style="margin:0in 0in 8pt;font-size:11pt;font-family:Calibri, sans-serif;color:black;mso-margin-top-alt:auto;mso-margin-bottom-alt:auto;mso-list:l0 level1 lfo1;tab-stops:list .5in"><span style="font-size:13.5pt;font-family:&quot;Arial&quot;,sans-serif">Sdasd</span><span style="font-size:13.5pt"><o:p>&nbsp;</o:p></span></li> <li style="margin:0in 0in 8pt;font-size:11pt;font-family:Calibri, sans-serif;color:black;mso-margin-top-alt:auto;mso-margin-bottom-alt:auto;mso-list:l0 level1 lfo1;tab-stops:list .5in"><span style="font-size:13.5pt;font-family:&quot;Arial&quot;,sans-serif">asdasd</span><span style="font-size:13.5pt"><o:p>&nbsp;</o:p></span></li></ul><p style="margin:0in 0in 8pt;line-height:107%;font-size:11pt;font-family:Calibri, sans-serif">kjjkjk<o:p>&nbsp;</o:p></p><div id="end"><br></div>';

    const TABLE_TEST =
        '<table id="testTable" style="border-collapse:collapse;border:none;mso-border-alt:solid windowtext .5pt;mso-yfti-tbllook:1184;mso-padding-alt:0in 5.4pt 0in 5.4pt"> <tbody><tr style="mso-yfti-irow:0;mso-yfti-firstrow:yes"> <td width="128" valign="top" style="width:95.75pt;border:solid windowtext 1.0pt;mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt"> <p style="margin:0in 0in 8pt;font-size:11pt;font-family:Calibri, sans-serif;margin-bottom:0in"><b>asdasdf<o:p>&nbsp;</o:p></b></p> </td> <td width="128" valign="top" style="width:95.75pt;border:solid windowtext 1.0pt;border-left:none;mso-border-left-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt"> <p style="margin:0in 0in 8pt;font-size:11pt;font-family:Calibri, sans-serif;margin-bottom:0in"><i>adfasdf<o:p>&nbsp;</o:p></i></p> </td> <td width="128" valign="top" style="width:95.75pt;border:solid windowtext 1.0pt;border-left:none;mso-border-left-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt"> <p style="margin:0in 0in 8pt;font-size:11pt;font-family:Calibri, sans-serif;margin-bottom:0in"><span style="color:red">asdfadf<o:p>&nbsp;</o:p></span></p> </td> <td width="128" valign="top" style="width:95.75pt;border:solid windowtext 1.0pt;border-left:none;mso-border-left-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt"> <p style="margin:0in 0in 8pt;font-size:11pt;font-family:Calibri, sans-serif;margin-bottom:0in"><o:p>&nbsp;</o:p></p> </td> <td width="128" valign="top" style="width:95.8pt;border:solid windowtext 1.0pt;border-left:none;mso-border-left-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt"> <p style="margin:0in 0in 8pt;font-size:11pt;font-family:Calibri, sans-serif;margin-bottom:0in"><o:p>&nbsp;</o:p></p> </td> </tr> <tr style="mso-yfti-irow:1;mso-yfti-lastrow:yes"> <td width="128" valign="top" style="width:95.75pt;border:solid windowtext 1.0pt;border-top:none;mso-border-top-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt"> <p style="margin:0in 0in 8pt;font-size:11pt;font-family:Calibri, sans-serif;margin-bottom:0in"><o:p>&nbsp;</o:p></p> </td> <td width="128" valign="top" style="width:95.75pt;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt"> <p style="margin:0in 0in 8pt;font-size:11pt;font-family:Calibri, sans-serif;margin-bottom:0in"><o:p>&nbsp;</o:p></p> </td> <td width="128" valign="top" style="width:95.75pt;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt"> <p style="margin:0in 0in 8pt;font-size:11pt;font-family:Calibri, sans-serif;margin-bottom:0in"><o:p>&nbsp;</o:p></p> </td> <td width="128" valign="top" style="width:95.75pt;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt"> <p style="margin:0in 0in 8pt;font-size:11pt;font-family:Calibri, sans-serif;margin-bottom:0in"><o:p>&nbsp;</o:p></p> </td> <td width="128" valign="top" style="width:95.8pt;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt"> <p style="margin:0in 0in 8pt;font-size:11pt;font-family:Calibri, sans-serif;margin-bottom:0in"><o:p>&nbsp;</o:p></p> </td> </tr></tbody></table><br>';

    const TEST_ID = 'clearAutodetectFormatTest';
    let editor: IEditor;
    let doc: Document;
    beforeEach(() => {
        editor = TestHelper.initEditor(TEST_ID);
        doc = editor.getDocument();
        doc.getSelection().removeAllRanges();
    });

    it('removes all text and structure format when selecting all the document', () => {
        const expectedFormat =
            '<div></div><div>Text in Arial font-family<o:p>&nbsp;</o:p><br></div><div>Text in paragraph<o:p>&nbsp;</o:p></div><div>Header middle text 1&nbsp;&nbsp; <o:p>&nbsp;</o:p></div><div>item 1<o:p>&nbsp;</o:p></div><div>Item 2<o:p>&nbsp;</o:p></div><div>Sdasd<o:p>&nbsp;</o:p></div><div>asdasd<o:p>&nbsp;</o:p></div><div>kjjkjk<o:p>&nbsp;</o:p></div><div><br></div>';
        editor.setContent(ALL_CONTENT_TEST);

        let start = doc.getElementById('start');
        let end = doc.getElementById('end');
        let range = new Range();
        range.setStart(start, 0);
        range.setEnd(end, 0);
        doc.getSelection().addRange(range);

        clearFormat(editor, ClearFormatMode.AutoDetect);
        expect(editor.getContent()).toBe(expectedFormat);
    });

    it('removes format of partial inline element', () => {
        const originalText =
            '<h1 id="testHeader" style="margin-right:0in;margin-left:0in;font-size:24pt;font-family:&quot;Times New Roman&quot;, serif"><span style="font-size: 24pt; font-family: Arial, sans-serif;">Header middle text 1</span></h1>';
        const expectedFormat =
            '<span style="font-size: 24pt; font-family: Arial, sans-serif;">Header </span><span style="font-family: arial; font-size: 12pt; color: black;">middle</span><span style="font-size: 24pt; font-family: Arial, sans-serif;"> text 1</span>';
        editor.setContent(originalText);

        let header = doc.getElementById('testHeader');
        const headerText = header.firstChild?.firstChild;
        let range = new Range();
        range.setStart(headerText, 7);
        range.setEnd(headerText, 13);
        doc.getSelection().addRange(range);

        clearFormat(editor, ClearFormatMode.AutoDetect);

        header = doc.getElementById('testHeader');
        expect(header.innerHTML).toBe(expectedFormat);
    });

    it('removes all the block format and structure if all block children are selected', () => {
        const originalText =
            '<h1 id="testHeader" style="margin-right:0in;margin-left:0in;font-size:24pt;font-family:&quot;Times New Roman&quot;, serif"><span style="font-size: 24pt; font-family: Arial, sans-serif;">Header middle text 1</span></h1>';
        const expectedFormat = '<div>Header middle text 1</div>';
        editor.setContent(originalText);

        const header = doc.getElementById('testHeader');
        let range = new Range();
        range.setStart(header, 0);
        range.setEnd(header, 1);
        doc.getSelection().addRange(range);

        clearFormat(editor, ClearFormatMode.AutoDetect);

        expect(editor.getContent()).toBe(expectedFormat);
    });

    it('removes structure and text format when selecting multiple blocks', () => {
        const originalContent =
            '<p style="margin:0in 0in 8pt;line-height:107%;font-size:11pt;font-family:Calibri, sans-serif"><span style="font-size:13.5pt;font-family:&quot;Arial&quot;,sans-serif;color:black"></span></p><div><p style="background-color:rgb(255, 255, 255);margin:0in 0in 8pt;line-height:15.6933px;font-size:11pt;font-family:Calibri, sans-serif"><span style="font-size:13.5pt;font-family:Arial, sans-serif;color:black"></span></p><p style="background-color:rgb(255, 255, 255);margin:0in 0in 8pt;font-size:11pt;font-family:Calibri, sans-serif" id="testP"><span style="font-size:13.5pt;color:black">Text in paragraph<o:p>&nbsp;</o:p></span></p><h1 style="background-color:rgb(255, 255, 255);margin-right:0in;margin-left:0in;font-size:24pt;font-family:&quot;Times New Roman&quot;, serif" id="testHeader"><span style="font-family:Arial, sans-serif;color:black">Header middle text 1<span>&nbsp;</span></span></h1><p style="background-color:rgb(255, 255, 255);margin:0in 0in 8pt;line-height:15.6933px;font-size:11pt;font-family:Calibri, sans-serif"><o:p></o:p></p></div>';
        const expectedFormat =
            '<p style="margin:0in 0in 8pt;line-height:107%;font-size:11pt;font-family:Calibri, sans-serif"><span style="font-size:13.5pt;font-family:&quot;Arial&quot;,sans-serif;color:black"></span></p><div><p style="background-color:rgb(255, 255, 255);margin:0in 0in 8pt;line-height:15.6933px;font-size:11pt;font-family:Calibri, sans-serif"><span style="font-size:13.5pt;font-family:Arial, sans-serif;color:black"></span></p></div><div>Text in paragraph<o:p>&nbsp;</o:p></div><div>Header middle text 1&nbsp;</div><div><p style="background-color:rgb(255, 255, 255);margin:0in 0in 8pt;line-height:15.6933px;font-size:11pt;font-family:Calibri, sans-serif"><o:p></o:p></p></div>';
        editor.setContent(originalContent);

        const paragraph = doc.getElementById('testP');
        const header = doc.getElementById('testHeader');

        let range = new Range();
        range.setStart(paragraph, 0);
        range.setEnd(header, 1);
        doc.getSelection().addRange(range);

        clearFormat(editor, ClearFormatMode.AutoDetect);

        expect(editor.getContent()).toBe(expectedFormat);
    });

    it('removes format of partial selected element inside a LI', () => {
        const originalContent =
            '<p style="margin:0in 0in 8pt;line-height:107%;font-size:11pt;font-family:Calibri, sans-serif"><span style="font-size:13.5pt;font-family:&quot;Arial&quot;,sans-serif;color:black"></span></p><div><p style="background-color:rgb(255, 255, 255);margin:0in 0in 8pt;line-height:15.6933px;font-size:11pt;font-family:Calibri, sans-serif"><span style="font-size:13.5pt;font-family:Arial, sans-serif;color:black"></span></p></div><div></div><ul type="disc" style="margin-bottom:0in"> <li style="margin:0in 0in 8pt;font-size:11pt;font-family:Calibri, sans-serif;color:black;mso-margin-top-alt:auto;mso-margin-bottom-alt:auto;mso-list:l0 level1 lfo1;tab-stops:list .5in"><span style="font-size:13.5pt;font-family:&quot;Arial&quot;,sans-serif">item 1</span><span style="font-size:13.5pt"><o:p>&nbsp;</o:p></span></li> <li style="margin:0in 0in 8pt;font-size:11pt;font-family:Calibri, sans-serif;color:black;mso-margin-top-alt:auto;mso-margin-bottom-alt:auto;mso-list:l0 level1 lfo1;tab-stops:list .5in"><span style="font-size:13.5pt;font-family:&quot;Arial&quot;,sans-serif">Item 2</span><span style="font-size:13.5pt"><o:p>&nbsp;</o:p></span></li> <li style="margin:0in 0in 8pt;font-size:11pt;font-family:Calibri, sans-serif;color:black;mso-margin-top-alt:auto;mso-margin-bottom-alt:auto;mso-list:l0 level1 lfo1;tab-stops:list .5in"><span style="font-size:13.5pt;font-family:&quot;Arial&quot;,sans-serif">Sdasd</span><span style="font-size:13.5pt"><o:p>&nbsp;</o:p></span></li> <li style="margin:0in 0in 8pt;font-size:11pt;font-family:Calibri, sans-serif;color:black;mso-margin-top-alt:auto;mso-margin-bottom-alt:auto;mso-list:l0 level1 lfo1;tab-stops:list .5in"><span style="font-size:13.5pt;font-family:&quot;Arial&quot;,sans-serif">asdasd</span><span style="font-size:13.5pt"><o:p>&nbsp;</o:p></span></li></ul><div></div><div><p style="background-color:rgb(255, 255, 255);margin:0in 0in 8pt;line-height:15.6933px;font-size:11pt;font-family:Calibri, sans-serif"><o:p></o:p></p></div>';
        const expectedFormat =
            '<p style="margin:0in 0in 8pt;line-height:107%;font-size:11pt;font-family:Calibri, sans-serif"><span style="font-size:13.5pt;font-family:&quot;Arial&quot;,sans-serif;color:black"></span></p><div><p style="background-color:rgb(255, 255, 255);margin:0in 0in 8pt;line-height:15.6933px;font-size:11pt;font-family:Calibri, sans-serif"><span style="font-size:13.5pt;font-family:Arial, sans-serif;color:black"></span></p></div><div></div><ul style="margin-bottom:0in" type="disc"> <li style="margin:0in 0in 8pt;font-size:11pt;font-family:Calibri, sans-serif;color:black;mso-margin-top-alt:auto;mso-margin-bottom-alt:auto;mso-list:l0 level1 lfo1;tab-stops:list .5in"><span style="font-size:13.5pt;font-family:&quot;Arial&quot;,sans-serif">item 1</span><span style="font-size:13.5pt"><o:p>&nbsp;</o:p></span></li> <li style="margin:0in 0in 8pt;font-size:11pt;font-family:Calibri, sans-serif;color:black;mso-margin-top-alt:auto;mso-margin-bottom-alt:auto;mso-list:l0 level1 lfo1;tab-stops:list .5in"><span style="font-family: arial; font-size: 12pt; color: black;">Item</span><span style="font-size:13.5pt;font-family:&quot;Arial&quot;,sans-serif"> 2</span><span style="font-size:13.5pt"><o:p>&nbsp;</o:p></span></li> <li style="margin:0in 0in 8pt;font-size:11pt;font-family:Calibri, sans-serif;color:black;mso-margin-top-alt:auto;mso-margin-bottom-alt:auto;mso-list:l0 level1 lfo1;tab-stops:list .5in"><span style="font-size:13.5pt;font-family:&quot;Arial&quot;,sans-serif">Sdasd</span><span style="font-size:13.5pt"><o:p>&nbsp;</o:p></span></li> <li style="margin:0in 0in 8pt;font-size:11pt;font-family:Calibri, sans-serif;color:black;mso-margin-top-alt:auto;mso-margin-bottom-alt:auto;mso-list:l0 level1 lfo1;tab-stops:list .5in"><span style="font-size:13.5pt;font-family:&quot;Arial&quot;,sans-serif">asdasd</span><span style="font-size:13.5pt"><o:p>&nbsp;</o:p></span></li></ul><div></div><div><p style="background-color:rgb(255, 255, 255);margin:0in 0in 8pt;line-height:15.6933px;font-size:11pt;font-family:Calibri, sans-serif"><o:p></o:p></p></div>';
        editor.setContent(originalContent);

        const ul = doc.getElementsByTagName('ul')[0];
        const li = ul.children[1];
        const text = li.firstChild.firstChild;
        const range = new Range();
        range.setStart(text, 0);
        range.setEnd(text, 4);
        doc.getSelection().addRange(range);

        clearFormat(editor, ClearFormatMode.AutoDetect);

        expect(editor.getContent()).toBe(expectedFormat);
    });

    it('removes format and structure of LI element when all the children are selected', () => {
        const originalContent =
            '<p style="margin:0in 0in 8pt;line-height:107%;font-size:11pt;font-family:Calibri, sans-serif"><span style="font-size:13.5pt;font-family:&quot;Arial&quot;,sans-serif;color:black"></span></p><div><p style="background-color:rgb(255, 255, 255);margin:0in 0in 8pt;line-height:15.6933px;font-size:11pt;font-family:Calibri, sans-serif"><span style="font-size:13.5pt;font-family:Arial, sans-serif;color:black"></span></p></div><div></div><ul type="disc" style="margin-bottom:0in"> <li style="margin:0in 0in 8pt;font-size:11pt;font-family:Calibri, sans-serif;color:black;mso-margin-top-alt:auto;mso-margin-bottom-alt:auto;mso-list:l0 level1 lfo1;tab-stops:list .5in"><span style="font-size:13.5pt;font-family:&quot;Arial&quot;,sans-serif">item 2 with more text</span></li> <li style="margin:0in 0in 8pt;font-size:11pt;font-family:Calibri, sans-serif;color:black;mso-margin-top-alt:auto;mso-margin-bottom-alt:auto;mso-list:l0 level1 lfo1;tab-stops:list .5in"><span style="font-size:13.5pt;font-family:&quot;Arial&quot;,sans-serif">Item 2</span><span style="font-size:13.5pt"><o:p>&nbsp;</o:p></span></li> <li style="margin:0in 0in 8pt;font-size:11pt;font-family:Calibri, sans-serif;color:black;mso-margin-top-alt:auto;mso-margin-bottom-alt:auto;mso-list:l0 level1 lfo1;tab-stops:list .5in"><span style="font-size:13.5pt;font-family:&quot;Arial&quot;,sans-serif">Sdasd</span><span style="font-size:13.5pt"><o:p>&nbsp;</o:p></span></li> <li style="margin:0in 0in 8pt;font-size:11pt;font-family:Calibri, sans-serif;color:black;mso-margin-top-alt:auto;mso-margin-bottom-alt:auto;mso-list:l0 level1 lfo1;tab-stops:list .5in"><span style="font-size:13.5pt;font-family:&quot;Arial&quot;,sans-serif">asdasd</span><span style="font-size:13.5pt"><o:p>&nbsp;</o:p></span></li></ul><div></div><div><p style="background-color:rgb(255, 255, 255);margin:0in 0in 8pt;line-height:15.6933px;font-size:11pt;font-family:Calibri, sans-serif"><o:p></o:p></p></div>';
        const expectedFormat =
            '<p style="margin:0in 0in 8pt;line-height:107%;font-size:11pt;font-family:Calibri, sans-serif"><span style="font-size:13.5pt;font-family:&quot;Arial&quot;,sans-serif;color:black"></span></p><div><p style="background-color:rgb(255, 255, 255);margin:0in 0in 8pt;line-height:15.6933px;font-size:11pt;font-family:Calibri, sans-serif"><span style="font-size:13.5pt;font-family:Arial, sans-serif;color:black"></span></p></div><div></div><ul style="margin-bottom:0in" type="disc"> </ul><div>item 2 with more text</div><ul style="margin-bottom:0in" type="disc"> <li style="margin:0in 0in 8pt;font-size:11pt;font-family:Calibri, sans-serif;color:black;mso-margin-top-alt:auto;mso-margin-bottom-alt:auto;mso-list:l0 level1 lfo1;tab-stops:list .5in"><span style="font-size:13.5pt;font-family:&quot;Arial&quot;,sans-serif">Item 2</span><span style="font-size:13.5pt"><o:p>&nbsp;</o:p></span></li> <li style="margin:0in 0in 8pt;font-size:11pt;font-family:Calibri, sans-serif;color:black;mso-margin-top-alt:auto;mso-margin-bottom-alt:auto;mso-list:l0 level1 lfo1;tab-stops:list .5in"><span style="font-size:13.5pt;font-family:&quot;Arial&quot;,sans-serif">Sdasd</span><span style="font-size:13.5pt"><o:p>&nbsp;</o:p></span></li> <li style="margin:0in 0in 8pt;font-size:11pt;font-family:Calibri, sans-serif;color:black;mso-margin-top-alt:auto;mso-margin-bottom-alt:auto;mso-list:l0 level1 lfo1;tab-stops:list .5in"><span style="font-size:13.5pt;font-family:&quot;Arial&quot;,sans-serif">asdasd</span><span style="font-size:13.5pt"><o:p>&nbsp;</o:p></span></li></ul><div></div><div><p style="background-color:rgb(255, 255, 255);margin:0in 0in 8pt;line-height:15.6933px;font-size:11pt;font-family:Calibri, sans-serif"><o:p></o:p></p></div>';
        editor.setContent(originalContent);

        const ul = doc.getElementsByTagName('ul')[0];
        const li = ul.children[0];

        const range = new Range();
        range.setStart(li, 0);
        range.setEnd(li, li.children.length);
        doc.getSelection().addRange(range);

        clearFormat(editor, ClearFormatMode.AutoDetect);

        expect(editor.getContent()).toBe(expectedFormat);
    });

    it('removes text format when selecting a cell of a table', () => {
        editor.setContent(TABLE_TEST);
        const expectedFormat =
            '<div style="width:95.75pt;padding:0in 5.4pt 0in 5.4pt"> </div><div>asdfadf<o:p>&nbsp;</o:p></div><div style="width:95.75pt;padding:0in 5.4pt 0in 5.4pt"> </div>';

        let table: HTMLTableElement = doc.getElementById('testTable') as HTMLTableElement;
        let cell = table.rows[0].cells[2];
        let span = cell.getElementsByTagName('span')[0];

        const range = new Range();
        range.setStart(span, 0);
        range.setEnd(span, 1);
        doc.getSelection().addRange(range);

        clearFormat(editor, ClearFormatMode.AutoDetect);

        table = doc.getElementsByTagName('table')[0] as HTMLTableElement;
        cell = table.rows[0].cells[2];
        expect(cell.innerHTML).toBe(expectedFormat);
    });
});
