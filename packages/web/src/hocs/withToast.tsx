import { Observer } from "mobx-react";
import React from "react";
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
            {getRootStore().toastStore.toasts.map(toast => {
              const { id, message, delay } = toast;
              return (
                <ToastText
                  key={id}
                  id={id}
                  message={message}
                  delay={delay}
                  onFinish={onFinish}
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
