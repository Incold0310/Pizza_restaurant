import React, {useEffect} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {getMenu} from '../store/thunks/getMenu';
import {changeCurrency} from '../store/thunks/changeCurrency';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Pizza from './Pizza';
import {RootState} from "../store/reducers/rootReducer";
import {Thunk} from "../common/defaultTypes";
import {IPizza} from "../store/types/interfaces/stateInterfaces";

const connector = connect(
    (state: RootState) => ({
      menu: state.menu.menuList as IPizza[]
    }),
    (dispatch: Thunk) => ({
      getMenuList() {
        dispatch(getMenu());
      },
      getCurrency(value) {
        dispatch(changeCurrency(value))
      }
    })
)

function Menu(props: ConnectedProps<typeof connector>) {

  useEffect(() => {
    props.getMenuList()
  }, [props.getMenuList])

  return (
    <div className="container-fluid mb-3" style={{flexGrow: 1}}>
      <div className="row">
        <div className="col-4 offset-4 text-center">
          <h3 className="display-3">Pizza</h3>
        </div>
        <div className="col-4 justify-content-end d-flex align-items-center">
          <div className="mr-3 text-right">
            <label htmlFor="currency">
              <i className="fa fa-rub"></i> / <i className="fa fa-euro"></i> / <i className="fa fa-dollar"></i>
            </label>
            <select className="form-control form-control-sm" id="currensy"
                    onChange={(e: React.ChangeEvent) => props.getCurrency((e.target as HTMLSelectElement).value)}
            >
              <option>RUB</option>
              <option>EUR</option>
              <option>USD</option>
            </select>
          </div>
        </div>
      </div>
      <hr className="my-2 mx-3" />
      <div className="row" id="menu">
        <TransitionGroup component={null}>
          {
            props.menu.map(pizza =>
              <CSSTransition
                key={pizza._id}
                timeout={300}
                classNames="menuItem"
              >
                <Pizza pizzaData={pizza}/>
              </CSSTransition>
            )
          }
        </TransitionGroup>
      </div>
    </div>
  )
}

export default connector(React.memo(Menu));
