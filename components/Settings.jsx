const { React } = require('powercord/webpack');
const { FormTitle } = require('powercord/components');
const { SwitchItem, RadioGroup } = require('powercord/components/settings');

module.exports = class OwoifierSettings extends React.PureComponent {  
    constructor(props) {
        super(props)

        this.state = {
            owoLevel: this.props.getSetting('owoLevel','owo'),
            owoEnabled: this.props.getSetting('owoEnabled', false)
        }
    }

    render() {
        return <>
        <SwitchItem
        note="Auto owoify toggle."
        value={ this.state.owoEnabled }
        onChange={ () => {
          this.setState({ owoEnabled: !this.state.owoEnabled });
          this.props.toggleSetting('owoEnabled');          
        }}
      >
        Enable
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