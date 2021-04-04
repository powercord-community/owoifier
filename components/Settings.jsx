const { React } = require('powercord/webpack');
const { FormTitle, Button } = require('powercord/components');
const { SwitchItem, Category } = require('powercord/components/settings');

const TextInputWithButton = require('./TextInputWithButton');

let defFaces = [
  { name: "(・`ω´・)" },
  { name: ";;w;;" },
  { name: "owo" },
  { name: "UwU" },
  { name: ">w<" },
  { name: "^w^" }
];

let Faces = new Array();

module.exports = class OwoifierSettings extends React.PureComponent {  
    constructor(props) {
        super(props)
        this.state = { category1Opened: false }
    }
    handleAddNewFace () {
      return Faces.concat({ name: null });
    }
    handleFacesListChange = (idx,newvalue) => {
        const newFaces = Faces.map((face, sidx) => {
          if (idx !== sidx) return face;
          return { ...face, name: newvalue };
        });
        return newFaces;
    };

    handleRemoveFaces = (idx) => {
      if(Faces.length > 1) {    
        const newFaces = Faces.filter((obj,sidx) => sidx !== idx);
        return newFaces;
      }      
    };

    render() {
        const { getSetting, toggleSetting, updateSetting } = this.props;
        return <> 
        <FormTitle tag='h2'>Button</FormTitle>
        <SwitchItem
        note="Whether the button should enabled or not."
        value={getSetting('buttonEnabled', true)}
        onChange={() => toggleSetting('buttonEnabled')}
      >
        Enable
      </SwitchItem>
      <SwitchItem
        note="Whether the button should be at the left of the list of buttons."
        value={getSetting('buttonPos', false)}
        onChange={() => toggleSetting('buttonPos')}
      >
        Button end of the list
      </SwitchItem>
        </>;
    }
}