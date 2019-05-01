
const baseTopBar = (name = "") => ({
  animate: true,
  backButtonHidden: true,
  background: {
    color: "white"
  },
  title: {
    text: name
  },
  visible: true
});

const backTopBar = (name = "") => ({
  animate: true,
  backButtonHidden: false,
  background: {
    color: "white"
  },
  title: {
    text: name
  },
  visible: true
});

const emptyTopBar = () => ({
  animate: false,
  drawBehind: true,
  visible: false
});

export default { backTopBar, baseTopBar, emptyTopBar };
