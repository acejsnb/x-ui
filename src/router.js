import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import ComponentLists from './views/ComponentLists';
import ButtonView from './views/ButtonView';
import ModalView from './views/ModalView';
import DrawerView from './views/DrawerView';
import ToggleView from './views/toggleView';
import DropdownView from './views/dropdownView';
import DropGroupView from './views/dropGroupView';
import SelectView from './views/selectView';
import BadgeView from './views/badgeView';
import DividerView from './views/dividerView';
import CarouseltextView from './views/carouseltextView';

import MessageView from './views/MessageView';

export default new Router({
    // mode: 'history',
    // scrollBehavior: () => ({x: 0, y: 0}),
    linkActiveClass: 'activeStyle',
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
            path: '/carouseltextView',
            name: 'CarouseltextView',
            component: CarouseltextView,
            meta: {
                title: 'CarouseltextView'
            }
        },

        {
            path: '/messageView',
            name: 'MessageView',
            component: MessageView,
            meta: {
                title: 'MessageView'
            }
        },
        {
            path: '/',
            redirect: '/componentLists'
        }
    ]
});
