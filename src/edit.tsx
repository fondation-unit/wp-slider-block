/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { InspectorControls, useBlockProps, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { PanelBody, TextControl, Button } from '@wordpress/components';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }: { attributes: BlockAttributes, setAttributes: (attributes: BlockAttributes) => void }) {
  const blockProps = useBlockProps();
  const { fieldGroups = [] } = attributes;

  const updateField = (index: number, key: 'title' | 'caption' | 'mediaId' | 'mediaUrl', value: string | number) => {
    const newFields = [...fieldGroups]; // Copy the array.
		// Modify the value at the specific index.
    newFields[index] = { ...newFields[index], [key]: value };

    setAttributes({ fieldGroups: newFields });
  };

	/* Add a new field group. */
  const addFieldGroup = () => {
    setAttributes({ fieldGroups: [...fieldGroups, { title: '', caption: '', mediaId: 0, mediaUrl: '' }] });
  };

  const removeFieldGroup = (index: number) => {
    const newFields = fieldGroups.filter((_, i) => i !== index);
    setAttributes({ fieldGroups: newFields });
  };

  return (
    <>
      <InspectorControls>
        {fieldGroups.map((group, index) => (
          <PanelBody key={index} title={`${__('Settings', 'slider')} ${index + 1}`}>
            <TextControl
              label={__('Title', 'slider')}
              value={group.title || ''}
              onChange={(value: string) => updateField(index, 'title', value)}
            />
            <TextControl
              label={__('Caption', 'slider')}
              value={group.caption || ''}
              onChange={(value: string) => updateField(index, 'caption', value)}
            />
            <MediaUploadCheck>
              <MediaUpload
                onSelect={(media: any) => updateField(index, 'mediaUrl', media.url)}
                allowedTypes={['image']}
                value={group.mediaId}
                render={({ open }: any) => (
                  <div>
                    {group.mediaUrl ? (
                      <img src={group.mediaUrl} style={{maxWidth: '100%', height: 'auto'}} />
                    ) : (
                      <p>{__('No media selected', 'slider')}</p>
                    )}
                    <Button variant="secondary" onClick={open}>
                      {__('Select media', 'slider')}
                    </Button>
                  </div>
                )}
              />
            </MediaUploadCheck>

            <Button variant="secondary" onClick={() => removeFieldGroup(index)}>
              {__('Remove', 'slider')}
            </Button>
          </PanelBody>
        ))}
        <Button variant="primary" onClick={addFieldGroup}>
          {__('Add', 'slider')}
        </Button>
      </InspectorControls>

      <div {...blockProps} className={`${blockProps.className} slider-block-wrapper`}>
        <h4>{__('Slider block', 'slider')}</h4>
      </div>
    </>
  );
}
