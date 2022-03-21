import { Fragment, h, VNode } from '@stencil/core';

import { isDefined, UniTemplate } from '@uiwebkit/common';

export const UniTabsTemplate = function(data, storeData, template): VNode {
  const { pro, mini, stacked, color, value, selectedIndex, indexMode } = data;
  const { top, frame, shadow, type, feature, path } = storeData;

  return UniTemplate(
    <Fragment>
      <uni-store-set
        top={top}
        frame={frame}
        shadow={shadow}
        mode={indexMode}
        type={type}
        feature={feature}
        path={path}
        state={selectedIndex}
      />

      {value[0]?.param ? (
        <Fragment>
          <uni-router frame={frame} shadow={shadow} />

          <uni-route no-params={value[0].param.split('=')[0]} prop='activate'>
            <uni-router-link params={value[selectedIndex].param} />
          </uni-route>
        </Fragment>
      ) : null}

      <uni-tab-bar pro={pro} color={color}>
        {value.map((item, index) => isDefined(item.param)
          ? (
            <uni-router-link params={item.param}>
              <uni-route params={item.param} prop='active'>
                <uni-tab
                  mini={mini}
                  stacked={stacked}
                  icon={item.icon}
                  icons={item.icons}
                  iconType={item.iconType}
                  angle={item.angle}
                  value={item.label}
                />
              </uni-route>
            </uni-router-link>
          ) : (
            <uni-event-store-set
              listen='click'
              top={top}
              type={type}
              feature={feature}
              frame={frame}
              shadow={shadow}
              path={path}
              state={index}
            >
              <uni-event-store-get
                top={top}
                type={type}
                feature={feature}
                path={path}
                equal={index}
                prop='active'
              >
                <uni-tab
                  mini={mini}
                  stacked={stacked}
                  icon={item.icon}
                  icons={item.icons}
                  iconType={item.iconType}
                  angle={item.angle}
                  value={item.label}
                />
              </uni-event-store-get>
            </uni-event-store-set>
          ),
        )}
      </uni-tab-bar>

      <uni-tabs-content
        value={value}
        top={top}
        type={type}
        feature={feature}
        path={path}
      >
        {template}
      </uni-tabs-content>
    </Fragment>,
  );
};
