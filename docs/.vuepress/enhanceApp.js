import Pui from '../../dist/index';
import '../../dist/index.css';

export default ({
    Vue
}) => {
    Vue.use(Pui);
    console.log(
        '%c Persagy-ui %c Version 0.8.7 ',
        'background-color: #0091ff; border-top-left-radius: 2px; border-bottom-left-radius: 2px; line-height: 20px; color: #fff; font-size: 14px;',
        'background-color: #454d54; border-top-right-radius: 2px; border-bottom-right-radius: 2px; line-height: 20px; color: #fff; font-size: 14px;'
    );
}