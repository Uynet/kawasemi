import UI from "./ui.js";

export default class UIComponent extends UI{
    constructor(pos){
        super(pos)
        this.states;
        this.props;
    }
    setProps(props){
        this.props = props;
    }
    setState(states){
        this.states = states;
    }
}