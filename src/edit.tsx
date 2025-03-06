/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { InspectorControls, useBlockProps, MediaUpload, MediaUploadCheck } from "@wordpress/block-editor";
import { Button, CheckboxControl, PanelBody, TextControl } from "@wordpress/components";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({
  attributes,
  setAttributes
}: {
  attributes: BlockAttributes;
  setAttributes: (attributes: BlockAttributes) => void;
}) {
  const blockProps = useBlockProps();
  const { title, caption, loop, mediaId, mediaUrl } = attributes;

  const setTitle = (value: string) => {
    setAttributes({ ...attributes, title: value });
  };

  const setCaption = (value: string) => {
    setAttributes({ ...attributes, caption: value });
  };

  const setLoop = (value: boolean) => {
    setAttributes({ ...attributes, loop: value });
  };

  const setMedia = (selectedMedia: any[]) => {
    const newMediaId = selectedMedia.map((m: any) => m.id);
    const newMediaUrl = selectedMedia.map((m: any) => m.url);

    setAttributes({
      ...attributes,
      mediaId: newMediaId,
      mediaUrl: newMediaUrl
    });
  };

  return (
    <>
      <InspectorControls>
        <PanelBody title={`${__("Settings", "slider")}`}>
          {/* Title */}
          <TextControl
            label={__("Title", "slider")}
            value={title || ""}
            onChange={(value: string) => setTitle(value)}
          />
          {/* Caption */}
          <TextControl
            label={__("Caption", "slider")}
            value={caption || ""}
            onChange={(value: string) => setCaption(value)}
          />
          {/* Loop */}
          <CheckboxControl
            __nextHasNoMarginBottom
            label={__("Loop", "slider")}
            help={__("Check this to enable continuous loop mode", "slider")}
            checked={loop}
            onChange={setLoop}
          />
          {/* Media Upload */}
          <MediaUploadCheck>
            <MediaUpload
              onSelect={setMedia}
              allowedTypes={["image"]} // Enable images only
              gallery // Enable gallery mode
              multiple // Enable multiple images selection
              value={mediaId}
              render={({ open }) => (
                <div>
                  {mediaUrl.length > 0 ? (
                    <div className="slider-bloc__media-gallery">
                      {mediaUrl.map((url, index) => (
                        <div key={index} className="slider-bloc__media-item">
                          <img src={url} style={{ maxWidth: "100%", height: "auto" }} alt={`Image ${index + 1}`} />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>{__("No media selected", "slider")}</p>
                  )}
                  <Button variant="secondary" onClick={open}>
                    {__("Select media", "slider")}
                  </Button>
                </div>
              )}
            />
          </MediaUploadCheck>
        </PanelBody>
      </InspectorControls>

      {/* Render the block in the editor */}
      <div {...blockProps} className={`${blockProps.className} slider-block`}>
        <h4 className="slider-block__title">{title ? title : __("Slider", "slider")}</h4>
        <div className="slider-block__gallery">
          {mediaUrl.map((url, index) => (
            <div key={index} className="slider-block__gallery-item">
              <img src={url} alt={`Image ${index + 1}`} />
            </div>
          ))}
        </div>
        <div className="slider-block__caption">{caption ? caption : __("Caption", "slider")}</div>
      </div>
    </>
  );
}
