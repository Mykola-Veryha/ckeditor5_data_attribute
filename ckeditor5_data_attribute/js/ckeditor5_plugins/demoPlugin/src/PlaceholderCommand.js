/**
 * @file defines InsertSimpleBoxCommand, which is executed when the simpleBox
 * toolbar button is pressed.
 */
// cSpell:ignore simpleboxediting

import { Command } from 'ckeditor5/src/core';

export default class PlaceholderCommand extends Command {
  execute( { value } ) {
    const editor = this.editor;
    const selection = editor.model.document.selection;

    editor.model.change( writer => {
      // Create a <placeholder> elment with the "name" attribute (and all the selection attributes)...
      const placeholder = writer.createElement( 'placeholder', {
        ...Object.fromEntries( selection.getAttributes() ),
        name: value
      } );

      // ... and insert it into the document.
      editor.model.insertContent( placeholder );

      // Put the selection on the inserted element.
      writer.setSelection( placeholder, 'on' );
    } );
  }

  refresh() {
    const model = this.editor.model;
    const selection = model.document.selection;

    const isAllowed = model.schema.checkChild( selection.focus.parent, 'placeholder' );

    this.isEnabled = isAllowed;
  }
}
