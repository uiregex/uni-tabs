import {Component, Prop, h, ComponentInterface, VNode, State, Watch} from '@stencil/core';

import {UniCommonColor, UniHostTemplate} from "@uiwebkit/common";

import {UniStoreType, UniTabsValue} from "../models";
import {UniTabsTemplate} from "../utils/tabs.template";
import {getPathId, parseValue} from "../utils/helpers";

@Component({
  tag: 'uni-tabs',
  styleUrl: '../styles/tabs.css'
})
export class UniTabsComponent implements ComponentInterface {

  @Prop({reflect: true}) pro: boolean = false;

  @Prop({reflect: true}) mini: boolean = false;

  @Prop({reflect: true}) stacked: boolean = false;

  @Prop({reflect: true}) color: UniCommonColor;

  @Prop({reflect: true}) value: string | UniTabsValue = [];

  @Prop({reflect: true}) selectedIndex: number = 0;

  @Prop({reflect: true}) top: boolean = false;

  @Prop({reflect: true}) frame: boolean = false;

  @Prop({reflect: true}) shadow: boolean = false;

  @Prop({reflect: true}) type: UniStoreType = 'memory';

  @Prop({reflect: true}) feature: string = 'uni.store';

  @Prop({reflect: true}) path: string = 'tab';

  @Prop({reflect: true, mutable: true}) pathId: string;

  @State() indexMode: string = 'init';

  @Watch('selectedIndex')
  onSelectedIndex(): void {
    this.indexMode = 'set';
  }

  componentWillLoad(): Promise<void> | void {
    this.pathId = this.pathId || getPathId(this.type);
  }

  render(): VNode {
    const {pro, mini, stacked, color, selectedIndex, frame, shadow, top, type, feature, indexMode} = this;
    const value: UniTabsValue = parseValue(this.value);
    const path = `${this.path}.${this.pathId}`;
    const classes = {'uni-tabs': true};

    const data = {pro, mini, stacked, color, value, selectedIndex, indexMode};
    const storeData = {top, frame, shadow, type, feature, path};

    return UniHostTemplate({classes}, value.length > 0 ? UniTabsTemplate(data, storeData, <slot/>) : null);
  }
}




