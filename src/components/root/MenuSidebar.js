import {
  BarChart as BarChartIcon,
  Lock as LockIcon,
  ShoppingBag as ShoppingBagIcon,
  UserPlus as UserPlusIcon,
  LogOut as LogOutIcon,
  List as ListIcon,
  Bookmark as BookmarkIcon,
  Book as BookIcon,
  Trello as TrelloIcon,
  Tool as ToolIcon,
  UserCheck as UserCheckIcon,
  Tv as TvIcon
} from 'react-feather';

export const user = {
  avatar: '/static/images/avatars/1aaaaa.png',
  jobTitle: 'Senior Developer',
  name: 'Katarina Smith'
};

export const items = [
  // User
  {
    icon: UserCheckIcon,
    title: 'Tài khoản',
    children: [
      {
        title: 'Quản lý tài khoản',
        href: '/admin/user/list',
        icon: ListIcon
      },
      {
        title: 'Thêm tài khoản',
        href: '/admin/user/add',
        icon: UserPlusIcon
      }
    ]
  },
  // Book
  {
    icon: BarChartIcon,
    title: 'Sách',
    children: [
      {
        title: 'Quản lý sách',
        href: '/admin/book/list',
        icon: BookmarkIcon
      },
      {
        title: 'Thêm sách',
        href: '/admin/book/add',
        icon: BookIcon
      }
    ]
  },
  // Cateogry
  {
    icon: TvIcon,
    title: 'Danh mục',
    children: [
      {
        title: 'Quản lý danh mục',
        href: '/admin/category/list',
        icon: TrelloIcon
      },
      {
        title: 'Thêm danh mục',
        href: '/admin/category/add',
        icon: ToolIcon
      }
    ]
  },
  {
    href: '/home',
    icon: ShoppingBagIcon,
    title: 'Trang chủ'
  },
  {
    href: '/login',
    icon: LockIcon,
    title: 'Đăng nhập'
  },
  {
    href: '/register',
    icon: UserPlusIcon,
    title: 'Đăng ký'
  },
  {
    href: '/logout',
    icon: LogOutIcon,
    title: 'Đăng xuất'
  }
];

export default {
  user, items
};
