import _ from "lodash";
import React, { Component, CSSProperties } from "react";
import { SizeMe, SizeMeProps } from "react-sizeme";
import {
  VariableSizeList as List,
  ListChildComponentProps
} from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import styled from "styled-components";

import ListLoading from "@shared/components/loading/ListLoading";

const Container = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
`;

export interface IProps<T> {
  className?: string;
  hasMore: boolean;
  items: T[];
  getItemSize: (index: number) => number;
  renderItem: (style: CSSProperties, item: T, index: number) => JSX.Element;
  onMore: (startIndex: number, stopIndex: number) => Promise<any> | null;
  LoadingComponent?: React.ReactNode;
}

class InfiniteList<T> extends Component<IProps<T>> {
  public render() {
    return (
      <SizeMe monitorHeight={true} refreshRate={32}>
        {this.renderInfinteList}
      </SizeMe>
    );
  }

  private renderInfinteList = ({ size }: SizeMeProps) => {
    const {
      className,
      hasMore,
      renderItem,
      items,
      getItemSize,
      onMore,
      LoadingComponent = <ListLoading />
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

    return (
      <Container className={className}>
        <InfiniteLoader
          isItemLoaded={isItemLoaded}
          itemCount={itemCount}
          loadMoreItems={loadMoreItems}
        >
          {({ onItemsRendered, ref }) => (
            <List
              height={_.defaultTo(size.height, 100)}
              width={_.defaultTo(size.width, 100)}
              itemCount={itemCount}
              itemSize={getItemSize}
              onItemsRendered={onItemsRendered}
              ref={ref}
            >
              {Item}
            </List>
          )}
        </InfiniteLoader>
      </Container>
    );
  };
}

export default InfiniteList;
