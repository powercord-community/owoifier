const { React } = require('powercord/webpack');

module.exports = class previewBar extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = this.getNewState();
    }
    
    render() {
        return (
          <div className={`owoifierPreviewBar owoifierPreviewBar-${this.state.enabled ? 'visible' : 'hidden'}`}> 
            {console.log(this.state.text + " | " + this.state.text.length)}
            {this.state.text == '' ? 'Auto owo enabled.' : this.state.text}
          </div>
        );        
    }

    componentDidMount() {
        this.interval = setInterval(async () => {
            this.setState(this.getNewState());
        }, 1e3);
    }

    componentWillUnmount() {
		clearInterval(this.interval);
	}

    getNewState() {
        return {
            text: this.props.getSetting('owopreviewtext',''),
            enabled: this.props.getSetting('owoEnabled', false)
        };
    }
}