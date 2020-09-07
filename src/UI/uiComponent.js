import UI from "./ui.js";

export default class UIComponent extends UI{
    constructor(pos){
        super(pos)
        this.state;
        this.props;
    }
    setProps(props){
        this.props = props;
    }
    setState(state){
        this.state = state;
    }
}