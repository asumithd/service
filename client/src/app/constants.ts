const rootPath = 'http://localhost:3000/';
const apiPath = rootPath + 'api/';

export const constants = {
  register: apiPath + 'register/',
  login: apiPath + 'login/',

  getSubAdmin: apiPath + 'users/',
  getRideType: apiPath + 'rideTypes/',
  getcategory: apiPath + 'maincatagery/',
  getsubcategory: apiPath + 'subCategory/',
  getproduct: apiPath + 'product/',

  getcoupon: apiPath + 'coupon/',
  getfareclasses: apiPath + 'fareclasses/',
  getfarerates: apiPath + 'farerates/',
  getpaymentmethod: apiPath + 'paymentmethod/',
  getproductlist: apiPath + 'getproducts/',
  searchproducts: apiPath + 'searchproducts/',
  customeraccount: apiPath + 'customeraccount/',

  getorder: apiPath + 'order/',
  getdriver: apiPath + 'driver/',
  gettracking: apiPath + 'tracking/',
  getattributes: apiPath + 'attributes/',
  getsettings: apiPath + 'sitesettings/',
  getbanner: apiPath + 'banner/',
  getcustomer: apiPath + 'customer/',
  updateOtp: apiPath + 'updateotp/',
  sendOtp: apiPath + 'sendotp/',


  getCarMaker: apiPath + 'carMaker/',
  getCarModel: apiPath + 'carModel/',
  getLocation: apiPath + 'location/',
  getDocument: apiPath + 'document/',
  getCarModelInputs: apiPath + 'carmodelformInput/',


  uploadcar: apiPath + 'upload/carimage/',
  deletefile: apiPath + 'deletefile/',
  carImagepath: 'assets/images/cars/',
  carImage: rootPath + 'assets/images/cars/',


  upload: apiPath + 'upload/',
  // deletefile: apiPath + 'deletefile/',
  Imagepath: 'assets/images/',
  UploadedImage: rootPath + 'assets/images/',


  // Userend
  userRegister: apiPath + 'userregister/',
  userLogin: apiPath + 'userlogin/',
  listCategories: apiPath + 'listcategories/',

  // Delivery Address
  getAddress: apiPath + 'address/',
  getDefaultAddress: apiPath + 'defaultaddress/',

  // Stripe payment
  makePayment: apiPath + 'makePayment/',
  createOrder: apiPath + 'createOrder'

};


