const { React, getModuleByDisplayName, getModule } = require("powercord/webpack");
const Tooltip = getModuleByDisplayName("Tooltip", false);
const { Button } = require("powercord/components");
const buttonClasses = getModule(["button"], false);
const buttonWrapperClasses = getModule(["buttonWrapper","pulseButton"], false);
const buttonTextAreaClasses = getModule(["button", "textArea"], false);

module.exports = () => (
    <Tooltip color="black" postion="top" text="Owoifier">
        {({ onMouseLeave, onMouseEnter }) => (
            <Button
                look={Button.Looks.BLANK}
                size={Button.Sizes.ICON}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                <div
                    className={`${buttonClasses.contents} ${buttonWrapperClasses.button} ${buttonTextAreaClasses.button}`}
                >
                    <img
                        className={`${buttonWrapperClasses.icon}`}
                        style={{ filter: "invert(70%)" }}
                        src="https://gist.githubusercontent.com/Fezalion/413f7e1cee8fa23f257bab808ff7130a/raw/5dfe1973022a56209f3d1b5138d144912884e8cb/owo.svg"
                     alt="Owoifier"/>
                </div>
            </Button>
        )}
    </Tooltip>
);