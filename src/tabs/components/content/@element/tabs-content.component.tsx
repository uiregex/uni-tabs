import {Component, Prop, ComponentInterface, Element} from '@stencil/core';

import {isDefined, isJSON, isString} from "../../../utils/is";
import {UniTabValue} from "../../../models";

@Component({tag: 'uni-tabs-content'})
export class UniTabsContentComponent implements ComponentInterface {

  @Element() el: HTMLElement;

  @Prop({reflect: true}) value: UniTabValue | string = [];

  @Prop({reflect: true}) path: string = 'tab';

  @Prop({reflect: true}) pathId: string;

  private originalChildren: Element[];

  componentWillLoad(): Promise<void> | void {
    const template = this.el.querySelector('template');

    if (template) {
      const documentFragment = template.content ? template.content.cloneNode(true) : template;
      this.el.appendChild(documentFragment);
      const templateChildren = Array.from(this.el.children);
      templateChildren.shift();
      this.originalChildren = templateChildren;
    } else {
      this.originalChildren = Array.from(this.el.children);
    }
  }

  componentDidRender(): void {
    const value: UniTabValue = isString(this.value) && isJSON(this.value) ? JSON.parse(this.value) : [...this.value];
    const path = `${this.path}.${this.pathId}`;

    this.el.innerHTML = '';

    this.originalChildren.forEach((child: Element, index: number) => {
      const wrapper = document.createElement(
        value.length > 0 && isDefined(value[index].param) ? 'uni-route-display' : 'uni-store-display'
      );

      if (value.length > 0 && isDefined(value[index]) && isDefined(value[index].param)) {
        wrapper.setAttribute('params', value[index].param);
      } else {
        wrapper.setAttribute('path', path);
        wrapper.setAttribute('equal', '' + index);
      }

      wrapper.appendChild(child);

      this.el.appendChild(wrapper);
    });
  }
}
