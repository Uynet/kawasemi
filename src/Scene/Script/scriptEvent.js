export default class ScriptEvent{
    constructor(label){
        this.label = label;
    }
    execute(script){
        console.log(this.label);
    }
}