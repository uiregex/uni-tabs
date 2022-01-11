import {Component, Prop, ComponentInterface, Element} from '@stencil/core';

import {isDefined} from "@uiwebkit/common";

import {UniStoreType, UniTabsValue} from "../../../models";
import {parseValue} from "../../../utils/helpers";

@Component({tag: 'uni-tabs-content'})
export class UniTabsContentComponent implements ComponentInterface {

  @Element() el: HTMLElement;

  @Prop({reflect: true}) value: string | UniTabsValue = [];

  @Prop({reflect: true}) top: boolean = false;

  @Prop({reflect: true}) type: UniStoreType = 'memory';

  @Prop({reflect: true}) feature: string = 'uni.store';

  @Prop({reflect: true}) path: string;

  componentWillLoad(): Promise<void> | void {
    const value: UniTabsValue = parseValue(this.value);
    const slotElements = this.el.querySelector('slot')?.assignedElements() || [];
    const template = slotElements.length === 1 && slotElements[0]['tagName'] === 'UNI-TEMPLATE'
      ? slotElements[0] as HTMLTemplateElement
      : this.el.querySelector('uni-template');
    const originalChildren = template ? Array.from(template.children) : [];

    originalChildren.forEach((child: Element, index: number) => {
      const isParam = isDefined(value[index]) && isDefined(value[index].param)
      const wrapper = document.createElement(isParam ? 'uni-route-display' : 'uni-store-display');
      wrapper.hidden = true;

      if (isParam) {
        wrapper.setAttribute('params', value[index].param);
      } else {
        wrapper.setAttribute('top', `${this.top}`);
        wrapper.setAttribute('type', this.type);
        wrapper.setAttribute('feature', this.feature);
        wrapper.setAttribute('path', this.path);
        wrapper.setAttribute('equal', '' + index);
      }

      wrapper.appendChild(child);
      this.el.appendChild(wrapper);
    });
  }
}
