export const adminMenu = [
  {
    //quản lý người dùng
    name: "menu.admin.manage-user",
    menus: [
      {
        name: "menu.admin.manage-all-user",
        link: "/system/user-redux",
      },
    ],
  },

  {
    //quản lý sản phẩm
    name: "menu.admin.manage-product",
    menus: [
      {
        name: "menu.admin.all-product",
        link: "/system/product-redux",
      },
      {
        name: "menu.admin.describe-product",
        link: "/system/product-manage",
      },
    ],
  },

  {
    //quản lý chính sách
    name: "menu.admin.manage-policy",
    menus: [
      {
        name: "menu.admin.all-policy",
        link: "/system/policy-redux",
      },
      {
        name: "menu.admin.edit-detail-policy",
        link: "/system/policy-edit-detail",
      },
    ],
  },
  {
    //quản lí đơn hàng
    name: "menu.admin.manage-order",
    menus: [
      {
        name: "menu.admin.all-order",
        link: "/system/order-redux",
      },
    ],
  },

  {
    //quản lí banner
    name: "menu.admin.manage-banner",
    menus: [
      {
        name: "menu.admin.all-banner",
        link: "/system/banner-redux",
      },
    ],
  },

  {
    //quản lí tin tức
    name: "menu.admin.manage-news",
    menus: [
      {
        name: "menu.admin.all-news",
        link: "/system/news-redux",
      },

      {
        name: "menu.admin.detail-news",
        link: "/system/news-detail",
      },
    ],
  },
];

export const employeeMenu = [
  {
    //quản lý sản phẩm
    name: "menu.admin.manage-product",
    menus: [
      {
        name: "menu.admin.all-product",
        link: "/system/product-redux",
      },
      {
        name: "menu.admin.describe-product",
        link: "/system/product-manage",
      },
    ],
  },

  // { //quản lý chính sách
  //     name: 'menu.admin.manage-policy',
  //     menus: [
  //         {
  //             name: 'menu.admin.all-policy', link: '/system/policy-redux'
  //         },
  //         {
  //             name: 'menu.admin.edit-detail-policy', link: '/system/policy-edit-detail'
  //         }
  //     ]
  // },

  {
    //quản lý phiếu
    name: "menu.admin.manage-form",
    menus: [
      {
        name: "menu.admin.create-form",
        link: "/system/form-redux",
      },
    ],
  },
];
