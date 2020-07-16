import React, { CSSProperties } from "react";
import {
  VariableSizeList as List,
  ListChildComponentProps,
} from "react-window";
import { WindowScroller } from "react-virtualized";
import InfiniteLoader from "react-window-infinite-loader";
import styled from "styled-components";

import { mergeRefs } from "@shared/utils/common";
import ListLoading from "@shared/components/loading/ListLoading";

export interface IProps<T> {
  className?: string;
  hasMore: boolean;
  items: T[];
  width: number;
  getItemSize: (index: number) => number;
  renderItem: (style: CSSProperties, item: T, index: number) => JSX.Element;
  onMore: (startIndex: number, stopIndex: number) => Promise<any> | null;
  LoadingComponent?: React.ReactNode;
}

const Content = styled(List)`
  overflow: unset !important;
`;

class WindowInfiniteList<T> extends React.PureComponent<IProps<T>> {
  public listRef: React.RefObject<any>;

  constructor(props: IProps<T>) {
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
              className={`window-scroller-override ${className}`}
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
