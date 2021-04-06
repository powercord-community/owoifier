const { React } = require('powercord/webpack');
const { FormTitle } = require('powercord/components');
const { SwitchItem, RadioGroup } = require('powercord/components/settings');

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
        onChange={ () => {
          this.setState({ buttonEnabled: !buttonEnabled });
          this.props.toggleSetting('buttonEnabled');          
        }}
      >
        Enable
      </SwitchItem>
      <SwitchItem
        note="Whether the button should be at the left of the list of buttons."
        value={ this.state.buttonPos }
        onChange={ () => {
          this.setState({ buttonPos: !buttonPos });
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
            owo: oh dear gwod pwalase help mwe, save mwe fwom this heww that is owo <br></br>
            uwu: oh deaw gwod pwease hewp mwe (・`ω´・) sawe mwe fwom fwis heww dat is uwu <br></br>
            uvu: owoh deaw gwod pwease hewp mwe ＼(＾▽＾)／ sawe mwe fwowom fwis heww dat is uvu <br></br>
            this is handled by <a href="https://www.npmjs.com/package/owoify-js" >owoify-js</a>.
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