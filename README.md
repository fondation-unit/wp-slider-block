# WordPress Slider block

## Resources

- [https://developer.wordpress.org/block-editor/getting-started/tutorial/](https://developer.wordpress.org/block-editor/getting-started/tutorial/)
- [https://developer.wordpress.org/block-editor/reference-guides/interactivity-api/core-concepts/using-typescript/](https://developer.wordpress.org/block-editor/reference-guides/interactivity-api/core-concepts/using-typescript/)

## Architecture

This block uses static rendering. Thus, we don't rely on [render.php](./src/render.php) to be responsible of the display.

```php
echo wp_kses_post($content);
```

It's the `save` function that stores the contents of the block in the database.
So it's the [save.tsx](./src/save.tsx) that is responsible of producing the static rendering.

Since we need to initialize swiper in the client (as it can't be done within the static data stored by the
`save` function), we rely on [view.ts](./src/view.ts) to do the business.

## Development

### Block attributes

To use new attributes in the block's editor, they must be declared in the [block.json](./src/block.json) file.

```json
"attributes": {
  /* ... */
}
```

Once registered, the attributes can be added to the `BlockAttributes` interface in [src/types/block.d.ts](./src/types/block.d.ts).

Since the interface is passed to the `Edit` function, you can decompose the new attributes directly within the function, like so:

```ts
export default function Edit({
  attributes,
  setAttributes
}: {
  attributes: BlockAttributes;
  setAttributes: (attributes: BlockAttributes) => void;
}) {
  const blockProps = useBlockProps();
  const { title, caption, /* other attributes ... */ } = attributes;

  // ...
```

#### Attributes documentation

- [TextControl](https://github.com/WordPress/gutenberg/tree/trunk/packages/components/src/text-control/README.md)
- [CheckboxControl](https://github.com/WordPress/gutenberg/blob/trunk/packages/components/src/checkbox-control/README.md)
- [MediaUpload](https://github.com/WordPress/gutenberg/blob/trunk/packages/block-editor/src/components/media-upload/README.md)

### Dashicons

Set the block icon in `src/block.json` from an existing dashicon
[https://developer.wordpress.org/resource/dashicons/](https://developer.wordpress.org/resource/dashicons/):

```json
{
  /* ... */
  "category": "format",
  "icon": "format-gallery"
  /* ... */
}
```

### Translations

Create the .po file using WP-CLI:

```sh
wp i18n make-pot . languages/slider-fr_FR.po
```

The prefix name of the .po file must match the language domain of the plugin.

Create the .mo file ([see: https://developer.wordpress.org/cli/commands/i18n/make-mo/](https://developer.wordpress.org/cli/commands/i18n/make-mo/)):

```sh
wp i18n make-mo ./languages
```

Create the .json file for the scripts:

```sh
wp i18n make-json languages/ --no-purge
```

> [!IMPORTANT]
> All the language files must be named with a prefix matching the text-domain value of the block.
> In our case: `"textdomain": "slider"`

The languages file are loaded during the init callback:

```php
wp_set_script_translations(
    'create-block-slider-editor-script',
    'slider',
    plugin_dir_path(__FILE__) . 'languages'
);
```

The process is covered by 2 NPM commands:

- Step 1: run `npm run make-pot`
- Step 2: do the translations in the `languages/slider-fr_FR.po` file
- Step 3: run `npm run make-mo`
