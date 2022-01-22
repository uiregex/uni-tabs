import {Component, Prop, h, ComponentInterface, VNode, Watch, State} from '@stencil/core';

import {UniCommonColor, UniTemplate} from "@uiwebkit/common";

import {UniStoreType, UniTabsValue} from "../models";
import {UniTabsTemplate} from "../utils/tabs.template";
import {getPathId, parseValue} from "../utils/helpers";

@Component({
  tag: 'uni-tabs-shadow',
  styleUrl: '../styles/tabs.css',
  shadow: true
})
export class UniTabsShadowComponent implements ComponentInterface {

  @Prop({reflect: true}) pro: boolean = false;

  @Prop({reflect: true}) mini: boolean = false;

  @Prop({reflect: true}) stacked: boolean = false;

  @Prop({reflect: true}) color: UniCommonColor;

  @Prop({reflect: true}) value: string | UniTabsValue = [];

  @Prop({reflect: true}) selectedIndex: number = 0;

  @Prop({reflect: true}) top: boolean = false;

  @Prop({reflect: true}) frame: boolean = false;

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
    const {pro, mini, stacked, color, selectedIndex, frame, top, type, feature, indexMode} = this;
    const value: UniTabsValue = parseValue(this.value);
    const path = `${this.path}.${this.pathId}`;

    const data = {pro, mini, stacked, color, value, selectedIndex, indexMode};
    const storeData = {top, frame, shadow: true, type, feature, path};

    return UniTemplate(
      <div class={'uni-tabs'}>
        {value.length > 0 ? UniTabsTemplate(data, storeData, <slot/>) : <slot/>}
      </div>
    );
  }
}




