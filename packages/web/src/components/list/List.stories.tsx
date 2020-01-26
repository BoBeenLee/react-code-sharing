import { number } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import _ from "lodash";
import React, { CSSProperties, useState } from "react";
import styled from "styled-components";

import InfiniteList from "src/components/list/InfiniteList";
import { delay } from "@shared/utils/common";

const Item = styled.div<{ height: number }>`
  width: 200px;
  height: ${({ height }) => height}px;
  background-color: #eee;
`;

const InfiniteItem = styled.div`
  display: flex;
  width: 100%;
  height: 70px;
  background-color: #eee;
  margin-bottom: 5px;
`;

const InfiniteListView = styled(InfiniteList)`
  display: flex;
  flex: 1;
  height: 100%;
`;

const renderInfiniteItem = (style: CSSProperties, item: any, index: number) => {
  return (
    <InfiniteItem key={`${index}`} style={style}>
      {item}
    </InfiniteItem>
  );
};

const getItemSize = () => 70;

storiesOf("List", module).add("InfiniteList", () => {
  const [size, setSize] = useState(200);
  const items = _.times(size, index => "" + index);

  const onMore = async () => {
    await delay(5000);
    setSize(size + 200);
  };

  return (
    <InfiniteListView
      hasMore={true}
      items={items}
      getItemSize={getItemSize}
      renderItem={renderInfiniteItem}
      onMore={onMore}
    />
  );
});
