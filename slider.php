<?php

/**
 * Plugin Name:       Slider
 * Description:       Slider block.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Fondation UNIT
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       slider
 *
 * @package CreateBlock
 */

if (! defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_slider_block_init() {
    register_block_type(__DIR__ . '/build');
}
add_action('init', 'create_block_slider_block_init');

/**
 * Block translation.
 */
function slider_block_script_translations() {
    wp_set_script_translations(
        'create-block-slider-editor-script',
        'slider',
        plugin_dir_path(__FILE__) . 'languages'
    );
}
add_action('init', 'slider_block_script_translations');
