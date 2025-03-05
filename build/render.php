<?php

/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

require_once dirname(__DIR__) . '/vendor/autoload.php';


$title = $attributes['title'] ?? '';
$caption = $attributes['caption'] ?? '';
$mediaIDs = $attributes['mediaId'] ?? [];
$mediaUrls = $attributes['mediaUrl'] ?? [];

$data = array('loop' => 5);
add_action('wp_footer', function () use ($data) {
    printf('<script type="text/javascript">var sliderData = %s</script>', json_encode($data));
});

if (!empty($mediaIDs) && !empty($mediaUrls)) : ?>
    <div><?php echo trim(esc_html($title)); ?></div>
    <!-- Swiper -->
    <div class="slider-block swiper">
        <div class="slider-block__gallery swiper-wrapper">
            <?php foreach ($mediaUrls as $url) : ?>
                <div class="slider-block__gallery-item swiper-slide">
                    <?php if (!empty($url)) : ?>
                        <img src="<?php echo esc_url($url); ?>" alt="<?php echo esc_attr($title); ?>" />
                    <?php endif; ?>
                </div>
            <?php endforeach; ?>
        </div>
        <div><?php echo trim(esc_html($caption)); ?></div>
        <!-- Swiper options -->
        <div class="swiper-pagination"></div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
        <div class="swiper-scrollbar"></div>
    </div>
<?php endif;
