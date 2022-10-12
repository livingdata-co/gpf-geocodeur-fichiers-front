import colors from './colors'

const breakPoints = {
  desktop: '1024px',
  laptop: '768px',
  tablet: '480px',
  mobile: '320px'
}

export default ({
  // Expose colors
  colors,

  breakPoints,

  // Texts
  txtPrimary: colors.almostBlack,
  txtSecondary: colors.white,
  txtColor: colors.orange,
  txtDisable: colors.lightGrey,
  titlePrimary: colors.blue,

  // Backgrounds
  bkgPrimary: colors.blue,
  bkgSecondary: colors.orange,
  bkgDisable: colors.grey,
  bkgDark: colors.darkBlue,
  bkgLight: colors.lightBlue,
  bkgNeutral: colors.white,

  // Borders

  borderPrimary: colors.blue,
  borderSecondary: colors.orange,
  borderDisable: colors.grey,
  borderDark: colors.darkBlue,
  borderLight: colors.lightGrey,

  // States
  success: colors.green,
  error: colors.red
})
