import Pui from '../../dist/index';
import '../../dist/index.css';
import './styles/table.styl';

export default ({
    Vue
}) => {
    Vue.use(Pui);
    console.log(
        '%c Persagy-ui %c Version 0.9.3 ',
        'background-color: #0091ff; border-top-left-radius: 2px; border-bottom-left-radius: 2px; line-height: 20px; color: #fff; font-size: 12px;',
        'background-color: #454d54; border-top-right-radius: 2px; border-bottom-right-radius: 2px; line-height: 20px; color: #fff; font-size: 12px;'
    );
}