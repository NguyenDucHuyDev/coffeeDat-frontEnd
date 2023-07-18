import PropTypes from 'prop-types';

export const userInfoPropTypes = {
  userInfo: PropTypes.object,
};

export const commentRatePropType = {
  user: PropTypes.object,
  rate: PropTypes.object,
}

export const productRatePropType = {
  product: PropTypes.object
}

export const protectedRouteUserPropType =  {
  user: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
    PropTypes.string,
  ])
}

export const newsGeneralPropType = {
  news: PropTypes.object,
}

export const newsDetailPropType = {
  news: PropTypes.object,
}
