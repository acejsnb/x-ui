import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import ComponentLists from './views/ComponentLists';
import ButtonView from './views/ButtonView';
import SelectButtonView from './views/SelectButtonView';
import SelectInputView from './views/SelectInputView';
import ModalView from './views/ModalView';
import DrawerView from './views/DrawerView';
import ToggleView from './views/ToggleView';
import DropdownView from './views/DropdownView';
import DropGroupView from './views/DropGroupView';
import SelectView from './views/SelectView';
import SelectSearchView from './views/SelectSearchView';
import BadgeView from './views/BadgeView';
import DividerView from './views/DividerView';
import CarouselTextView from './views/CarouselTextView';
import TabsView from './views/TabsView';
import HeadersView from './views/HeadersView';
import BreadcrumbView from './views/BreadcrumbView';

import PickerTimeView from './views/PickerTimeView';
import PickerDateView from './views/PickerDateView';
import PickerDayView from './views/PickerDayView';
import PickerWeekView from './views/PickerWeekView';
import PickerYearView from './views/PickerYearView';
import PickerMonthView from './views/PickerMonthView';
import TreeView from './views/TreeView';
import TreeStageView from './views/TreeStageView';
import TreeBiView from './views/TreeBiView';
import ShakeView from './views/ShakeView';
import StickView from './views/StickView';
import TagView from './views/TagView';
import TransferView from './views/TransferView';
import TransferSelectView from './views/TransferSelectView';
import TransferSelectModalView from './views/TransferSelectModalView';
import TransferMiniView from './views/TransferMiniView';

import MessageView from './views/MessageView';

// 未公开组件
import CheckboxView from './views/CheckboxView';
import RadioView from './views/RadioView';
import InputView from './views/InputView';
import IconView from './views/IconView';

