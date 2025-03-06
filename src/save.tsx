import { __ } from "@wordpress/i18n";
import { useBlockProps } from "@wordpress/block-editor";

export default function save({ attributes }: { attributes: BlockAttributes }) {
  const { title, caption, loop, mediaUrl } = attributes;

  return (
    <div
      {...useBlockProps.save({
        className: "slider-block swiper"
      })}
      data-slider-loop={loop}
    >
      <div className="slider-block__title">{title}</div>
      <div className="slider-block__gallery swiper-wrapper">
        {mediaUrl.map((url, index) => (
          <div key={index} className="slider-block__gallery-item swiper-slide">
            <img src={url} alt={`Image ${index + 1}`} />
          </div>
        ))}
      </div>
      <div className="slider-block__caption">{caption ? caption : __("Caption", "slider")}</div>
      <div className="swiper-pagination"></div>
      <div className="swiper-button-prev"></div>
      <div className="swiper-button-next"></div>
      <div className="swiper-scrollbar"></div>
      <div className="slider-block__caption">{caption}</div>
    </div>
  );
}
