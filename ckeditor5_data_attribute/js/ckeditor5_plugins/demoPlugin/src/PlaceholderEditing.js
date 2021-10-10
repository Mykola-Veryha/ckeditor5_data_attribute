import { Plugin } from 'ckeditor5/src/core';
import { toWidget, viewToModelPositionOutsideModelElement } from 'ckeditor5/src/widget';
import { Widget } from 'ckeditor5/src/widget';

import PlaceholderCommand from './PlaceholderCommand';

// cSpell:ignore simplebox insertsimpleboxcommand

/**
 * CKEditor 5 plugins do not work directly with the DOM. They are defined as
 * plugin-specific data models that are then converted to markup that
 * is inserted in the DOM.
 *
 * CKEditor 5 internally interacts with simpleBox as this model:
 * <simpleBox>
 *    <simpleBoxTitle></simpleBoxTitle>
 *    <simpleBoxDescription></simpleBoxDescription>
 * </simpleBox>
 *
 * Which is converted for the browser/user as this markup
 * <section class="simple-box">
 *   <h2 class="simple-box-title"></h1>
 *   <div class="simple-box-description"></div>
 * </section>
 *
 * This file has the logic for defining the simpleBox model, and for how it is
 * converted to standard DOM markup.
 */
export default class PlaceholderEditing extends Plugin {
  static get requires() {
    return [ Widget ];
  }

  init() {
    console.log( 'PlaceholderEditing#init() got called1' );

    this._defineSchema();
    this._defineConverters();

    this.editor.commands.add( 'placeholder', new PlaceholderCommand( this.editor ) );

    this.editor.editing.mapper.on(
      'viewToModelPosition',
      viewToModelPositionOutsideModelElement( this.editor.model, viewElement => viewElement.hasClass( 'placeholder' ) )
    );
    this.editor.config.define( 'placeholderConfig', {
      types: [ 'date', 'first name', 'surname' ]
    } );
  }

  _defineSchema() {
    const schema = this.editor.model.schema;

    schema.register( 'placeholder', {
      // Allow wherever text is allowed:
      allowWhere: '$text',

      // The placeholder will act as an inline node:
      isInline: true,

      // The inline widget is self-contained so it cannot be split by the caret and it can be selected:
      isObject: true,

      // The inline widget can have the same attributes as text (for example linkHref, bold).
      allowAttributesOf: '$text',

      // The placeholder can have many types, like date, name, surname, etc:
      allowAttributes: [ 'name' ]
    } );
  }

  _defineConverters() {
    const conversion = this.editor.conversion;

    conversion.for( 'upcast' ).elementToElement( {
      view: {
        name: 'span',
        classes: [ 'placeholder' ]
      },
      model: ( viewElement, { writer: modelWriter } ) => {
        // Extract the "name" from "{name}".
        const name = viewElement.getChild( 0 ).data.slice( 1, -1 );

        return modelWriter.createElement( 'placeholder', { name } );
      }
    } );

    conversion.for( 'editingDowncast' ).elementToElement( {
      model: 'placeholder',
      view: ( modelItem, { writer: viewWriter } ) => {
        const widgetElement = createPlaceholderView( modelItem, viewWriter );

        // Enable widget handling on a placeholder element inside the editing view.
        return toWidget( widgetElement, viewWriter );
      }
    } );

    conversion.for( 'dataDowncast' ).elementToElement( {
      model: 'placeholder',
      view: ( modelItem, { writer: viewWriter } ) => createPlaceholderView( modelItem, viewWriter )
    } );

    // Helper method for both downcast converters.
    function createPlaceholderView( modelItem, viewWriter ) {
      const name = modelItem.getAttribute( 'name' );

      const placeholderView = viewWriter.createContainerElement( 'span', {
        'data-attribute': name,
      }, {
        isAllowedInsideAttributeElement: true
      } );

      let range = viewWriter.document.selection.getFirstRange()
      for (const item of range.getItems()) {
        console.log(item.data) //return the selected text
      }

      // Insert the placeholder name (as a text).
      const innerText = viewWriter.createText( '{' + name + '}' );
      viewWriter.insert( viewWriter.createPositionAt( placeholderView, 0 ), innerText );

      console.log(777777);
      debugger
      console.log(viewWriter);

      return placeholderView;
    }
  }
}