export default new Router({
    // mode: 'history',
    // scrollBehavior: () => ({x: 0, y: 0}),
    // linkActiveClass: 'activeStyle',
    routes: [
        {
            path: '/componentLists',
            name: 'ComponentLists',
            component: ComponentLists,
            meta: {
                title: 'ComponentLists'
            }
        },

        {
            path: '/buttonView',
            name: 'ButtonView',
            component: ButtonView,
            meta: {
                title: 'ButtonView'
            }
        },
        {
            path: '/selectButtonView',
            name: 'SelectButtonView',
            component: SelectButtonView,
            meta: {
                title: 'SelectButtonView'
            }
        },
        {
            path: '/selectInputView',
            name: 'SelectInputView',
            component: SelectInputView,
            meta: {
                title: 'SelectInputView'
            }
        },
        {
            path: '/modalView',
            name: 'ModalView',
            component: ModalView,
            meta: {
                title: 'ModalView'
            }
        },
        {
            path: '/drawerView',
            name: 'DrawerView',
            component: DrawerView,
            meta: {
                title: 'DrawerView'
            }
        },
        {
            path: '/dropGroupView',
            name: 'DropGroupView',
            component: DropGroupView,
            meta: {
                title: 'DropGroupView'
            }
        },
        {
            path: '/toggleView',
            name: 'ToggleView',
            component: ToggleView,
            meta: {
                title: 'ToggleView'
            }
        },
        {
            path: '/selectView',
            name: 'SelectView',
            component: SelectView,
            meta: {
                title: 'SelectView'
            }
        },
        {
            path: '/selectSearchView',
            name: 'SelectSearchView',
            component: SelectSearchView,
            meta: {
                title: 'SelectSearchView'
            }
        },
        {
            path: '/dropdownView',
            name: 'DropdownView',
            component: DropdownView,
            meta: {
                title: 'DropdownView'
            }
        },
        {
            path: '/badgeView',
            name: 'BadgeView',
            component: BadgeView,
            meta: {
                title: 'BadgeView'
            }
        },
        {
            path: '/dividerView',
            name: 'DividerView',
            component: DividerView,
            meta: {
                title: 'DividerView'
            }
        },
        {
            path: '/carouselTextView',
            name: 'CarouselTextView',
            component: CarouselTextView,
            meta: {
                title: 'CarouselTextView'
            }
        },
        {
            path: '/tabsView',
            name: 'TabsView',
            component: TabsView,
            meta: {
                title: 'TabsView'
            }
        },
        {
            path: '/breadcrumbView',
            name: 'BreadcrumbView',
            component: BreadcrumbView,
            meta: {
                title: 'BreadcrumbView'
            }
        },

        // 组合组件
        {
            path: '/headersView',
            name: 'HeadersView',
            component: HeadersView,
            meta: {
                title: 'HeadersView'
            }
        },
        {
            path: '/pickerTimeView',
            name: 'PickerTimeView',
            component: PickerTimeView,
            meta: {
                title: 'PickerTimeView'
            }
        },
        {
            path: '/pickerDayView',
            name: 'PickerDayView',
            component: PickerDayView,
            meta: {
                title: 'PickerDayView'
            }
        },
        {
            path: '/pickerDateView',
            name: 'PickerDateView',
            component: PickerDateView,
            meta: {
                title: 'PickerDateView'
            }
        },
        {
            path: '/pickerWeekView',
            name: 'PickerWeekView',
            component: PickerWeekView,
            meta: {
                title: 'PickerWeekView'
            }
        },
        {
            path: '/pickerYearView',
            name: 'PickerYearView',
            component: PickerYearView,
            meta: {
                title: 'PickerYearView'
            }
        },
        {
            path: '/pickerMonthView',
            name: 'PickerMonthView',
            component: PickerMonthView,
            meta: {
                title: 'PickerMonthView'
            }
        },
        {
            path: '/treeView',
            name: 'TreeView',
            component: TreeView,
            meta: {
                title: 'TreeView'
            }
        },
        {
            path: '/treeStageView',
            name: 'TreeStageView',
            component: TreeStageView,
            meta: {
                title: 'TreeStageView'
            }
        },
        {
            path: '/treeBiView',
            name: 'TreeBiView',
            component: TreeBiView,
            meta: {
                title: 'TreeBiView'
            }
        },
        {
            path: '/shakeView',
            name: 'ShakeView',
            component: ShakeView,
            meta: {
                title: 'ShakeView'
            }
        },
        {
            path: '/stickView',
            name: 'StickView',
            component: StickView,
            meta: {
                title: 'StickView'
            }
        },
        {
            path: '/tagView',
            name: 'TagView',
            component: TagView,
            meta: {
                title: 'TagView'
            }
        },
        {
            path: '/transferView',
            name: 'TransferView',
            component: TransferView,
            meta: {
                title: 'TransferView'
            }
        },
        {
            path: '/transferSelectView',
            name: 'TransferSelectView',
            component: TransferSelectView,
            meta: {
                title: 'TransferSelectView'
            }
        },
        {
            path: '/transferSelectModalView',
            name: 'TransferSelectModalView',
            component: TransferSelectModalView,
            meta: {
                title: 'TransferSelectModalView'
            }
        },
        {
            path: '/transferMiniView',
            name: 'TransferMiniView',
            component: TransferMiniView,
            meta: {
                title: 'TransferMiniView'
            }
        },

        // 函数组件
        {
            path: '/messageView',
            name: 'MessageView',
            component: MessageView,
            meta: {
                title: 'MessageView'
            }
        },

        // 未公开组件
        {
            path: '/checkboxView',
            name: 'CheckboxView',
            component: CheckboxView,
            meta: {
                title: 'CheckboxView'
            }
        },
        {
            path: '/radioView',
            name: 'RadioView',
            component: RadioView,
            meta: {
                title: 'RadioView'
            }
        },
        {
            path: '/inputView',
            name: 'InputView',
            component: InputView,
            meta: {
                title: 'InputView'
            }
        },
        {
            path: '/iconView',
            name: 'IconView',
            component: IconView,
            meta: {
                title: 'IconView'
            }
        },

        {
            path: '/',
            redirect: '/componentLists'
        }
    ]
});
