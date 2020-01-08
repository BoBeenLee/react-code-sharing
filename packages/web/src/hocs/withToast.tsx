import _ from "lodash";
import { Observer } from "mobx-react";
import React, { Component } from "react";
import { AnimatePresence } from "framer-motion";
import styled from "styled-components";

import ToastText from "src/components/text/ToastText";
import { getRootStore } from "src/stores/Store";

const withToast = (element: any): any => {
  const onFinish = (id: string) => {
    const { dismissToast } = getRootStore().toastStore;
    dismissToast(id);
  };

  return (
    <React.Fragment>
      {element}
      <Observer>
        {() => (
          <AnimatePresence>
            {_.map(getRootStore().toastStore.toasts, toast => {
              const { id, message, delay } = toast;
              return (
                <ToastText
                  key={id}
                  message={message}
                  delay={delay}
                  onFinish={_.partial(onFinish, id)}
                />
              );
            })}
          </AnimatePresence>
        )}
      </Observer>
    </React.Fragment>
  );
};

export default withToast;
