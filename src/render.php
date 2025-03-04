<?php

/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

require_once dirname(__DIR__) . '/vendor/autoload.php';


$title = $attributes['title'] ?? '';
$caption = $attributes['caption'] ?? '';
$mediaIDs = $attributes['mediaId'] ?? [];
$mediaUrls = $attributes['mediaUrl'] ?? [];

if (!empty($mediaIDs) && !empty($mediaUrls)) : ?>
	<div class="slider-block">
		<div class="slider-block__gallery">
			<?php foreach ($mediaUrls as $url) : ?>
				<div class="slider-block__gallery-item">
					<?php if (!empty($url)) : ?>
						<img src="<?php echo esc_url($url); ?>" alt="<?php echo esc_attr($title); ?>" />
					<?php endif; ?>
				</div>
			<?php endforeach; ?>
		</div>
	</div>
<?php endif;
