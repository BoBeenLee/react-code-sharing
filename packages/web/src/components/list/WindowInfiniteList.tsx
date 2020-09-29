import React, { CSSProperties } from "react";
import {
  VariableSizeList as List,
  ListChildComponentProps
} from "react-window";
import { WindowScroller } from "react-virtualized";
import InfiniteLoader from "react-window-infinite-loader";
import styled from "styled-components";

import { mergeRefs } from "@shared/utils/common";
import ListLoading from "@shared/components/loading/ListLoading";

export type Props<T> = {
  className?: string;
  hasMore: boolean;
  items: T[];
  width: number;
  getItemSize: (index: number) => number;
  renderItem: (style: CSSProperties, item: T, index: number) => JSX.Element;
  onMore: (startIndex: number, stopIndex: number) => Promise<any> | null;
  LoadingComponent?: React.ReactNode;
  HeaderComponent?: React.ReactNode;
  BottomComponent?: React.ReactNode;
  EmptyComponent?: React.ReactNode;
};

const Content = styled(List)`
  overflow: unset !important;
`;

const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

class WindowInfiniteList<T> extends React.PureComponent<Props<T>> {
  public listRef: React.RefObject<any>;

  constructor(props: Props<T>) {
    super(props);
    this.listRef = React.createRef<any>();
  }

  public render() {
    return this.renderInfinteList;
  }

  private get renderInfinteList() {
    const {
      className,
      hasMore,
      renderItem,
      width,
      items,
      getItemSize,
      onMore,
      HeaderComponent,
      BottomComponent,
      EmptyComponent,
      LoadingComponent = "Loading",
    } = this.props;

    const headerIndex = HeaderComponent ? 1 : 0;
    const bottomIndex = BottomComponent ? 1 : 0;
    // If there are more items to be loaded then add an extra row to hold a loading indicator.
    const itemCount = items.length + headerIndex + bottomIndex;

    // Only load 1 page of items at a time.
    // Pass an empty callback to InfiniteLoader in case it asks us to load more than once.
    const loadMoreItems = onMore;

    // Every row is loaded except for our loading indicator row.
    const isItemLoaded = (index: number) => !hasMore || index < items.length;
    const isLastLoaded = (index: number) => !hasMore && index === items.length;

    // Render an item or a loading indicator.
    const Item = ({ index, style }: ListChildComponentProps) => {
      const currentIndex = index - headerIndex;
      if (currentIndex === -1) {
        return <div style={style}>{HeaderComponent}</div>;
      }
      if (isLastLoaded(currentIndex)) {
        return <div style={style}>{BottomComponent}</div>;
      }
      if (!isItemLoaded(currentIndex)) {
        return <div style={style}>{LoadingComponent}</div>;
      }
      return renderItem(style, items[currentIndex], currentIndex);
    };

    return items.length === 0 && EmptyComponent ? (
      <EmptyContainer>
        {HeaderComponent}
        {EmptyComponent}
        {BottomComponent}
      </EmptyContainer>
    ) : (
      <React.Fragment>
        <WindowScroller onScroll={this.handleScroll}>
          {() => <div />}
        </WindowScroller>
        <InfiniteLoader
          isItemLoaded={isItemLoaded}
          itemCount={itemCount}
          loadMoreItems={loadMoreItems}
        >
          {({ onItemsRendered, ref }) => (
            <Content
              ref={mergeRefs(ref, this.listRef)}
              itemCount={itemCount}
              itemSize={getItemSize}
              width={width}
              height={window.innerHeight}
              onItemsRendered={onItemsRendered}
              className={`${className} .window-scroller-override`}
            >
              {Item}
            </Content>
          )}
        </InfiniteLoader>
      </React.Fragment>
    );
  }

  private handleScroll = ({ scrollTop }: any) => {
    if (this.listRef.current) {
      this.listRef.current.scrollTo(scrollTop);
    }
  };
}

export default WindowInfiniteList;
