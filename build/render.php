<?php

/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

require_once dirname(__DIR__) . '/vendor/autoload.php';


$data = array(
    'title' => $attributes['title'] ?? '',
    'caption' => $attributes['caption'] ?? '',
    'loop' => $attributes['loop'] ?? false,
    'mediaIDs' => $attributes['mediaId'] ?? [],
    'mediaURLs' => $attributes['mediaUrl'] ?? [],
);

// The data that must be passed to the view.
$view_data = array(
    'title' => $data['title'],
    'caption' => $data['caption'],
    'loop' => $data['loop'],
);

if (!empty($data['mediaIDs']) && !empty($data['mediaURLs'])) : ?>
    <div><?php echo trim(esc_html($data['title'])); ?></div>
    <!-- Swiper -->
    <div class="slider-block swiper" data-slider="<?php echo htmlspecialchars(json_encode($view_data)); ?>">
        <div class="slider-block__gallery swiper-wrapper">
            <?php foreach ($data['mediaURLs'] as $url) : ?>
                <div class="slider-block__gallery-item swiper-slide">
                    <?php if (!empty($url)) : ?>
                        <img src="<?php echo esc_url($url); ?>" alt="<?php echo esc_attr($data['title']); ?>" />
                    <?php endif; ?>
                </div>
            <?php endforeach; ?>
        </div>
        <div><?php echo trim(esc_html($data['caption'])); ?></div>
        <!-- Swiper options -->
        <div class="swiper-pagination"></div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
        <div class="swiper-scrollbar"></div>
    </div>
<?php endif;
