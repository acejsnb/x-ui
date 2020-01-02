import Pui from '../../dist/index';
import '../../dist/index.css'

export default ({
    Vue
}) => {
    const link=document.createElement('link');
    const script=document.createElement('script');
    link.href='http://47.95.122.141:8088/fontFile/fontFile.css';
    script.src='http://47.95.122.141:8088/fontFile/setFontBySystem.js';

    document.head.appendChild(link);
    document.head.appendChild(script);

    Vue.use(Pui)
}