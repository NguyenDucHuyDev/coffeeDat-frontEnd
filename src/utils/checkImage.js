import img_avatarUserDefault from '@/assets/images/avatar_user_default.png'
import img_productPoster from '@/assets/images/product_poster.png'
import productImage from "@/assets/images/coffee_banner_slide1.png";

export function checkAvatarUser(avatar) {
  return avatar ? avatar : img_avatarUserDefault
}

export function checkImageProduct(product) {
  return product ? `${import.meta.env.VITE_PATH_URL_SERVER}api/user/avatar` : img_productPoster
}

export function checkImageProductDetail(product) {
  return product ? `${import.meta.env.VITE_PATH_URL_SERVER}api/user/avatar` : productImage
}