import React, { CSSProperties } from "react";
import {
  VariableSizeList as List,
  ListChildComponentProps
} from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import styled from "styled-components";

export type Props<T> = {
  hasMore: boolean;
  width: number;
  height: number;
  items: T[];
  getItemSize: (index: number) => number;
  renderItem: (style: CSSProperties, item: T, index: number) => JSX.Element;
  onMore: (startIndex: number, stopIndex: number) => Promise<any> | null;
  LoadingComponent?: React.ReactNode;
  EmptyComponent?: React.ReactNode;
};

const Loading = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 46px;
`;

const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

class InfiniteList<T> extends React.PureComponent<Props<T>> {
  public render() {
    const {
      hasMore,
      renderItem,
      items,
      getItemSize,
      onMore,
      LoadingComponent = <Loading>loading</Loading>,
      EmptyComponent,
      width,
      height
    } = this.props;

    // If there are more items to be loaded then add an extra row to hold a loading indicator.
    const itemCount = hasMore ? items.length + 1 : items.length;

    // Only load 1 page of items at a time.
    // Pass an empty callback to InfiniteLoader in case it asks us to load more than once.
    const loadMoreItems = onMore;

    // Every row is loaded except for our loading indicator row.
    const isItemLoaded = (index: number) => !hasMore || index < items.length;

    // Render an item or a loading indicator.
    const Item = ({ index, style }: ListChildComponentProps) => {
      if (!isItemLoaded(index)) {
        return <div style={style}>{LoadingComponent}</div>;
      }
      return renderItem(style, items[index], index);
    };

    if (items.length === 0 && !hasMore && EmptyComponent) {
      return <EmptyContainer>{EmptyComponent}</EmptyContainer>;
    }

    return (
      <InfiniteLoader
        isItemLoaded={isItemLoaded}
        itemCount={itemCount}
        loadMoreItems={loadMoreItems}
      >
        {({ onItemsRendered, ref }) => (
          <List
            height={height}
            width={width}
            itemCount={itemCount}
            itemSize={getItemSize}
            onItemsRendered={onItemsRendered}
            ref={ref}
          >
            {Item}
          </List>
        )}
      </InfiniteLoader>
    );
  }
}

export default InfiniteList;
