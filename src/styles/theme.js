const colors = require("./colors");

const theme = {
  navigator: {
    colors: {
      title: colors.firstSuperLight,
      subTitle: colors.subTitle,
      scrollTrack: colors.first,
      scrollThumb: colors.subTitle,
      linkHover: colors.bright,
      header: colors.firstSuperLight,
      asideItemActiveBorder: colors.accent
    },
    sizes: {
      asideWidth: "19em",
      maxWidth: "56em"
    },
    backgrounds: {
      wrapper: colors.first,
      aside: colors.asidebg,
      asideItemActive: colors.firstDark
    }
  },
  post: {
    colors: {
      author: colors.middle,
      authorBorder: colors.firstLight,
      bold: colors.middle,
      blockquoteFrame: colors.light,
      copyright: colors.middle,
      link: colors.middle,
      linkHover: colors.light,
      meta: colors.timecolor,
      metaBorder: colors.first,
      text: colors.dark,
      title: colors.middle,
      subTitle: colors.superDark
    },
    backgrounds: {
      wrapper: colors.first,
      meta: colors.light
    },
    sizes: {
      maxWidth: "50em"
    }
  },
  bottomBar: {
    colors: {
      link: colors.light,
      icon: colors.first
    },
    backgrounds: {
      wrapper: colors.first,
      icon: colors.light
    },
    sizes: {
      height: 44 //pixels
    }
  },
  topBar: {
    colors: {
      logo: colors.first,
      logoPost: colors.first
    },
    backgrounds: {
      wrapper: colors.light,
      wrapperPost: colors.light,
      icon: colors.accent
    },
    sizes: {
      height: 44 //pixels
    }
  },
  info: {
    colors: {
      text: colors.first,
      link: colors.first,
      linkHover: colors.bright,
      btn: colors.btncolor
    },
    backgrounds: {
      wrapper: colors.light,
      btn: colors.btnbg
    },
    sizes: {
      maxWidth: "40em"
    }
  },
  mediaQueryTresholds: {
    XL: "65em",
    L: "49em",
    M: "37em",
    S: "28em",
    XS: "21em"
  }
};

export default theme;
