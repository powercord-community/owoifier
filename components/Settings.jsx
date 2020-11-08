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
        //Faces = defFaces; //is there a way to reset the settings ??
        Faces = getSetting('owoifierFaces');
        if(Faces == null) { // if faces is empty, copy default faces to faces 
          updateSetting('owoifierFaces',defFaces);
          Faces = getSetting('owoifierFaces');
        }        
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
        <FormTitle tag='h2'>Faces</FormTitle>
        <SwitchItem
        note="Enable this if you want your '!' to change to randomly selected cute faces listed below."
        value={getSetting('enableFaces', true)}
        onChange={() => toggleSetting('enableFaces')}
      >
        Faces
      </SwitchItem>
      <Category name="Faces" description="Configure which faces you want." opened={this.state.category1Opened} onChange={() => this.setState({ category1Opened: !this.state.category1Opened })}>
      {Faces.map((face, idx) => (
          <div>
            <TextInputWithButton
              type="text"
              placeholder={`Face #${idx + 1}`}
              defaultValue={face.name}
              onChange={val => {updateSetting('owoifierFaces', this.handleFacesListChange(idx,val))}}
              buttonOnClick={() => {updateSetting('owoifierFaces', this.handleRemoveFaces(idx))}}
              buttonText="Remove"
              buttonIcon="fal fa-minus"
            />
          </div>
        ))}
        <Button
          onClick={() => {updateSetting('owoifierFaces', this.handleAddNewFace())}}
        >
          Add Face
        </Button>           
        </Category>
        </>;
    }
}