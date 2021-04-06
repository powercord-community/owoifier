const { React } = require('powercord/webpack');
const { FormTitle } = require('powercord/components');
const { SwitchItem } = require('powercord/components/settings');

module.exports = class OwoifierSettings extends React.PureComponent {  
    constructor(props) {
        super(props)

        this.state = { 
            buttonPos: this.props.getSetting('buttonPos', false),
            buttonEnabled: this.props.getSetting('buttonEnabled', true),
            owoLevel: this.props.getSetting('owoLevel','owo')
        }
    }

    render() {
        return <> 
        <FormTitle tag='h2'>Button</FormTitle>
        <SwitchItem
        note="Whether the button should enabled or not."
        value={ this.state.buttonEnabled }
        onChange={ e => {
          this.setState({ buttonEnabled: e.value });
          this.props.toggleSetting('buttonEnabled');          
        }}
      >
        Enable
      </SwitchItem>
      <SwitchItem
        note="Whether the button should be at the left of the list of buttons."
        value={ this.state.buttonPos }
        onChange={ e => {
          this.setState({ buttonPos: e.value });
          this.props.toggleSetting('buttonPos');
        }}
      >
        Button end of the list
      </SwitchItem>
      <RadioGroup
        disabled={ false }
        options={ [
          { name: 'owo',
            value: 'owo' },
          { name: 'uwu',
            value: 'uwu' },
          { name: 'uvu',
            value: 'uvu' }
        ] }
        value={ this.state.owoLevel }
        note={<>
          <p>
            gonna add some text here about levels
            gonna add some text here about levels
            gonna add some text here about levels
          </p>
        </>}
        onChange={ e => {
          this.setState({ owoLevel: e.value });
          this.props.updateSetting('owoLevel', e.value);
        }}
      >
        Owoify level
      </RadioGroup>
        </>;
    }
}