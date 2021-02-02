import Excel from '@/components/excel/Excel';
import Header from '@/components/header/Header';
import Formula from '@/components/formula/Formula';
import Table from '@/components/table/Table';
import Toolbar from '@/components/toolbar/Toolbar';
import createStore from '@core/createStore';
import reducer from '@/redux/reducer';
import initialState from '@/redux/initialState';
import { saveInLocalStorage, debounce } from '@core/utils';
import './styles/index.scss';

const store = createStore(reducer, initialState);

const stateListener = debounce(state => {
  saveInLocalStorage('excel-state', state);
}, 300);

store.subscribe(stateListener);

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store,
});

excel.render();
