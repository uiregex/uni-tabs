import {Component, Prop, h, ComponentInterface, VNode, Host, Fragment} from '@stencil/core';

import {isDefined, isJSON, isString} from "../utils/is";
import {UniTabValue} from "../models";

@Component({
  tag: 'uni-tabs',
  styleUrl: '../styles/tabs.css'
})
export class UniTabsComponent implements ComponentInterface {

  @Prop({reflect: true}) value: UniTabValue | string = [];

  @Prop({reflect: true}) selectedIndex: number;

  @Prop({reflect: true}) path: string = 'tab';

  @Prop({reflect: true}) pathId: string;

  @Prop({reflect: true}) only: boolean = false;

  render(): VNode {
    const value: UniTabValue = isString(this.value) && isJSON(this.value) ? JSON.parse(this.value) : [...this.value];
    const isRouting = value.length > 0 && isDefined(value[0].param);
    const pathId = this.pathId || Math.random().toString(9).substring(15);
    const path = `${this.path}.${pathId}`;

    return (
      <Host class={'uni-tabs'}>
        {this.only ? <slot/> : (
          <Fragment>
            {isRouting ? <uni-router/> : null}

            {isDefined(this.selectedIndex)
              ? isRouting
                ? <uni-router-link activate={true} params={value[this.selectedIndex].param}/>
                : <uni-store-set path={path} state={this.selectedIndex}/>
              : null
            }

            <uni-tab-bar>
              {value.map((item, index) =>
                isDefined(item.param)
                  ? (
                    <uni-router-link params={item.param}>
                      <uni-route params={item.param} prop="active">
                        <uni-tab>{item.label}</uni-tab>
                      </uni-route>
                    </uni-router-link>
                  ) : (
                    <uni-event-store-set listen="click" path={path} state={index}>
                      <uni-event-store-get path={path} equal={index} prop="active">
                        <uni-tab>{item.label}</uni-tab>
                      </uni-event-store-get>
                    </uni-event-store-set>
                  )
              )}
            </uni-tab-bar>

            <uni-tabs-content value={value} path={this.path} path-id={pathId}>
              <slot/>
            </uni-tabs-content>
          </Fragment>
        )}
      </Host>
    );
  }
}




