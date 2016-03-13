import { customElement, autoinject, bindable, inlineView, child } from 'aurelia-framework';
import { ByteArray, Component, Kind, EndPoint, Direction, Message, Channel } from 'cryptographix-sim-core';

/**
* Default view for the 'bytearray-entry' component
*/
@customElement('bytearray-entry')
@autoinject()
export class ByteArrayEntryVM {

  @bindable text: string = '';
  @bindable encoding: string = 'HEX';
  running: boolean = false;

  private _component: ByteArrayEntry;
  activate(component: ByteArrayEntry) {
    this._component = component;

    if (component) {
      component.bindView(this);

      this.encodingChanged(this.encoding);
      this.textChanged(this.text);
    }
  }

  startComponent() {
    this.running = true;
    this.textChanged(this.text);
  }

  stopComponent() {
    this.running = false;
  }

  encodingChanged(newValue: string) {
    this.encoding = newValue;
    this._component.setEncoding(ByteArray.stringToEncoding(newValue));
  }

  textChanged(newValue) {
    if (this.running)
      this._component.setText(newValue);
  }
}

export class ByteArrayEntry implements Component {
  constructor() {
  }

  private _config: Kind;
  private _dataOut: EndPoint;
  private _encoding: number;

  icon: string = "pencil";
  view: any;

  bindView(view: any) {
    this.view = view;
  }

  initialize(config: Kind): EndPoint[] {

    this._config = config;
    this._encoding = config['encoding'] || ByteArray.HEX;

    // init EndPoints
    this._dataOut = new EndPoint('out', Direction.OUT);

    // and return collection
    return [this._dataOut];
  }

  teardown() {
    this._dataOut = null;
  }

  start() {
    this.view.startComponent();
  }

  stop() { 
    this.view.stopComponent();
  }

  pause() { }
  resume() { }

  public setEncoding(encoding: number) {
    this._encoding = encoding;
  }

  public setText(textValue) {
    this._dataOut.sendMessage(new Message<ByteArray>({}, new ByteArray(textValue, this._encoding)));
  }
}
