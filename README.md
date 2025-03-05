# WordPress Slider block

## Development

### Getting started

- [https://developer.wordpress.org/block-editor/getting-started/tutorial/](https://developer.wordpress.org/block-editor/getting-started/tutorial/)
- [https://developer.wordpress.org/block-editor/reference-guides/interactivity-api/core-concepts/using-typescript/](https://developer.wordpress.org/block-editor/reference-guides/interactivity-api/core-concepts/using-typescript/)

### Block attributes

To use new attributes in the block's editor, they must be declared in the [src/block.json](./src/block.json) file.

```json
"attributes": {
  // ...
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
  const { title, caption, mediaId, mediaUrl } = attributes;

  // ...
```

### MediaUpload

[https://github.com/WordPress/gutenberg/blob/trunk/packages/block-editor/src/components/media-upload/README.md](https://github.com/WordPress/gutenberg/blob/trunk/packages/block-editor/src/components/media-upload/README.md)

### Dashicons

Set the block icon in `src/block.json` from an existing dashicon
[https://developer.wordpress.org/resource/dashicons/](https://developer.wordpress.org/resource/dashicons/):

```json
{
  // ...
  "category": "format",
  "icon": "format-gallery"
  // ...
}
```

### Translations

Create the .po file using WP-CLI:

```sh
wp i18n make-pot . languages/slider_block-fr_FR.po
```

Create the .mo file:

[wp i18n make-mo](https://developer.wordpress.org/cli/commands/i18n/make-mo/)

```sh
wp i18n make-mo ./languages
```

Create the .json file for the scripts:

```sh
wp i18n make-json languages/ --no-purge
```
