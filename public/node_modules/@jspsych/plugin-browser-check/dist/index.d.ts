import { JsPsych, JsPsychPlugin, ParameterType, TrialType } from "jspsych";
declare const info: {
    readonly name: "browser-check";
    readonly parameters: {
        /**
         * List of features to check and record in the data
         */
        readonly features: {
            readonly type: ParameterType.STRING;
            readonly array: true;
            readonly default: readonly ["width", "height", "webaudio", "browser", "browser_version", "mobile", "os", "fullscreen", "vsync_rate", "webcam", "microphone"];
        };
        /**
         * Any features listed here will be skipped, even if they appear in `features`. Useful for
         * when you want to run most of the defaults.
         */
        readonly skip_features: {
            readonly type: ParameterType.STRING;
            readonly array: true;
            readonly default: readonly [];
        };
        /**
         * The number of animation frames to sample when calculating vsync_rate.
         */
        readonly vsync_frame_count: {
            readonly type: ParameterType.INT;
            readonly default: 60;
        };
        /**
         * If `true`, show a message when window size is too small to allow the user
         * to adjust if their screen allows for it.
         */
        readonly allow_window_resize: {
            readonly type: ParameterType.BOOL;
            readonly default: true;
        };
        /**
         * When `allow_window_resize` is `true`, this is the minimum width (px) that the window
         * needs to be before the experiment will continue.
         */
        readonly minimum_width: {
            readonly type: ParameterType.INT;
            readonly default: 0;
        };
        /**
         * When `allow_window_resize` is `true`, this is the minimum height (px) that the window
         * needs to be before the experiment will continue.
         */
        readonly minimum_height: {
            readonly type: ParameterType.INT;
            readonly default: 0;
        };
        /**
         * Message to display during interactive window resizing.
         */
        readonly window_resize_message: {
            readonly type: ParameterType.HTML_STRING;
            readonly default: "<p>Your browser window is too small to complete this experiment. Please maximize the size of your browser window. \n        If your browser window is already maximized, you will not be able to complete this experiment.</p>\n        <p>The minimum window width is <span id=\"browser-check-min-width\"></span> px.</p>\n        <p>Your current window width is <span id=\"browser-check-actual-width\"></span> px.</p>\n        <p>The minimum window height is <span id=\"browser-check-min-height\"></span> px.</p>\n        <p>Your current window height is <span id=\"browser-check-actual-height\"></span> px.</p>";
        };
        /**
         * During the interactive resize, a button with this text will be displayed below the
         * `window_resize_message` for the participant to click if the window cannot meet the
         * minimum size needed. When the button is clicked, the experiment will end and
         * `exclusion_message` will be displayed.
         */
        readonly resize_fail_button_text: {
            readonly type: ParameterType.STRING;
            readonly default: "I cannot make the window any larger";
        };
        /**
         * A function that evaluates to `true` if the browser meets all of the inclusion criteria
         * for the experiment, and `false` otherwise. The first argument to the function will be
         * an object containing key value pairs with the measured features of the browser. The
         * keys will be the same as those listed in `features`.
         */
        readonly inclusion_function: {
            readonly type: ParameterType.FUNCTION;
            readonly default: () => boolean;
        };
        /**
         * The message to display if `inclusion_function` returns `false`
         */
        readonly exclusion_message: {
            readonly type: ParameterType.FUNCTION;
            readonly default: () => string;
        };
    };
};
declare type Info = typeof info;
/**
 * **browser-check**
 *
 * jsPsych plugin for checking features of the browser and validating against a set of inclusion criteria.
 *
 * @author Josh de Leeuw
 * @see {@link https://www.jspsych.org/plugins/jspsych-browser-check/ browser-check plugin documentation on jspsych.org}
 */
declare class BrowserCheckPlugin implements JsPsychPlugin<Info> {
    private jsPsych;
    static info: {
        readonly name: "browser-check";
        readonly parameters: {
            /**
             * List of features to check and record in the data
             */
            readonly features: {
                readonly type: ParameterType.STRING;
                readonly array: true;
                readonly default: readonly ["width", "height", "webaudio", "browser", "browser_version", "mobile", "os", "fullscreen", "vsync_rate", "webcam", "microphone"];
            };
            /**
             * Any features listed here will be skipped, even if they appear in `features`. Useful for
             * when you want to run most of the defaults.
             */
            readonly skip_features: {
                readonly type: ParameterType.STRING;
                readonly array: true;
                readonly default: readonly [];
            };
            /**
             * The number of animation frames to sample when calculating vsync_rate.
             */
            readonly vsync_frame_count: {
                readonly type: ParameterType.INT;
                readonly default: 60;
            };
            /**
             * If `true`, show a message when window size is too small to allow the user
             * to adjust if their screen allows for it.
             */
            readonly allow_window_resize: {
                readonly type: ParameterType.BOOL;
                readonly default: true;
            };
            /**
             * When `allow_window_resize` is `true`, this is the minimum width (px) that the window
             * needs to be before the experiment will continue.
             */
            readonly minimum_width: {
                readonly type: ParameterType.INT;
                readonly default: 0;
            };
            /**
             * When `allow_window_resize` is `true`, this is the minimum height (px) that the window
             * needs to be before the experiment will continue.
             */
            readonly minimum_height: {
                readonly type: ParameterType.INT;
                readonly default: 0;
            };
            /**
             * Message to display during interactive window resizing.
             */
            readonly window_resize_message: {
                readonly type: ParameterType.HTML_STRING;
                readonly default: "<p>Your browser window is too small to complete this experiment. Please maximize the size of your browser window. \n        If your browser window is already maximized, you will not be able to complete this experiment.</p>\n        <p>The minimum window width is <span id=\"browser-check-min-width\"></span> px.</p>\n        <p>Your current window width is <span id=\"browser-check-actual-width\"></span> px.</p>\n        <p>The minimum window height is <span id=\"browser-check-min-height\"></span> px.</p>\n        <p>Your current window height is <span id=\"browser-check-actual-height\"></span> px.</p>";
            };
            /**
             * During the interactive resize, a button with this text will be displayed below the
             * `window_resize_message` for the participant to click if the window cannot meet the
             * minimum size needed. When the button is clicked, the experiment will end and
             * `exclusion_message` will be displayed.
             */
            readonly resize_fail_button_text: {
                readonly type: ParameterType.STRING;
                readonly default: "I cannot make the window any larger";
            };
            /**
             * A function that evaluates to `true` if the browser meets all of the inclusion criteria
             * for the experiment, and `false` otherwise. The first argument to the function will be
             * an object containing key value pairs with the measured features of the browser. The
             * keys will be the same as those listed in `features`.
             */
            readonly inclusion_function: {
                readonly type: ParameterType.FUNCTION;
                readonly default: () => boolean;
            };
            /**
             * The message to display if `inclusion_function` returns `false`
             */
            readonly exclusion_message: {
                readonly type: ParameterType.FUNCTION;
                readonly default: () => string;
            };
        };
    };
    private end_flag;
    private t;
    constructor(jsPsych: JsPsych);
    private delay;
    trial(display_element: HTMLElement, trial: TrialType<Info>): void;
    private run_trial;
    private create_feature_fn_map;
    private measure_features;
    private inclusion_check;
    private check_allow_resize;
    private end_trial;
    private end_experiment;
    simulate(trial: TrialType<Info>, simulation_mode: any, simulation_options: any, load_callback: () => void): void;
    private create_simulation_data;
    private simulate_data_only;
    private simulate_visual;
}
export default BrowserCheckPlugin;
