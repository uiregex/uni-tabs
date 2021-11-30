/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { UniTabValue } from "./tabs/models";
export namespace Components {
    interface UniTabs {
        "only": boolean;
        "path": string;
        "pathId": string;
        "selectedIndex": number;
        "value": UniTabValue | string;
    }
    interface UniTabsContent {
        "path": string;
        "pathId": string;
        "value": UniTabValue | string;
    }
}
declare global {
    interface HTMLUniTabsElement extends Components.UniTabs, HTMLStencilElement {
    }
    var HTMLUniTabsElement: {
        prototype: HTMLUniTabsElement;
        new (): HTMLUniTabsElement;
    };
    interface HTMLUniTabsContentElement extends Components.UniTabsContent, HTMLStencilElement {
    }
    var HTMLUniTabsContentElement: {
        prototype: HTMLUniTabsContentElement;
        new (): HTMLUniTabsContentElement;
    };
    interface HTMLElementTagNameMap {
        "uni-tabs": HTMLUniTabsElement;
        "uni-tabs-content": HTMLUniTabsContentElement;
    }
}
declare namespace LocalJSX {
    interface UniTabs {
        "only"?: boolean;
        "path"?: string;
        "pathId"?: string;
        "selectedIndex"?: number;
        "value"?: UniTabValue | string;
    }
    interface UniTabsContent {
        "path"?: string;
        "pathId"?: string;
        "value"?: UniTabValue | string;
    }
    interface IntrinsicElements {
        "uni-tabs": UniTabs;
        "uni-tabs-content": UniTabsContent;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "uni-tabs": LocalJSX.UniTabs & JSXBase.HTMLAttributes<HTMLUniTabsElement>;
            "uni-tabs-content": LocalJSX.UniTabsContent & JSXBase.HTMLAttributes<HTMLUniTabsContentElement>;
        }
    }
}