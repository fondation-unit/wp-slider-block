<?php

/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

require_once dirname(__DIR__) . '/vendor/autoload.php';


$fieldGroups = $attributes['fieldGroups'] ?? [];

if (!empty($fieldGroups)) : ?>
	<div class="slider-block-wrapper">
		<div class="slider-block-entries">
			<?php foreach ($fieldGroups as $group) :
				$spreadsheetId = $group['spreadsheetId'] ?? '';
				$sheetName = $group['sheetName'] ?? '';
				$mediaUrl = $group['mediaUrl'] ?? ''; ?>

				<div class="slider-block-entry">
					<?php if (!empty($mediaUrl)) : ?>
						<img src="<?php echo esc_url($mediaUrl); ?>" alt="<?php echo esc_attr($sheetName); ?>" />
					<?php endif; ?>
				</div>
			<?php endforeach; ?>
		</div>
	</div>
<?php endif;
